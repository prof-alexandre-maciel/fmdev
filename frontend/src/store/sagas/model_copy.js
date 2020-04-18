import api from '../../services/api';
import { Creators } from '../ducks/model_copy';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { copyToClipboard } from '../../utils/utils';


export function* getModelCopy({ id }) {
  try {
    yield put(Creators.modelCopyRequest());
    const response = yield call(api.get, `model-copy/${id}`);

    yield put(Creators.modelCopySuccess(response.data));

    copyToClipboard(response.data.template);

    yield put(toastrActions.add({
      type: 'success',
      title: 'Sucesso',
      message: 'URL Copiada!'
    }));

  } catch (err) {
    yield put(Creators.modelCopyError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao copiar URL do modelo'
    }));
  }
}