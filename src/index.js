import router from './router'
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
import * as plugins from './plugins';

//global._dispatcher = router;

const App = Root =>
  <AppContainer><Root/></AppContainer>;

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
