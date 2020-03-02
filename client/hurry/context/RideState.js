import React, { useReducer } from "react";
import axios from "axios";
import RideContext from "./rideContext";
import RideReducer from "./rideReducer";
import Config from '../constants/Enviroment';

import {
  GET_LOCATION,
  GET_DESTINATION,
} from './types';

const RideState = props => {
  const initialState = {
    fromLocation: [],
    userDestination: []
  };

  const [state, dispatch] = useReducer(RideReducer, initialState);

  // Get Lat/Long from current location Address/Post Code
  const getLocation = async (currentLocation) => {
    try {
      const res = await axios(`http://api.positionstack.com/v1/forward?access_key=${Config.POSITION_STACK_KEY}&query=${currentLocation}`);
      dispatch({
        type: GET_LOCATION,
        payload: res.data
      });
    } catch (error) {
      console.log('[Axios Request Error] -', error);
    }
  };

  // Get Lat/Long from entered destination
  const getDestination = async (destination) => {
    try {
      const res = await axios(`http://api.positionstack.com/v1/forward?access_key=${Config.POSITION_STACK_KEY}&query=${destination}`);
      dispatch({
        type: GET_DESTINATION,
        payload: res.data
      });
    } catch (error) {
      console.log('[Axios Request Error] -', error);
    }
  };

  return (
    <RideContext.Provider
      value={{
        fromLocation: state.fromLocation,
        userDestination: state.userDestination,
        getLocation,
        getDestination
      }}
    >
      {props.children}
    </RideContext.Provider>
  )
}

export default RideState;