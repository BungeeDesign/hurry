import React, { useEffect, useRef, useContext } from 'react';
import Map, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import Config from '../../constants/Enviroment';
import LocationMarker from '../Map/LocationMarker';
import RideContext from  "../../context/rideContext";

const MapView = ({ location }) => {
  const { fromLocation, userDestination } = useContext(RideContext);

  // console.log('From Location Change: ', fromLocation);

  const { latitude, longitude } = fromLocation.coords;

  console.log('Lat Long ----> ', latitude, longitude);
  
  let origin = { latitude: latitude, longitude: longitude };
  let destination = { latitude: 50.822300, longitude: -0.321530 };
  console.log('[Context API Destination] - ', destination)

  console.log('[Context API Location] - ', fromLocation.coords.latitude);

  return (
    <View style={styles.mapContainer}>
      <View style={styles.mapPlaceholder}></View>
        <Map
        region={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }} 
        style={styles.mapStyle}
        provider={ PROVIDER_GOOGLE }
        customMapStyle={generatedMapStyle}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}> 
        <Map.Marker coordinate={origin} anchor={{x: 0.5, y: 0.5}}>
          <LocationMarker />
        </Map.Marker>
        { userDestination.latitude != undefined && 
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={Config.GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor={Colors.green}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR', errorMessage);
            }}
            >
          </MapViewDirections>
        }
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
    marginTop: 0,
    height: 450,
  },
  mapPlaceholder: {
    flex: 1,
    width: Dimensions.get('window').width,
    marginTop: 350,
    height: 850
  }
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