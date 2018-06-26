import { GET_LIBRARY, LIBRARY_LOADING, CLEAR_CURRENT_LIBRARY } from '../actions/types';

const initialState = {
  library: null,
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LIBRARY_LOADING:
      return {
        ...state,
        loading: true
      }
      case GET_LIBRARY:
        return {
          ...state,
          library: action.payload,
          loading: false
        }
        case CLEAR_CURRENT_LIBRARY:
          return {
            ...state,
            library: null
          }
    default:
      return state;
  }
};
