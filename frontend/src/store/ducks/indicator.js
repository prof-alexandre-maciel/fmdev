import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  indicatorInit: [],
  indicatorRequest: [],
  indicatorSuccess: ['data'],
  indicatorError: ['err'],
  getIndicators: []
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
  [Types.INDICATOR_INIT]: init,
  [Types.INDICATOR_REQUEST]: request,
  [Types.INDICATOR_SUCCESS]: success,
  [Types.INDICATOR_ERROR]: error
});