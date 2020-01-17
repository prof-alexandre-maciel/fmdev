import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import GlobalStyle from './styles/global';

import store from './store';

import Routes from './routes';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Routes />
      <GlobalStyle />
    </Fragment>
  </Provider>
);

export default App;