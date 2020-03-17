import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import lms from './lms';
import auth from './auth';
import dialog from './dialog';
import screen from './screen';
import course from './course';
import subject from './subject';
import semester from './semester';
import box_plot from './box_plot';
import indicator from './indicator';
import pre_processing from './pre_processing';
import { reducer as toastr } from 'react-redux-toastr';

export default history => combineReducers({
  lms,
  auth,
  dialog,
  toastr,
  screen,
  course,
  subject,
  box_plot,
  semester,
  indicator,
  pre_processing,
  router: connectRouter(history)
});