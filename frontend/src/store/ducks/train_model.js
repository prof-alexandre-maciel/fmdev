import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  trainModelInit: [],
  trainModelRequest: [],
  trainModelSuccess: ['data', 'lastModelSaved'],
  trainModelError: ['err'],
  getTrainModel: [],
  postTrainModel: ['data'],
  putTrainModel: ['id', 'data'],
  deleteTrainModel: ['id']
});

/** --------------------------------
 * Variable declarations
 * --------------------------------- */

const INITIAL_STATE = Immutable({
  data: [],
  lastModelSaved: null,
  loading: false,
  error: false
});

/* Reducers */

export const init = state => state.merge({ data: [] });

export const request = state => state.merge({ loading: true });

export const success = (state, { data, lastModelSaved }) => state.merge({ data, lastModelSaved, error: false, loading: false });

export const error = state => state.merge({ loading: false, error: true });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.TRAIN_MODEL_INIT]: init,
  [Types.TRAIN_MODEL_REQUEST]: request,
  [Types.TRAIN_MODEL_SUCCESS]: success,
  [Types.TRAIN_MODEL_ERROR]: error
});