import 'babel-polyfill';
import { Map, fromJS } from 'immutable';
import * as plugins from './plugins';
import store from './store';
import { EventEmitter2 as EventEmitter } from 'eventemitter2';

class Dispatcher extends EventEmitter {
  constructor (opts) {
    super(opts);
    this.opts = opts;
    this.store = fromJS(store);
    this.isRegistered = this.registerPlugins();
  };

  dispatch (event) {
    const handler = this.getHandler(event);
    const ctx = { ...event };
    const prevStore = this.store;

    let store = this.store;

    async function handle (e, i=0) {
      let output = handler[i](
        store.toJS(),
        ctx
      );

      // resolve ouput if it returns a promise
      output = output && output.then
        ? await output
        : output;

      store = store.mergeDeep(output);

      if (i + 1 < handler.length) {
        requestAnimationFrame(handle.bind(this, e, i+1));
      } else {
        this.store = store;

        this.emit('commit', prevStore);
      };
    };

    requestAnimationFrame(handle.bind(this));
  };

  // return handler based on type and key and
  // allow array or functions via concatination.
  getHandler ({ type = 'react', key }) {
    const handler = plugins[type].handlers[key];

    return Array
      .prototype
      .concat(handler);
  };

  // call plugin.register on each plugin if
  // isRegistered is false
  registerPlugins () {
    if (this.isRegistered) {
      return false;
    };

    for (let name in plugins) {
      const { register } = plugins[name];

      register && register(this);
    };

    return true;
  };
};

export default new Dispatcher({});
