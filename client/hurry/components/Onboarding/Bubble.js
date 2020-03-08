import React from 'react';
import Map from 'react-native-maps';
import Colors from "../../constants/Colors";
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Bubble = ({onPress, vendor}) => {

  return (
    <TouchableNativeFeedback style={styles.nativeFeedback} useForeground={true}  background={TouchableNativeFeedback.Ripple(Colors.bgBlue, false)} onPress={onPress}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{vendor}</Text>
      </View>
    </TouchableNativeFeedback>
  )
};

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green
  },
  circleText: {
    fontFamily: "source-sans-pro",
    fontSize: 25,
    color: Colors.darkBlue
  }
});

export default Bubble;