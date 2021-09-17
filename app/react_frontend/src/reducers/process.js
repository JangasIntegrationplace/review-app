import * as processActionTypes from './../constants/actions/process'

const initialState = {
  isLoading: false
}

const startProcess = (state, action) => {
  return {
    isLoading: true
  }
}

const stopProcess = (state, action) => {
  return {
    isLoading: false
  }
}

const process = (state=initialState, action) => {
  switch (action.type) {
    case processActionTypes.PROCESS_START_LOADING: return startProcess(state, action);
    case processActionTypes.PROCESS_LOADED_COMPLETE: return stopProcess(state, action);
    default:
        return state;
  }
}

export default process;
