import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  preProcessingInit: [],
  preProcessingSetFilter: ['filter'],
  preProcessingRequest: [],
  preProcessingSuccess: ['data'],
  preProcessingError: ['err'],
  getPreProcessing: ['filter'],

  deletePreProcessing: ['filter'],
  preProcessingDeleteRequest: [],
  preProcessingDeleteSuccess: ['data'],
  preProcessingDeleteError: ['err'],
});

/** --------------------------------
 * Variable declarations
 * --------------------------------- */

const INITIAL_STATE = Immutable({
  data: [],
  path: null,
  is_processed: false,
  filter: null,
  loading: false,
  error: false,
  deleteLoading: false,
  deleteError: false
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

/* Delete Reducers */

export const deleteRequest = state => state.merge({ deleteLoading: true });

export const deleteSuccess = state => state.merge({ data: { ...INITIAL_STATE }, deleteLoading: false, deleteError: false });

export const deleteError = state => state.merge({ deleteLoading: false, deleteError: true });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.PRE_PROCESSING_INIT]: init,
  [Types.PRE_PROCESSING_REQUEST]: request,
  [Types.PRE_PROCESSING_SUCCESS]: success,
  [Types.PRE_PROCESSING_ERROR]: error,
  [Types.PRE_PROCESSING_SET_FILTER]: setFilter,

  [Types.PRE_PROCESSING_DELETE_REQUEST]: deleteRequest,
  [Types.PRE_PROCESSING_DELETE_SUCCESS]: deleteSuccess,
  [Types.PRE_PROCESSING_DELETE_ERROR]: deleteError,
});