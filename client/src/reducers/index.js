import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import libraryReducer from './libraryReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  library: libraryReducer
});
