import api from '../../services/api';
import { Creators } from '../ducks/train';
import { Creators as TrainStatusCreators } from '../ducks/train_status';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* postTrain({ filter }) {
  try {
    yield put(Creators.trainInit());
    yield put(Creators.trainRequest());
    const response = yield call(api.post, 'train', filter);

    yield put(toastrActions.add({
      type: 'success',
      title: 'Sucesso',
      message: `Treinamento finalizado com sucesso!`
    }));

    yield put(Creators.trainSuccess(response.data));
    yield put(TrainStatusCreators.postTrainStatus(filter));
  } catch (err) {
    yield put(Creators.trainError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao treinar base de dados'
    }));
  }
}

export function* deleteTrain({ filter }) {
  try {
    yield put(Creators.trainDeleteRequest());
    const response = yield call(api.delete, 'train', { data: filter });

    yield put(Creators.trainDeleteSuccess(response.data));
  } catch (err) {
    yield put(Creators.trainDeleteError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao excluir dados do treinamento'
    }));
  }
}