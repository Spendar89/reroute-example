import React from 'react';

export default class Provider extends React.Component {
  componentWillMount () {
    this.props.handleCommit(
      _ => this.setState(this.props.mapState)
    );

    this.setState(this.props.mapState);
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
      ...this.props
    };
  };

  render () {
    return React.createElement(
      this.props.Component,
      this.mergedProps
    );
  };
};
