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
        {Object.keys(this.props).map((k) =>
          <p key={k}> {k}: {this.props[k]} </p>
        )}
      </h4>
    );
  };
};

export default router.connect(Test, {
  first: ['user', 'name', 'first'],
  last: ['user', 'name', 'last'],
  name: ['user', 'name']
});
