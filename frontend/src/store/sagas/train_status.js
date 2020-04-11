import api from '../../services/api';
import { Creators } from '../ducks/train_status';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* postTrainStatus({ filter }) {
  try {
    yield put(Creators.trainStatusRequest());
    const response = yield call(api.post, 'train-status', filter);

    yield put(Creators.trainStatusSuccess(response.data));

  } catch (err) {
    yield put(Creators.trainStatusError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao buscar status do treinamento'
    }));
  }
}