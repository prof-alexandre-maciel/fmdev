import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  indicatorMetadataInit: [],
  indicatorMetadataRequest: [],
  indicatorMetadataSuccess: ['data'],
  indicatorMetadataError: ['err'],
  getIndicatorMetadata: ['filter'],
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
  [Types.INDICATOR_METADATA_INIT]: init,
  [Types.INDICATOR_METADATA_REQUEST]: request,
  [Types.INDICATOR_METADATA_SUCCESS]: success,
  [Types.INDICATOR_METADATA_ERROR]: error
});