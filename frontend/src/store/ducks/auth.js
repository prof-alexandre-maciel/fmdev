import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

export const { Types, Creators } = createActions({
  signInRequest: ['email', 'password'],
  signInSuccess: ['token'],
  signOutRequest: [],
  signOutSuccess: []
});

/* Initial State */

export const INITIAL_STATE = Immutable({
  signedIn: !!localStorage.getItem('@fmdev:token'),
  token: localStorage.getItem('@fmdev:token') || ''
});

/* Reducers */

export const success = (state, { token }) => state.merge({ signedIn: true, token });

export const signOut = state => state.merge({ signedIn: false, token: '' });


/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_SUCCESS]: success,
  [Types.SIGN_OUT_SUCCESS]: signOut
});