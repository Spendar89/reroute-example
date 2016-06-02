import 'babel-polyfill';
import { createClass } from 'react';
import $$ from 'immutable';
import moment from 'moment';
import { ERRORS } from './constants';
import * as plugins from './plugins';
import store from './store';

window.$$ = $$;

// TODO: make conditional handler custom dispatch functions

export default class Dispatcher {
  constructor (opts) {
    this.opts = opts;
    this.store = $$.Map(store);
    this.isRegistered = this.registerPlugins();
  };

  dispatch (event) {
    const handler = this.getHandler(event);
    const ctx = { payload: event.payload };
    let store = this.store.toJS();

    async function handle (e, i=0) {
      let output = handler[i](store, ctx) || {};
      output = output.then ? await output : output;
      store = { ...store, ...output };

      // after last middleware, commit changes
      // by merging this.store with local store object
      i+1 < handler.length
        ? requestAnimationFrame(handle.bind(this, e, i+1))
        : this.store = this.store.merge(store);
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
      register && register(this.dispatch);
    };

    return true;
  };

  // TODO: move to separate file, perhaps in
  // react plugin dir?
  connectComponent(Component, mapping) {
    const store = this.store;

    return createClass({
      getInitialState() {
        return $$.Map();
      },

      setStateFromStore() {
        const newState = {};

        for (let key in mapping) {
          const path = mapping[key];
          newState[key] = store.getIn(path);
        };

        this.setState(this.state.merge(newState));
      },

      componentDidMount () {
        //store.subscribe(this.setStateFromStore);
        this.setStateFromStore();
      },

      shouldComponentUpdate (_, nextState) {
       return this.state !== nextState;
      },

      render () {
        return <Component { ...this.state }/>
      }
    });
  };

};
