import api from '../../services/api';
import { Creators } from '../ducks/train';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* postTrain({ filter }) {
  try {
    yield put(Creators.trainRequest());
    const response = yield call(api.post, 'train', { filter });

    yield put(Creators.trainSuccess(response.data));
  } catch (err) {
    yield put(Creators.trainError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao treinar base de dados'
    }));
  }
}