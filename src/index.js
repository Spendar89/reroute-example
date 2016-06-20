import { createProvider } from '../../reroute-core';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
import store from 'store';
import * as plugins from 'plugins';

const App = Root => {
  const Provider = createProvider({
    store,
    plugins
  });

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
  module.hot.accept('./components/Root', () => {
    const Root = require('./components/Root').default;

    ReactDOM.render(
      App(Root),
      document.getElementById('root')
    );
  });
};
