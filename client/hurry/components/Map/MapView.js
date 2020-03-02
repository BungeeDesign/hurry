import React, { useEffect, useRef, useContext } from 'react';
import Map, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import Config from '../../constants/Enviroment';
import LocationMarker from '../Map/LocationMarker';
import RideContext from  "../../context/rideContext";

const MapView = ({ location }) => {
  const { latitude, longitude } = location.coords;
  const { fromLocation, userDestination } = useContext(RideContext);

  let origin = { latitude: fromLocation.latitude, longitude: fromLocation.longitude };
  if (fromLocation.length <= 0) {
    origin = { latitude: latitude, longitude: longitude };
  }

  let destination = { latitude: userDestination.latitude, longitude: userDestination.longitude };
  if (userDestination.length <= 0) {
    destination = { latitude: 0, longitude: 0 };
  }

  return (
    <View style={styles.mapContainer}>
        <Map
        region={{
          latitude: fromLocation.latitude,
          longitude: fromLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }} 
        style={styles.mapStyle}
        provider={ PROVIDER_GOOGLE }
        customMapStyle={generatedMapStyle}
        initialRegion={{
          latitude: 50.816218,
          longitude: -0.359450,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}> 
        <Map.Marker coordinate={origin} anchor={{x: 0.5, y: 0.5}}>
          <LocationMarker />
        </Map.Marker>
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={Config.GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor={Colors.green}
          >
          </MapViewDirections>
        </Map>
    </View>
  )
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    marginTop: 300,
    height: 450,
  },
});

const generatedMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#494662"
      }
    ]
  },
  {
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#403d58"
      }
    ]
  },
  {
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#403d58"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text",
    "stylers": [
      {
        "color": "#a59fbb"
      },
      {
        "saturation": 45
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#373247"
      },
      {
        "saturation": 35
      },
      {
        "weight": 2.5
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#555272"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#5e5a7e"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#403d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#5e5a7e"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];

export default MapView;