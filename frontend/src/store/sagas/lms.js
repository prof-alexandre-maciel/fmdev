import api from '../../services/api';
import { Creators } from '../ducks/lms';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getLms() {
  try {
    yield put(Creators.lmsRequest());
    const response = yield call(api.get, 'lms');

    yield put(Creators.lmsSuccess(response.data));
  } catch (err) {
    yield put(Creators.lmsError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar LMS'
    }));
  }
}

export function* putLms({ filter }) {
  try {
    yield put(Creators.lmsRequest());
    const response = yield call(api.put, 'lms', filter);

    yield put(Creators.lmsSuccess(response.data));

    yield put(toastrActions.add({
      type: 'success',
      title: 'Sucesso',
      message: 'Fonte de dados alterada com sucesso!'
    }));

  } catch (err) {
    yield put(Creators.lmsError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao atualizar LMS'
    }));
  }
}