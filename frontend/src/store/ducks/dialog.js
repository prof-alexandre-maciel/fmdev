import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

export const { Types, Creators } = createActions({
  setDialog: ['field', 'data'],
  setDialogData: ['data']
});

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: null,
  alert: false,
  moodle: false,
  dataSource: false,
  preProcessingConstant: false,
  trainConfig: false,
  trainSave: false,
  trainMetrics: false,
  trainAlgorithm: false
});

/* Reducers */

export const set = (state, { field, data }) => state.merge({ [field]: !state[field], data: data });

export const setData = (state, { data }) => state.merge({ data: { ...state.data, ...data } });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.SET_DIALOG]: set,
  [Types.SET_DIALOG_DATA]: setData
});
