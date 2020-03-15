import React from 'react';
import Colors from "../../constants/Colors";
import { StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const StarRaiting = ({ raiting }) => {
  return (
    <View style={styles.raitingContainer}>
      {[...Array(raiting)].map((e, i) => {
        return (<AntDesign key={i} name="star" size={15} color={Colors.lightPurple} />);
      })}
      <View style={styles.placeHolderRaitings}>
        <AntDesign name="star" size={15} color={Colors.lightPurple} />
        <AntDesign name="star" size={15} color={Colors.lightPurple} />
        <AntDesign name="star" size={15} color={Colors.lightPurple} />
        <AntDesign name="star" size={15} color={Colors.lightPurple} />
        <AntDesign name="star" size={15} color={Colors.lightPurple} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  raitingContainer: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    marginTop: 35
  },
  placeHolderRaitings: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    opacity: 0.5
  }
});

export default StarRaiting;