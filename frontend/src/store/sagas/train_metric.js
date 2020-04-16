import api from '../../services/api';
import { Creators } from '../ducks/train_metric';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* postTrainMetric({ filter }) {
  try {
    yield put(Creators.trainMetricRequest());
    const response = yield call(api.post, 'train-metric', filter);

    yield put(Creators.trainMetricSuccess(response.data));
  } catch (err) {
    yield put(Creators.trainMetricError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao exibir métricas do modelo'
    }));
  }
}