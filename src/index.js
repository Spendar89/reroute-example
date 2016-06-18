import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
//import router from 'reroute-core';
import { router } from '../../reroute-core';
import store from './store';
import * as plugins from 'plugins';

router.registerStore(store);
router.registerPlugins(plugins)

window._React = React;
window._ReactDOM = ReactDOM;

const App = Root =>
  <AppContainer><Root router={router}/></AppContainer>;

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
