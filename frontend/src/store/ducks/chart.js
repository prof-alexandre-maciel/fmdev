import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

export const { Types, Creators } = createActions({
  chartInit: [],
  chartRequest: [],
  getChart: ['filter'],
  chartSuccess: ['data', 'chartType'],
  chartError: ['err']
});

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: {},
  chartType: null,
  loading: false,
  error: false
});

/* Reducers */

export const init = state => state.merge({ ...INITIAL_STATE });

export const request = state => state.merge({ loading: true });

export const success = (state, { data, chartType }) => state.merge({ data, chartType, error: false, loading: false });

export const error = state => state.merge({ loading: false, error: true });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.CHART_INIT]: init,
  [Types.CHART_REQUEST]: request,
  [Types.CHART_SUCCESS]: success,
  [Types.CHART_ERROR]: error
});
