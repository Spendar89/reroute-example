import dispatcher from './dispatcher'
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
import * as plugins from './plugins';
global._dispatcher = dispatcher;

const app = _root => <AppContainer><_root/></AppContainer>;

ReactDOM.render(app(Root), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./components/Root', _ => {
    const Root = require('./components/Root').default;
    ReactDOM.render(app(Root), document.getElementById('root'));
  });
};
