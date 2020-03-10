import React, { useContext, useState } from 'react';
import Colors from "../constants/Colors";
import HeaderText from "../components/Layout/HeaderText";
import { StyleSheet, View, Text, TextInput, TouchableNativeFeedback } from 'react-native';
import RideContext from  "../context/rideContext";

const RideSearch = ({ navigation }) => {
  const { getLocation, getDestination, fromLocation, userDestination } = useContext(RideContext);
  const [userFromLocation, setUserFromLocation] = useState();
  const [userEnteredDestination, setUserDestination] = useState();

  const getEnteredUserLocation = () => {
    getLocation(userFromLocation);
    console.log('FROM LOCATION: ', fromLocation);
  };

  const setEnteredUserDestination = () => {
    getDestination(userEnteredDestination);
    console.log('DESTINATION: ', userDestination);
  };

  const findRide = () => {
    // Switch to RidesScreen and start request for ride search
    navigation.navigate('RidesScreen', {name: 'Jane'});
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <HeaderText title='Find a ride' />
        <TextInput style={styles.pickupInput} placeholder='Current Location' placeholderTextColor={Colors.green} onChangeText={(text) => setUserFromLocation(text)} onSubmitEditing={getEnteredUserLocation} onEndEditing={getEnteredUserLocation}/>
        <TextInput style={styles.dropOffInput} placeholder='Destination' placeholderTextColor={Colors.green} onChangeText={(text) => setUserDestination(text)} onSubmitEditing={setEnteredUserDestination}/>
        <TouchableNativeFeedback style={styles.searchBtnContainer} background={TouchableNativeFeedback.Ripple(Colors.green, false)} onPress={findRide}>
          <View style={styles.searchBtn}>
            <Text style={styles.btnText}>Find</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    width: "100%",
    height: 300,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    position: "absolute",
    backgroundColor: Colors.bgBlue,
    opacity: 1,
    zIndex: 2
  },
  searchBackground: {
    flex: 1,
    width: "100%",
    height: 300,
    position: "absolute",
    opacity: 0,
    backgroundColor: Colors.darkBlue,
    zIndex: 1
  },
  pickupInput: {
    height: 60,
    width: 350,
    marginBottom: 150,
    alignSelf: 'center',
    borderRadius: 5,
    paddingLeft: 10,
    fontFamily: 'source-sans-pro',
    fontSize: 18,
    color: Colors.green,
    backgroundColor: Colors.darkBlue,
    elevation: 6
  },
  dropOffInput: {
    height: 60,
    width: 350,
    position: 'absolute',
    marginTop: 160,
    alignSelf: 'center',
    borderRadius: 5,
    paddingLeft: 10,
    fontFamily: 'source-sans-pro',
    fontSize: 18,
    color: Colors.green,
    backgroundColor: Colors.darkBlue,
    elevation: 6
  },
  searchBtn: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 350,
    height: 50,
    backgroundColor: Colors.bgBlue,
    elevation: 25,
    marginTop: 240
  },
  btnText: {
    alignSelf: 'center',
    fontFamily: 'source-sans-pro',
    fontSize: 18,
    color: Colors.green,
  },
  searchBtnContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 260
  }
});

export default RideSearch;