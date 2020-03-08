import React from 'react';
import Map from 'react-native-maps';
import Colors from "../../constants/Colors";
import { StyleSheet, Image } from 'react-native';
import hurryLogo from '../../assets/images/Logo.png';

const Logo = () => {
  return (
    <Image style={styles.logo} source={hurryLogo} />
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
  logo: {
    width: 200,
    resizeMode: 'contain'
  }
});

export default Logo;