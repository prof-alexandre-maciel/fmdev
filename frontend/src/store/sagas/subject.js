import api from '../../services/api';
import { Creators } from '../ducks/subject';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getSubjects({ filter }) {
  try {
    yield put(Creators.subjectRequest());
    const response = yield call(api.post, 'subject', filter);

    yield put(Creators.subjectSuccess(response.data));
  } catch (err) {
    yield put(Creators.subjectError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar Disciplinas'
    }));
  }
}