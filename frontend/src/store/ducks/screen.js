import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { TRAIN_MODEL } from '../../constants';

/* Types & Action Creators */

export const { Types, Creators } = createActions({
  setScreen: ['screen', 'data']
});

/* Initial State */

export const INITIAL_STATE = Immutable({
  activeScreen: TRAIN_MODEL,
  data: {}
});

/* Reducers */

export const set = (state, { screen, data }) => state.merge({ activeScreen: screen, data });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.SET_SCREEN]: set
});
