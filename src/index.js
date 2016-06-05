import dispatcher from './Dispatcher'
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/root';
import * as plugins from './plugins';
global._dispatcher = dispatcher;

const app = _root => <AppContainer><_root/></AppContainer>;

ReactDOM.render(app(Root), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./components/root', _ => {
    const Root = require('./components/root').default;
    ReactDOM.render(app(Root), document.getElementById('root'));
  });
};
