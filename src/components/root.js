import Messages from './Messages';
import React from 'react';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Messages path='msgs'/>
      </div>
    );
  };
};
