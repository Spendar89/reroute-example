import 'babel-polyfill';
import moment from 'moment';
import { ERRORS } from './constants';
import * as plugins from './plugins';

// TODO: make conditional handler custom dispatch functions

export default class Dispatcher {
  constructor ({ store = {}, config = { debug: true } }) {
    this.store = store;
    this.config = config;
    this.hasRegisterPlugins = this.registerPlugins();
  };

  dispatch ({ key, type='react', payload = {} }) {
    const handler = plugins[type].handlers[key];
    const ctx = { payload };
    let store = this.store;

    async function handle (e, i = 0) {
      const hasNext =  i + 1 < handler.length;
      const handleNext = handle.bind(this, e, i + 1);
      const getOutput = async () => {
        const o = handler[i](store, ctx);
        return o.then ? await o : o;
      };

      store = { ...store, ...(await getOutput()) };

      hasNext && requestAnimationFrame(handleNext);
    };

    requestAnimationFrame(handle);
  };

  registerPlugins () {
    if (this.hasRegisterPlugins) return false;

    for (let name in plugins) {
      const { register } = plugins[name];

      if (typeof register === 'function') {
        register(this.dispatch);
      };
    };

    return true;
  };
};
