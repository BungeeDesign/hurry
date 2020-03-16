import React from 'react';
import { StyleSheet, Image } from 'react-native';
import hurryLoader from '../../assets/animations/hurry-loader.gif';

const Loader = ({}) => {
  
  return (
    <Image style={styles.loader} source={hurryLoader} />
  )
};

const styles = StyleSheet.create({
  loader: {
    width: 400,
    height: 400
  }
});

export default Loader;