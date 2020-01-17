import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import GlobalStyle from './styles/global';
import ReduxToastr from 'react-redux-toastr';

import store from './store';

import Routes from './routes';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Routes />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick />
      <GlobalStyle />
    </Fragment>
  </Provider>
);

export default App;