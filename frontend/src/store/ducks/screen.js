import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ADD_TRAIN, DATASOURCE } from '../../constants';

/* Types & Action Creators */

export const { Types, Creators } = createActions({
  setScreen: ['screen', 'component', 'data']
});

/* Initial State */

export const INITIAL_STATE = Immutable({
  activeScreen: ADD_TRAIN,
  activeComponent: DATASOURCE,
  data: {}
});

/* Reducers */

export const set = (state, { screen, component, data }) => state.merge({
  activeScreen: screen,
  activeComponent: component,
  data
});

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.SET_SCREEN]: set
});
