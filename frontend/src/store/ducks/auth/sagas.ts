import { call, put } from 'redux-saga/effects';
import api from '../../../services/api';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';

import { signInSuccess } from './actions';

export function* signIn(action: any) {

  try {
    const response = yield call(api.post, 'auth/login', { ...action.payload });

    localStorage.setItem('@fmdev:token', response.data.token);
    yield put(signInSuccess(response.data.token));
    yield put(push('/'));
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Falha no login',
      message: 'Verifique seu e-mail/senha'
    }));
  }
}