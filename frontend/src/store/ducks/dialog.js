import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

export const { Types, Creators } = createActions({
  setDialog: ['field', 'data']
});

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: null,
  moodle: false,
  preProcessingConstant: true
});

/* Reducers */

export const set = (state, { field, data }) => state.merge({ [field]: !state[field], data: data });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.SET_DIALOG]: set
});
