import { combineReducers } from 'redux';
import auth from './auth';
import process from './process';

const reduce = combineReducers({
  auth: auth,
  process: process
});

export default reduce;
