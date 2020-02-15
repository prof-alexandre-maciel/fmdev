import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  lmsInit: [],
  lmsRequest: [],
  lmsSuccess: ['data'],
  lmsError: ['err'],
  getLms: [],
  putLms: ['filter']
});

/** --------------------------------
 * Variable declarations
 * --------------------------------- */

const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  error: false
});

/* Reducers */

export const init = state => state.merge({ data: [] });

export const request = state => state.merge({ loading: true });

export const success = (state, { data }) => state.merge({ data, error: false, loading: false });

export const error = state => state.merge({ loading: false, error: true });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.LMS_INIT]: init,
  [Types.LMS_REQUEST]: request,
  [Types.LMS_SUCCESS]: success,
  [Types.LMS_ERROR]: error
});