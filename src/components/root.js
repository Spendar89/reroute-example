import Messages from './Messages';
import { provider, router } from '../../../reroute-core';
import React from 'react';

const Provider = provider(router);

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider>
          <Messages key='1' path='msgs'/>
          <Messages key='2' path='msgs'/>
        </Provider>
      </div>
    );
  };
};
