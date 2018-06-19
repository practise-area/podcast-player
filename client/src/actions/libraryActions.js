import axios from 'axios';
import { GET_LIBRARY, LIBRARY_LOADING, GET_ERRORS, CLEAR_CURRENT_LIBRARY } from './types';

// get logged in users library
export const getCurrentLibrary = () => dispatch => {
  dispatch(setLibraryLoading());
  axios.get('/api/library')
    .then(res =>
      dispatch({
        type: GET_LIBRARY,
        payload: res.data
      })
    )
      .catch(err =>
        dispatch({
          type: GET_LIBRARY,
          payload: {}
        })
      );
}

export const setLibraryLoading = () => {
  return {
    type: LIBRARY_LOADING
  }
}


export const clearCurrentLibrary = () => {
  return {
    type: CLEAR_CURRENT_LIBRARY
  }
}
