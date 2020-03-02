import React, { useContext, useState } from 'react';
import Colors from "../../constants/Colors";
import { StyleSheet, View, Text, TextInput, TouchableNativeFeedback } from 'react-native';
import RideContext from  "../../context/rideContext";

const Ride = ({ rideData }) => {
  const { car, driver, eta, passenger, price, raiting, vendor } = rideData[0];

  return (
    <View style={styles.rideContainer}>
      <View style={styles.headingContainer}>
        <Text style={{...styles.rideHeading, color: 'white' }}>{vendor}</Text>
        <Text style={{...styles.rideHeading, color: Colors.green }}>{eta} Minutes</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>{car}</Text>
        <View style={styles.hairLine} />
      </View>
      <View style={styles.rideInfo}>
        <Text style={{...styles.detailsText, marginRight: 20}}>{price}</Text>
        <Text style={styles.detailsText}>{passenger} Passengers</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  rideContainer: {
    backgroundColor: Colors.darkBlue,
    width: '100%',
    height: 100,
    marginBottom: 100,
    padding: 10
  },
  headingContainer: {
    flex: 4,
    flexDirection: 'row'
  }, 
  rideHeading: {
    fontFamily: 'source-sans-pro',
    fontSize: 25,
    marginRight: 10,
    textTransform: 'uppercase'
  },
  detailsContainer: {
    flex: 4
  },  
  detailsText: {
    fontFamily: 'source-sans-pro',
    fontSize: 15,
    color: 'white'
  },
  hairLine: {
    borderBottomColor: Colors.bgBlue,
    borderBottomWidth: 1,
    marginTop: 3
  },
  rideInfo: {
    flex: 3,
    flexDirection: 'row'
  }
});

export default Ride;
