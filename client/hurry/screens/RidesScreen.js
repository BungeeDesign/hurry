import React, { useEffect, useState, useContext } from 'react';
import Colors from "../constants/Colors";
import { FlatList, StyleSheet, View, AsyncStorage, Alert } from 'react-native';
import axios from 'axios';
import HeaderText from "../components/Layout/HeaderText";
import Ride from '../components/Rides/Ride';
import RideContext from  "../context/rideContext";
import Loader from '../components/Layout/Loader';

const RidesScreen = ({ navigation })  => {
  const { fromLocation, userDestination } = useContext(RideContext);
  [rides, setRides] = useState([]);

  useEffect(() => {
    (async () => {
      const data = {
        "vendors": await AsyncStorage.getItem('userApps'),
        "ride": {
            "currentLocation": {
                "lat": fromLocation.coords.latitude,
                "long": fromLocation.coords.longitude
            },
            "destinationLocation": {
                "lat": userDestination.latitude,
                "long": userDestination.longitude
            }
        }
      };

      try {
        const config = {
          timeout: 4000
        }
        const res = await axios.post('http://192.168.1.59:1255/api/rides/find', data, config);
        setRides(res.data);
      } catch (error) {
        console.log('[Rides Request Error] -', error);
        Alert.alert(
          'Oops an error has occured',
          'There was an error requesting the rides. Please try again later.',
          [
            {text: 'OK', onPress: () => navigation.navigate('FindRidesScreen')},
          ],
          {cancelable: false},
        );
      }
    })();
  }, [])

  return (
    <View style={styles.container}>
      <HeaderText title='Rides' />
      {rides.length != 0 ? (
        <FlatList style={styles.rides} data={rides} renderItem={({item}) => <Ride rideData={item}/> } keyExtractor={item => item.id.toString()} />
      ) : (
        <Loader />
      )}
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