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
      let output = handler[i](store, ctx) || {};

      output = output.then ? await output : output;
      store = { ...store, ...output };

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
    if (this.hasRegisteredPlugins) {
     return false;
    };

    for (let name in plugins) {
      const { register } = plugins[name];
      register && register(this.dispatch);
    };

    return true;
  };
};
