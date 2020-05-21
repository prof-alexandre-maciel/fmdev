import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import GlobalStyle from './styles/global';
import ReduxToastr from 'react-redux-toastr';
import { materialUIStyle } from './styles/global';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import store from './store';
import Routes from './routes';

require('dotenv').config({  
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
})

const App = () => (
  <Provider store={store}>
    <Fragment>
      <MuiThemeProvider theme={materialUIStyle}>
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
      </MuiThemeProvider>
      <GlobalStyle />
    </Fragment>
  </Provider>
);

export default App;