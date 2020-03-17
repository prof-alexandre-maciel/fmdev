import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

export const { Types, Creators } = createActions({
  boxPlotInit: [],
  boxPlotRequest: [],
  getBoxPlot: ['filter'],
  boxPlotSuccess: ['data'],
  boxPlotError: ['err']
});

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: {},
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
  [Types.BOX_PLOT_INIT]: init,
  [Types.BOX_PLOT_REQUEST]: request,
  [Types.BOX_PLOT_SUCCESS]: success,
  [Types.BOX_PLOT_ERROR]: error
});
