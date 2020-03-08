import React from 'react';
import Map from 'react-native-maps';
import Colors from "../../constants/Colors";
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const NextButton = ({onPress}) => {
  return (
    <TouchableNativeFeedback style={styles.nativeFeedback} useForeground={true}  background={TouchableNativeFeedback.Ripple(Colors.green, false)} onPress={onPress}>
      <View style={styles.button}>
          <AntDesign name="arrowright" size={25} color='white' />
      </View>
    </TouchableNativeFeedback>
  )
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgBlue
  }
});

export default NextButton;