import * as processActionTypes from './../constants/actions/process'

export const startProcess = () => {
  return {
    type: processActionTypes.PROCESS_START_LOADING
  }
}

export const processComplete = () => {
  return {
    type: processActionTypes.PROCESS_LOADED_COMPLETE
  }
}
