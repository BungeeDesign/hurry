import React from 'react';
import Map from 'react-native-maps';
import Colors from "../../constants/Colors";
import { StyleSheet, View, Text } from 'react-native';

const HeaderText = ({ title }) => {
  
  return (
    <Text style={styles.text}>{title}</Text>
  )
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    marginTop: 35,
    fontFamily: 'montserrat-semi-bold',
    textAlign: 'center',
    fontSize: 22,
    color: Colors.green
  },
});

export default HeaderText;