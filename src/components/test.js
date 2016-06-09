import React from 'react';
import router from './../router';

class Test extends React.Component {
  componentDidMount () {
    this.props.route({
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

export default router.wrapComponent(
  Test,
  { test: ['test'] }
);
