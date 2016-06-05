import React from 'react';
import dispatcher from './../Dispatcher';

class Test extends React.Component {
  render() {
    return (
      <h4>
        Test props: { JSON.stringify(this.props) }
      </h4>
    );
  };
};

export default dispatcher.wrapComponent(Test, { test: ['test'] });
