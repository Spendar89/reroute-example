import React from 'react';
import { Map, fromJS } from 'immutable';

export default function wrapComponent (router, WrappedComponent, mapping) {
  return class Wrapper extends React.Component {
    constructor (props) {
      super(props);
    };

    setStateFromStore() {
      const newState = {};

      for (let key in mapping) {
        newState[key] = router
          .store
          .getIn(mapping[key]);
      };

      this.setState(newState);
    };

    componentWillMount () {
      router.on(
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
      const route = router
        .route
        .bind(router);

      const props = {
        ...this.state,
        ...this.props,
        route
      };

      return React.createElement(
        WrappedComponent,
        props
      );
    };
  };
};
