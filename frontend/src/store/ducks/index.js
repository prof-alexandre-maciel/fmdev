import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import lms from './lms';
import auth from './auth';
import dialog from './dialog';
import screen from './screen';
import course from './course';
import subject from './subject';
import semester from './semester';
import indicator from './indicator';
import indicator_metadata from './indicator_metadata';
import { reducer as toastr } from 'react-redux-toastr';

export default history => combineReducers({
  lms,
  auth,
  dialog,
  toastr,
  screen,
  course,
  subject,
  semester,
  indicator,
  indicator_metadata,
  router: connectRouter(history)
});