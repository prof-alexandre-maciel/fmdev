import api from '../../services/api';
import { Creators } from '../ducks/train_model';
import { Creators as DialogCreators } from '../ducks/dialog';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getTrainModel() {
  try {
    yield put(Creators.trainModelRequest());
    const response = yield call(api.get, 'train-model');

    yield put(Creators.trainModelSuccess(response.data));
  } catch (err) {
    yield put(Creators.trainModelError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar modelos'
    }));
  }
}

export function* postTrainModel({ data }) {
  try {
    yield put(Creators.trainModelRequest());
    const response = yield call(api.post, 'train-model', data);

    yield put(Creators.trainModelSuccess(response.data, data.path));
    yield put(DialogCreators.setDialog('trainSave'));

    yield put(toastrActions.add({
      type: 'success',
      title: 'Sucesso',
      message: `Modelo salvo com sucesso!`
    }));
  } catch (err) {
    yield put(Creators.trainModelError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao salvar modelo'
    }));
  }
}