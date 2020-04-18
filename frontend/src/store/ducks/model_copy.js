import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  modelCopyInit: [],
  modelCopyRequest: [],
  modelCopySuccess: ['data'],
  modelCopyError: ['err'],
  getModelCopy: ['id']
});

/** --------------------------------
 * Variable declarations
 * --------------------------------- */

const INITIAL_STATE = Immutable({
  data: {},
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
  [Types.MODEL_COPY_INIT]: init,
  [Types.MODEL_COPY_REQUEST]: request,
  [Types.MODEL_COPY_SUCCESS]: success,
  [Types.MODEL_COPY_ERROR]: error
});