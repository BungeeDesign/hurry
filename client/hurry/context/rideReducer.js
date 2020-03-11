import {
  GET_LOCATION,
  SET_LOCATION,
  GET_DESTINATION,
  SAVE_USER_APPS
} from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return {
        ...state,
        fromLocation: action.payload
      };
    case SET_LOCATION:
      return {
        ...state,
        fromLocation: action.payload
      };
    case GET_DESTINATION:
      return {
        ...state,
        userDestination: action.payload.data[0]
      };
    case SAVE_USER_APPS:
      return {
        ...state,
        userApps: action.payload
      };
  }
}