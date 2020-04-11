import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  preProcessingInit: [],
  preProcessingSetFilter: ['filter'],
  preProcessingRequest: [],
  preProcessingSuccess: ['data'],
  preProcessingError: ['err'],
  getPreProcessing: ['filter'],
});

/** --------------------------------
 * Variable declarations
 * --------------------------------- */

const INITIAL_STATE = Immutable({
  data: [],
  path: null,
  filter: null,
  is_processed: false,
  loading: false,
  error: false
});

/* Reducers */

export const init = state => state.merge({ ...INITIAL_STATE });

export const request = state => state.merge({ loading: true });

export const success = (state, { data }) => state.merge({
  data: data.data,
  path: data.path,
  is_processed: data.is_processed,
  error: false,
  loading: false
});

export const error = state => state.merge({ loading: false, error: true });

export const setFilter = (state, { filter }) => state.merge({ filter });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.PRE_PROCESSING_INIT]: init,
  [Types.PRE_PROCESSING_REQUEST]: request,
  [Types.PRE_PROCESSING_SUCCESS]: success,
  [Types.PRE_PROCESSING_ERROR]: error,
  [Types.PRE_PROCESSING_SET_FILTER]: setFilter,
});