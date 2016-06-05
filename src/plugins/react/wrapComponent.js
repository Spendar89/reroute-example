import React from 'react';
import { Map } from 'immutable';

export default function wrapComponent (dispatcher, WrappedComponent, mapping) {
  return class Wrapper extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        store: Map({})
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

    componentWillMount () {
      dispatcher.on(
        'commit',
        this.setStateFromStore.bind(this)
      );

      this.setStateFromStore(dispatcher.store);
    };

    shouldComponentUpdate (_, nextState) {
      return this.state.store !== nextState.store;
    };

    render () {
      const dispatch = dispatcher.dispatch.bind(dispatcher);
      const store = this.state.store.toJS();
      const props = { ...store, dispatch };

      return React.createElement(WrappedComponent, props);
    };
  };
};
