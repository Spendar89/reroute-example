import 'babel-polyfill';
import { Map, fromJS } from 'immutable';
import * as plugins from './plugins';
import store from './store';
import { EventEmitter2 as EventEmitter } from 'eventemitter2';

class Router extends EventEmitter {
  constructor () {
    super();
    this.store = fromJS(store);
    this.plugins = plugins;
    this.isRegistered = this.registerPlugins();
  };

  route (event) {
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
    const handler = this.plugins[type].routes[key];

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

    for (let name in this.plugins) {
      const { register } = this.plugins[name];

      register && register(this);
    };

    return true;
  };
};

export default new Router({});
