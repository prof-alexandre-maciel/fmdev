import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  trainInit: [],
  postTrain: ['filter'],
  trainRequest: [],
  trainSuccess: ['data'],
  trainError: ['err'],

  deleteTrain: ['filter'],
  trainDeleteRequest: [],
  trainDeleteSuccess: ['data'],
  trainDeleteError: ['err']
});

/** --------------------------------
 * Variable declarations
 * --------------------------------- */

const INITIAL_STATE = Immutable({
  data: {},
  loading: false,
  error: false,
  deleteLoading: false,
  deleteError: false
});

/* Reducers */

export const init = state => state.merge({ ...INITIAL_STATE });

export const request = state => state.merge({ loading: true });

export const success = (state, { data }) => state.merge({ data, loading: false, error: false });

export const error = state => state.merge({ loading: false, error: true });

export const setFilter = (state, { filter }) => state.merge({ filter });

/* Delete Reducers */

export const deleteRequest = state => state.merge({ deleteLoading: true });

export const deleteSuccess = state => state.merge({ data: { ...INITIAL_STATE }, deleteLoading: false, deleteError: false });

export const deleteError = state => state.merge({ deleteLoading: false, deleteError: true });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.TRAIN_INIT]: init,
  [Types.TRAIN_REQUEST]: request,
  [Types.TRAIN_SUCCESS]: success,
  [Types.TRAIN_ERROR]: error,

  [Types.TRAIN_DELETE_REQUEST]: deleteRequest,
  [Types.TRAIN_DELETE_SUCCESS]: deleteSuccess,
  [Types.TRAIN_DELETE_ERROR]: deleteError
});