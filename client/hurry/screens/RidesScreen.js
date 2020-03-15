import React from 'react';
import Colors from "../constants/Colors";
import { FlatList, StyleSheet, View } from 'react-native';
import HeaderText from "../components/Layout/HeaderText";
import Ride from '../components/Rides/Ride';

const RidesScreen = ()  => {
  const tempRideData = [
    {
      id: 0,
      vendor: 'Uber',
      eta: '8',
      price: '£15.00',
      car: 'Tesla Model S',
      passenger: 4,
      driver: 'Ranjit',
      raiting: 3,
      fastest: true
    },
    {
      id: 1,
      vendor: 'Uber',
      eta: '8',
      price: '£15.00',
      car: 'Tesla Model S',
      passenger: 4,
      driver: 'Ranjit',
      raiting: 1,
      fastest: false
    },
    {
      id: 2,
      vendor: 'Uber',
      eta: '8',
      price: '£15.00',
      car: 'Tesla Model S',
      passenger: 4,
      driver: 'Ranjit',
      raiting: 3,
      fastest: false
    },
    {
      id: 3,
      vendor: 'Uber',
      eta: '8',
      price: '£15.00',
      car: 'Tesla Model S',
      passenger: 4,
      driver: 'Ranjit',
      raiting: 3,
      fastest: false
    },
    {
      id: 4,
      vendor: 'Uber',
      eta: '8',
      price: '£15.00',
      car: 'Tesla Model S',
      passenger: 4,
      driver: 'Ranjit',
      raiting: 3,
      fastest: false
    },
    {
      id: 5,
      vendor: 'Uber',
      eta: '8',
      price: '£15.00',
      car: 'Tesla Model S',
      passenger: 4,
      driver: 'Ranjit',
      raiting: 3,
      fastest: false
    },
  ];

  return (
    <View style={styles.container}>
      <HeaderText title='Rides' />
      <FlatList style={styles.rides} data={tempRideData} renderItem={({item}) => <Ride rideData={item}/> } keyExtractor={item => item.id.toString()} />
    </View>
  );
}

RidesScreen.navigationOptions = {
  title: 'Rides',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'absolute',
    width: '100%',
    // height: '100%',
    alignContent: "center",
    alignItems: "center",
    textAlign: 'center',
    backgroundColor: Colors.lightBlue
  },
  rides: {
    width: '100%',
    // flex: 1
  }
});

export default RidesScreen;