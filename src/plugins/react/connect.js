import React from 'react';
import { Map, fromJS } from 'immutable';

export default function connect (router, Component, mapping) {
  const route = e => router.route(e);

  const getVal = key => router
    .state
    .getIn(mapping[key]);

  const mapVal = key => ({
    [key]: getVal(key)
  });

  const mapState = _ => Object.keys(mapping)
    .reduce((state, key) => ({
      ...state,
      ...mapVal(key)
    }), {});

  return class Provider extends React.Component {
    componentWillMount () {
      router.on(
        'commit',
        _ => this.setState(mapState)
      );

      this.setState(mapState);
    };

    // TODO: determine if this implementation
    // is more efficient than converting to
    // immutable and merging before check
    shouldComponentUpdate (_, nextState) {
      // TODO: move to util...
      const length = obj =>
        Object.keys(obj).length;

      // values are immutable, so reference
      // equality check works
      for (let k in nextState) {
        if (nextState[k] !== this.state[k]) {
          return true;
        };
      };

      // account for edge case where keys are removed
      // from state
      return length(nextState) !== length(this.state);
    };

    get mergedProps () {
      return {
        ...this.state,
        ...this.props,
        route
      };
    };

    render () {
      return React.createElement(
        Component,
        this.mergedProps
      );
    };
  };
};
