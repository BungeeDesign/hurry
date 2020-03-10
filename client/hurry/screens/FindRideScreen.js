import React, { Fragment, useEffect, useState, useContext } from "react";
import { Platform, StyleSheet, View, Image, Text, Dimensions } from "react-native";
import MapView from '../components/Map/MapView';
import RideSearch from '../components/RideSearch';
import Colors from "../constants/Colors";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import RideContext from  "../context/rideContext";
import hurryLoader from '../assets/animations/hurry-loader.gif';

const FindRideScreen = (props) => {
  const { navigation } = props;
  // State
  const [userLocation, setUserLocation] = useState(null);
  const { fromLocation } = useContext(RideContext);

  useEffect(() => {
    console.log('Find Ride', userLocation);
    console.log(fromLocation);
    getLocation();
  }, []);

  // Get Location
  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      console.log('Permission to location access was denied.');
    }

    console.log('Getting Location....');
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    console.log('Got Location....');
    setUserLocation(location);
  }

  return (
    <View style={styles.container}>
      <RideSearch navigation={navigation} />
      { userLocation != null ? (
        <MapView location={userLocation}/>
          ) : (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingView}>
              <Image style={styles.loader} source={hurryLoader} />
            </View>
          </View>
      )}
    </View>
  );
};

// Hididng the react-navigation header
FindRideScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    textAlign: 'center',
    backgroundColor: Colors.lightBlue
  },
  title: {
    color: 'white'
  },
  loader: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 150
  },
  loadingContainer: {
    flex: 1
  },
  loadingView: {
    justifyContent: 'center',
    height: 800,
    width: Dimensions.get('window').width,
    backgroundColor: Colors.bgBlue
  }
});

export default FindRideScreen;