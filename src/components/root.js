import Test from './Test';
import React from 'react';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <h1>This is the Root</h1>
        <Test/>
      </div>
    );
  }
};
