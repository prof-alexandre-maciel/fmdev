import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { PRE_PROCESSING } from '../../constants';

/* Types & Action Creators */

export const { Types, Creators } = createActions({
  setScreen: ['screen']
});

/* Initial State */

export const INITIAL_STATE = Immutable({
  activeScreen: PRE_PROCESSING
});

/* Reducers */

export const set = (state, { screen }) => state.merge({ activeScreen: screen });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.SET_SCREEN]: set
});
