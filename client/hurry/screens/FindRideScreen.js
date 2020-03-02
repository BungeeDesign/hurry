import React, { Fragment, useEffect, useState, useContext } from "react";
import { Platform, StyleSheet, View, Image, Text } from "react-native";
import MapView from '../components/Map/MapView';
import RideSearch from '../components/RideSearch';
import Colors from "../constants/Colors";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import RideContext from  "../context/rideContext";

const FindRideScreen = (props) => {
  const { navigation } = props;
  // State
  const [userLocation, setUserLocation] = useState(null);
  const { fromLocation } = useContext(RideContext);

  useEffect(() => {
    console.log('Find Ride');
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
        <Text>Loading...</Text>
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
    position: 'absolute',
    alignContent: "center",
    alignItems: "center",
    textAlign: 'center',
    backgroundColor: Colors.lightBlue
  },
  title: {
    color: 'white'
  }
});

export default FindRideScreen;