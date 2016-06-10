import React from 'react';
import { Map, fromJS } from 'immutable';

export default function connect (router, Component, mapping) {
  const route = e => router.route(e);

  const getVal = key => router
    .store
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

    shouldComponentUpdate (_, nextState) {
      const state = fromJS(this.state);

      return state !== state.merge(nextState);
    };

    get wrappedProps () {
      return {
        ...this.state,
        ...this.props,
        route
      };
    };

    render () {
      return React.createElement(
        Component,
        this.wrappedProps
      );
    };
  };
};
