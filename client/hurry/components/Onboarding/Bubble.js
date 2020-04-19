import React, { useState, useContext } from 'react';
import Colors from "../../constants/Colors";
import { StyleSheet, View, Text, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import RideContext from  "../../context/rideContext";

let apps = [];

const Bubble = ({vendor, onPress}) => {
  const [isVendorSelected, setisVendorSelected] = useState(false);
  const { saveUserApps } = useContext(RideContext);

  const handleSelect = async () => {
    apps.push(vendor);
    if (isVendorSelected) {
      // Remove app if the user unselects
      apps = apps.filter(e => e !== vendor);
    }

    // Call saveUserApps from context
    saveUserApps(apps);

    // Set the pressed bubble to its selected state
    setisVendorSelected(!isVendorSelected);
  };

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback style={styles.nativeFeedback} useForeground={true}  background={TouchableNativeFeedback.Ripple(Colors.bgBlue, false)} onPress={onPress, handleSelect}>
        <View style={{...styles.circle, backgroundColor: isVendorSelected ? Colors.green : Colors.bgBlue}}>
          <Text style={styles.circleText}>{vendor}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  } else {
    return (
      <TouchableOpacity style={styles.nativeFeedback} onPress={onPress, handleSelect}>
        <View style={{...styles.circle, backgroundColor: isVendorSelected ? Colors.green : Colors.bgBlue}}>
          <Text style={styles.circleText}>{vendor}</Text>
        </View>
      </TouchableOpacity>
    )
  }
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
    backgroundColor: Colors.bgBlue
  },
  circleText: {
    fontFamily: "source-sans-pro",
    fontSize: 25,
    color: Colors.darkBlue
  }
});

export default Bubble;