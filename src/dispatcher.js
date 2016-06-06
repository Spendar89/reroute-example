import 'babel-polyfill';
import React from 'react';
import $$ from 'immutable';
import moment from 'moment';
import { ERRORS } from './constants';
import * as plugins from './plugins';
import store from './store';
import { EventEmitter2 as EventEmitter } from 'eventemitter2';

class Dispatcher extends EventEmitter {
  constructor (opts) {
    super(opts);
    this.opts = opts;
    this.store = $$.Map().merge(store);
    this.isRegistered = this.registerPlugins();
  };

  dispatch (event) {
    const handler = this.getHandler(event);
    const ctx = { ...event };

    let store = this.store.toJS();

    async function handle (e, i=0) {
      let output = handler[i](store, ctx) || {};

      output = output.then ? await output : output;

      store = {
        ...store,
        ...output
      };

      if (i + 1 < handler.length) {
        requestAnimationFrame(handle.bind(this, e, i+1));
      } else {
        this.store = this.store.merge(store);

        this.emit('commit', this.store);
      };
    };

    requestAnimationFrame(handle.bind(this));
  };

  // return handler based on type and key and
  // allow array or functions via concatination.
  getHandler ({ type = 'react', key }) {
    const handler = plugins[type].handlers[key];

    return Array.prototype.concat(handler);
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
