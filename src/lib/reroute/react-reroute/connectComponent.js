import React from 'react';
import router from '../router';
import { Map, fromJS } from 'immutable';
import Provider from './Provider';

export default function connectComponent (Component, mapping) {
  const route = e => router.route(e),
    handleCommit = cb => router.on('commit', cb),
    getVal = key => router.state && router.state.getIn(mapping[key]),
    mapVal = key => ({ [key]: getVal(key) });

  const mapState = _ => Object
    .keys(mapping)
    .reduce((state, key) => {
      return {
        ...state,
        ...mapVal(key)
      };
    }, {});

  const props = {
    mapState,
    handleCommit,
    route,
    Component
  };

  return () => {
    return React.createElement(
      Provider,
      props
    );
  };

};
