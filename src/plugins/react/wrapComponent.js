import React from 'react';
import { Map, fromJS } from 'immutable';

export default function wrapComponent (dispatcher, WrappedComponent, mapping) {
  return class Wrapper extends React.Component {
    constructor (props) {
      super(props);
    };

    setStateFromStore() {
      const newState = {};

      for (let key in mapping) {
        newState[key] = dispatcher
          .store
          .getIn(mapping[key]);
      };

      this.setState(newState);
    };

    componentWillMount () {
      dispatcher.on(
        'commit',
        this.setStateFromStore
          .bind(this)
      );

      this.setStateFromStore();
    };

    shouldComponentUpdate (_, nextState) {
      const state = fromJS(this.state);

      return state !== state.mergeDeep(nextState);
    };

    render () {
      const dispatch = dispatcher
        .dispatch
        .bind(dispatcher);

      const props = {
        ...this.state,
        ...this.props,
        dispatch
      };

      return React.createElement(
        WrappedComponent,
        props
      );
    };
  };
};
