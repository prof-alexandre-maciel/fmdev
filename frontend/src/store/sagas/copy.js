import api from '../../services/api';
import { Creators } from '../ducks/copy';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { copyToClipboard } from '../../utils/utils';


export function* getCopy({ id }) {
  try {
    yield put(Creators.copyRequest());
    const response = yield call(api.get, `copy/${id}`);

    yield put(Creators.copySuccess(response.data));

    copyToClipboard(response.data.template);

    yield put(toastrActions.add({
      type: 'success',
      title: 'Sucesso',
      message: 'URL Copiada!'
    }));

  } catch (err) {
    yield put(Creators.copyError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao copiar URL do modelo'
    }));
  }
}