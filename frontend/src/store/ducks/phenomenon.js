import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

export const { Types, Creators } = createActions({
  phenomenonInit: [],
  phenomenonRequest: [],
  getPhenomenon: [],
  phenomenonSuccess: ['data'],
  phenomenonError: ['err']
});

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  error: false
});

/* Reducers */

export const init = state => state.merge({ ...INITIAL_STATE });

export const request = state => state.merge({ loading: true });

export const success = (state, { data }) => state.merge({ data, error: false, loading: false });

export const error = state => state.merge({ loading: false, error: true });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.PHENOMENON_INIT]: init,
  [Types.PHENOMENON_REQUEST]: request,
  [Types.PHENOMENON_SUCCESS]: success,
  [Types.PHENOMENON_ERROR]: error
});
