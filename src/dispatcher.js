import 'babel-polyfill';
import moment from 'moment';
import { ERRORS } from './constants';
import * as plugins from './plugins';

// TODO: make conditional handler custom dispatch functions

export default class Dispatcher {
  constructor ({ store = {}, config = { debug: true } }) {
    this.store = store;
    this.config = config;
    this.hasRegisteredPlugins = this.registerPlugins();
  };

  dispatch (event) {
    const handler = this.getHandler(event);
    const ctx = { payload: event.payload };

    let store = this.store;

    async function handle (e, i = 0) {
      const hasNext =  i + 1 < handler.length;
      const handleNext = handle.bind(this, e, i + 1);

      // return output of each of handler's
      // middleware functions
      const getOutput = async () => {
        const output = handler[i](store, ctx);

        // if output is a promise,
        // resolve it via async/await
        return output.then
          ? await output
          : output;
      };

      // update the local store value being passed to handler's
      // middleware by merging it with each middleware's output
      store = {
        ...store,
        ...(await getOutput())
      };

      hasNext && requestAnimationFrame(handleNext);
    };

    requestAnimationFrame(handle);
  };

  // return handler based on type and key and
  // allow array or functions via concatination.
  getHandler ({ type = 'react', key }) {
    const handler = plugins[type].handlers[key];

    return Array.prototype.concat(handler);
  };

  // call plugin.register on each plugin if
  // hasRegisteredPlugins is false
  registerPlugins () {
    if (this.hasRegisteredPlugins) return false;

    for (let name in plugins) {
      const { register } = plugins[name];

      if (typeof register === 'function') {
        register(this.dispatch);
      };
    };

    return true;
  };
};
