import { action } from 'typesafe-actions';
import { WorkflowTypes } from './types';

export const openLmsModal = (lms: string) => action(WorkflowTypes.OPEN_LMS_MODAL, { lms });
export const closeLmsModal = () => action(WorkflowTypes.CLOSE_LMS_MODAL);