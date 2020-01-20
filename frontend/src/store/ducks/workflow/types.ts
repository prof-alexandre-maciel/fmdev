/**
 * Action types
 */
export enum WorkflowTypes {
  OPEN_LMS_MODAL = '@workflow/OPEN_LMS_MODAL',
  CLOSE_LMS_MODAL = '@workflow/CLOSE_LMS_MODAL'
}

/**
 * Data types
 */
export interface Workflow {
  openLmsModal: boolean
  lms: string
}

/**
 * State type
 */
export interface WorkflowState {
  readonly openLmsModal: boolean
  readonly lms: string
}