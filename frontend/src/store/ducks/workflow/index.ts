import { Reducer } from 'redux';
import { WorkflowTypes, WorkflowState } from './types';

const INITIAL_STATE: WorkflowState = {
  openLmsModal: false,
  lms: ''
};

const reducer: Reducer<WorkflowState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WorkflowTypes.OPEN_LMS_MODAL:
      return { openLmsModal: true, lms: action.payload.lms };
    case WorkflowTypes.CLOSE_LMS_MODAL:
      return { openLmsModal: false, lms: '' };
    default:
      return state;
  }
};

export default reducer;