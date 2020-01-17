import { call, put } from 'redux-saga/effects';
import api from '../../../services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn(action: any) {

  try {
    const response = yield call(api.post, 'auth/login', { ...action.payload });

    localStorage.setItem('@fmdev:token', response.data.token);
    yield put(signInSuccess(response.data.token));
  } catch (err) {
    yield put(signInFailure());
  }
}