import {
  GET_LOCATION,
  GET_DESTINATION,
} from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return {
        ...state,
        fromLocation: action.payload.data[0]
      };
    case GET_DESTINATION:
      return {
        ...state,
        userDestination: action.payload.data[0]
      };
  }
}