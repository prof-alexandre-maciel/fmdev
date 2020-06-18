import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import lms from './lms';
import auth from './auth';
import train from './train';
import chart from './chart';
import dialog from './dialog';
import screen from './screen';
import course from './course';
import subject from './subject';
import semester from './semester';
import indicator from './indicator';
import pre_processing from './pre_processing';
import train_status from './train_status';
import train_model from './train_model';
import train_metric from './train_metric';
import model_copy from './model_copy';
import download from './download';
import data_source from './data_source';
import phenomenon from './phenomenon';
import { reducer as toastr } from 'react-redux-toastr';

export default history => combineReducers({
  lms,
  auth,
  train,
  chart,
  dialog,
  toastr,
  screen,
  course,
  subject,
  semester,
  indicator,
  pre_processing,
  train_status,
  train_model,
  train_metric,
  model_copy,
  download,
  data_source,
  phenomenon,
  router: connectRouter(history)
});