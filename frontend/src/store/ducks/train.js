import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  trainInit: [],
  postTrain: ['filter'],
  trainRequest: [],
  trainSuccess: ['data'],
  trainError: ['err']
});

/** --------------------------------
 * Variable declarations
 * --------------------------------- */

const INITIAL_STATE = Immutable({
  data: {},
  loading: true,
  error: false
});

/* Reducers */

export const init = state => state.merge({ ...INITIAL_STATE });

export const request = state => state.merge({ loading: true });

export const success = (state, { data }) => state.merge({ data, loading: false, error: false });

export const error = state => state.merge({ loading: false, error: true });

export const setFilter = (state, { filter }) => state.merge({ filter });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.TRAIN_INIT]: init,
  [Types.TRAIN_REQUEST]: request,
  [Types.TRAIN_SUCCESS]: success,
  [Types.TRAIN_ERROR]: error,
});