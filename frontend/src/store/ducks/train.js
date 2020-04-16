import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  trainInit: [],
  postTrain: ['filter'],
  trainRequest: [],
  trainSuccess: ['data'],
  trainError: ['err'],

  deleteTrain: ['filter'],
  trainDeleteRequest: [],
  trainDeleteSuccess: ['data'],
  trainDeleteError: ['err']
});

/** --------------------------------
 * Variable declarations
 * --------------------------------- */

// const INITIAL_STATE = Immutable({
//   data: {
//     "score": 0.6917098445595855,
//     "qtd_evaluated_pipelines": 116,
//     "fitted_pipelines": [
//       {
//         "algorithm": "GradientBoostingClassifier",
//         "hyperparameters": [
//           "input_matrix",
//           "learning_rate=0.01",
//           "max_depth=10",
//           "max_features=0.7500000000000001",
//           "min_samples_leaf=10",
//           "min_samples_split=18",
//           "n_estimators=100",
//           "subsample=0.2)"
//         ]
//       },
//       {
//         "algorithm": "GradientBoostingClassifier",
//         "hyperparameters": [
//           "ExtraTreesClassifier(SGDClassifier(input_matrix",
//           "SGDClassifier__alpha=0.001",
//           "SGDClassifier__eta0=0.1",
//           "SGDClassifier__fit_intercept=True",
//           "SGDClassifier__l1_ratio=0.0",
//           "SGDClassifier__learning_rate=constant",
//           "SGDClassifier__loss=modified_huber",
//           "SGDClassifier__penalty=elasticnet",
//           "SGDClassifier__power_t=0.0)",
//           "ExtraTreesClassifier__bootstrap=True",
//           "ExtraTreesClassifier__criterion=entropy",
//           "ExtraTreesClassifier__max_features=0.1",
//           "ExtraTreesClassifier__min_samples_leaf=17",
//           "ExtraTreesClassifier__min_samples_split=12",
//           "ExtraTreesClassifier__n_estimators=100)",
//           "learning_rate=0.01",
//           "max_depth=10",
//           "max_features=0.7500000000000001",
//           "min_samples_leaf=2",
//           "min_samples_split=18",
//           "n_estimators=100",
//           "subsample=0.2)"
//         ]
//       }
//     ]
//   },
//   loading: false,
//   error: false,
//   deleteLoading: false,
//   deleteError: false
// });

const INITIAL_STATE = Immutable({
  data: {},
  loading: false,
  error: false,
  deleteLoading: false,
  deleteError: false
});

/* Reducers */

export const init = state => state.merge({ ...INITIAL_STATE });

export const request = state => state.merge({ loading: true });

export const success = (state, { data }) => state.merge({ data, loading: false, error: false });

export const error = state => state.merge({ loading: false, error: true });

export const setFilter = (state, { filter }) => state.merge({ filter });

/* Delete Reducers */

export const deleteRequest = state => state.merge({ deleteLoading: true });

export const deleteSuccess = state => state.merge({ data: { ...INITIAL_STATE }, deleteLoading: false, deleteError: false });

export const deleteError = state => state.merge({ deleteLoading: false, deleteError: true });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.TRAIN_INIT]: init,
  [Types.TRAIN_REQUEST]: request,
  [Types.TRAIN_SUCCESS]: success,
  [Types.TRAIN_ERROR]: error,

  [Types.TRAIN_DELETE_REQUEST]: deleteRequest,
  [Types.TRAIN_DELETE_SUCCESS]: deleteSuccess,
  [Types.TRAIN_DELETE_ERROR]: deleteError
});