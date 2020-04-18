import api from '../../services/api';
import { Creators } from '../ducks/download';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { downloadStream } from '../../utils/utils';


export function* getDownload({ id, action }) {
  try {
    yield put(Creators.downloadRequest());
    const response = yield call(api.get, `download/${id}?action=${action}`, { responseType: 'blob' });

    yield put(Creators.downloadSuccess(response.data));
    downloadStream({ id, content: response.data, action });

  } catch (err) {
    yield put(Creators.downloadError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao baixar arquivo'
    }));
  }
}