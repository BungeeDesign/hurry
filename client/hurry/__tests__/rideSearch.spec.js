import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import RideSearch from '../components/RideSearch';
import RideContext from "../context/rideContext";

let fromLocation = '';
let userDestination = '';

describe('RideSearch', () => {
  describe('keyboard return', () => {
    it('searches for the current location', () => {
      const {getByTestId} = render(
        <RideContext.Provider value={{ fromLocation, userDestination }}>
          <RideSearch />
        </RideContext.Provider>
      );

      fireEvent.changeText(getByTestId('currentLocation'), 'bn15 8by');
      fireEvent.changeText(getByTestId('destinationLocation'), 'bn11 2ly');

      expect(getByTestId('currentLocation').props.value).toEqual('bn15 8by');
      expect(getByTestId('destinationLocation').props.value).toEqual('bn11 2ly');
    });
  });
});