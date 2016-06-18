import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
import { Router, createProvider } from '../../reroute-core';
import store from './store';
import * as plugins from 'plugins';

const router = new Router({ store, plugins });

const App = Root => {
  const Provider = createProvider(router);

  return (
    <AppContainer>
      <Provider>
        <Root/>
      </Provider>
    </AppContainer>
  );
};

ReactDOM.render(
  App(Root),
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept(
    './components/Root', _ => {
      const Root = require('./components/Root').default;

      ReactDOM.render(
        App(Root),
        document.getElementById('root')
      );
    }
  );
};
