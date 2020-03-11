import React, { useReducer } from "react";
import { AsyncStorage } from 'react-native';
import axios from "axios";
import RideContext from "./rideContext";
import RideReducer from "./rideReducer";
import Config from '../constants/Enviroment';

import {
  GET_LOCATION,
  SET_LOCATION,
  GET_DESTINATION,
  SAVE_USER_APPS
} from './types';

const RideState = props => {
  const initialState = {
    fromLocation: [],
    userDestination: [],
    userApps: []
  };

  const [state, dispatch] = useReducer(RideReducer, initialState);

  // Get Lat/Long from current location Address/Post Code
  const getLocation = async (currentLocation) => {
    try {
      const res = await axios(`http://api.positionstack.com/v1/forward?access_key=${Config.POSITION_STACK_KEY}&query=${currentLocation}`);
    
      const data = {
        "coords":  {
          "accuracy": 20,
          "altitude": 0,
          "heading": 0,
          "latitude": res.data.data[0].latitude,
          "longitude": res.data.data[0].longitude,
          "speed": 0,
        },
        "mocked": false,
        "timestamp": 1583969536000
      }

      dispatch({
        type: GET_LOCATION,
        payload: data
      });
    } catch (error) {
      console.log('[Axios Request Error] -', error);
    }
  };

  // Set the location (Used when current device location is active or on input)
  const setLocation = async (currentLocation) => {
      dispatch({
        type: SET_LOCATION,
        payload: currentLocation
      });
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

  const saveUserApps = async (apps) => {
    try {
      await AsyncStorage.setItem('userApps', JSON.stringify(apps));
    } catch (error) {
      console.log('[Error saving user apps ] - ', error);
    }

    dispatch({
      type: SAVE_USER_APPS,
      payload: apps
    });
  }

  return (
    <RideContext.Provider
      value={{
        fromLocation: state.fromLocation,
        userDestination: state.userDestination,
        userApps: state.userApps,
        getLocation,
        setLocation,
        getDestination,
        saveUserApps
      }}
    >
      {props.children}
    </RideContext.Provider>
  )
}

export default RideState;