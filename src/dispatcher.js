import 'babel-polyfill';
import React from 'react';
import $$ from 'immutable';
import moment from 'moment';
import { ERRORS } from './constants';
import * as plugins from './plugins';
import store from './store';
import { EventEmitter2 } from 'eventemitter2';

const eventEmitter = new EventEmitter2({});

window.$$ = $$;

// TODO: make conditional handler custom dispatch functions

class Dispatcher {
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

      store = {
        ...store,
        ...output
      };

      if (i + 1 < handler.length) {
         requestAnimationFrame(handle.bind(this, e, i+1));
      } else {
        this.store = this.store.merge(store);

        eventEmitter.emit('change', this.store);
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

      register && register(this.dispatch);
    };

    return true;
  };

  // TODO: move to separate file, perhaps in react plugin dir?
  wrapComponent(WrappedComponent, mapping) {
    const self = this;

    return class Connect  extends React.Component {
      // TOOD: replace mapping arg with component props
      constructor (props) {
        super(props);

        this.state = {
          store: $$.Map({})
        };
      };

      setStateFromStore(store) {
        const newStore = {};

        for (let key in mapping) {
          newStore[key] = store.getIn(
            mapping[key]
          );
        };

        store = this.state
          .store
          .merge(newStore);

        this.setState(
          { store }
        );
      };

      componentDidMount () {
        eventEmitter.on(
          'change',
          this.setStateFromStore.bind(this)
        );

        this.setStateFromStore(self.store);
      };

      shouldComponentUpdate (_, nextState) {
        return this.state.store !== nextState.store;
      };

      render () {
        const props = this.state
          .store
          .toJS();

        return <WrappedComponent { ...props } />;
      };
    };
  };
};

export default new Dispatcher({});

