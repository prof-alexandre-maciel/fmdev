import { combineReducers } from 'redux';

import repositories from './repositories';
import auth from './auth';

export default combineReducers({
  auth,
  repositories,
});