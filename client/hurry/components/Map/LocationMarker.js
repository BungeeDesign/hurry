import React from 'react';
import { Image, Platform } from 'react-native';

const LocationMarker = ({}) => {
  if (Platform.OS === 'android') {
    return (
      <Image source={require('../../assets/animations/map-marker.webp')} />
    )
  } else {
    return (
      <Image source={require('../../assets/animations/marker.png')} />
    )
  }
};

export default LocationMarker;