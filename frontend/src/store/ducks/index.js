import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import lms from './lms';
import auth from './auth';
import dialog from './dialog';
import screen from './screen';
import { reducer as toastr } from 'react-redux-toastr';

export default history => combineReducers({
  lms,
  auth,
  dialog,
  toastr,
  screen,
  router: connectRouter(history)
});