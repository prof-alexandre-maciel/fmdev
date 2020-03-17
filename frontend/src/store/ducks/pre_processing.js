import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  preProcessingInit: [],
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
  [Types.PRE_PROCESSING_INIT]: init,
  [Types.PRE_PROCESSING_REQUEST]: request,
  [Types.PRE_PROCESSING_SUCCESS]: success,
  [Types.PRE_PROCESSING_ERROR]: error
});