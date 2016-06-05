import React from 'react';
import dispatcher from './../dispatcher';

class Test extends React.Component {
  componentDidMount () {
    this.props.dispatch({
      key: 'clickedTestButton',
      payload: { ms: 1000 }
    });
  };

  render() {
    return (
      <h4>
        Test props: { JSON.stringify(this.props) }
      </h4>
    );
  };
};

export default dispatcher.wrapComponent(
  Test,
  { test: ['test'] }
);
