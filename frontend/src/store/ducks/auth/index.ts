import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
  signedIn: !!localStorage.getItem('@fmdev:token'),
  token: localStorage.getItem('@fmdev:token') || ''
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_IN_SUCCESS:
      return { signedIn: true, token: action.payload.token };
    case AuthTypes.SIGN_OUT_REQUEST:
      return { signedIn: false, token: '' };
    default:
      return state;
  }
};

export default reducer;