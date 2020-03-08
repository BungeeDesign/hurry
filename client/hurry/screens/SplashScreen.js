import React, { useRef, useEffect, useState } from 'react';
import Colors from "../constants/Colors";
import { StyleSheet, View, Image } from 'react-native';
import { Asset } from 'expo-asset';
import { AppLoading, SplashScreen } from 'expo';
import hurryLoader from '../assets/animations/hurry-loader.gif';

const Splash = ({ navigation }) => {
    const [isReady, setReady] = useState(false);

    const  _cacheResourcesAsync = async () => {
      const images = [require('../assets/images/gradient.png')];

      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      }); 
      return Promise.all(cacheImages);
    };

    const ready = () => {
      setReady(true);

      // Loaded Hide Splash
      setTimeout(() => {
        navigation.navigate('FindRidesScreen', {name: 'Jane'});
      }, 1200);
    };

    return (
      isReady === false ? ( <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={ready}
        onError={console.warn}
      />) : (
        <View style={styles.container}>
          <Image style={styles.loader} source={hurryLoader} />
        </View>
      )
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightBlue
  },
  loader: {
    width: 400,
    height: 400
  }
});

export default Splash;