import React from 'react';
import Colors from "../constants/Colors";
import { ScrollView, StyleSheet, View } from 'react-native';
import HeaderText from "../components/Layout/HeaderText";
import Ride from '../components/Rides/Ride';

export default function RidesScreen() {

  const tempRideData = [
    {
      vendor: 'Uber',
      eta: '8',
      price: '£15.00',
      car: 'Tesla Model S',
      passenger: 4,
      driver: 'Ranjit',
      raiting: 3
    }
  ];

  return (
    <View style={styles.container}>
      <HeaderText title='Rides' />
      <Ride rideData={tempRideData}/>
    </View>
  );
}

RidesScreen.navigationOptions = {
  title: 'Rides',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    textAlign: 'center',
    backgroundColor: Colors.lightBlue
  },
});
