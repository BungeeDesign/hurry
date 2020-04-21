import React, { useState, useRef, useContext, useEffect } from "react";
import Colors from "../constants/Colors";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Logo from "../components/Layout/Logo";
import Bubble from "../components/Onboarding/Bubble";
import NextButton from "../components/Layout/NextButton";
import Animated, { Easing } from "react-native-reanimated";
import RideContext from  "../context/rideContext";
import { useMemoOne  } from "use-memo-one";

const {
  Value,
  Clock,
  useCode,
  set,
  block,
  and,
  not,
  cond,
  startClock,
  clockRunning,
  stopClock,
  Extrapolate,
  interpolate,
  eq,
  timing
} = Animated;

let deviceWidth = Dimensions.get("window").width;

const runTiming = (clock) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };
  const config = {
    toValue: new Value(1),
    duration: 4500,
    easing: Easing.linear
  };
  return block([
    cond(
      not(clockRunning(clock)),
      set(state.time, 0),
      timing(clock, state, config)
    ),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      // Enable for looping
      set(config.toValue, cond(eq(state.position, 1), 0, 1))
    ]),
    state.position
  ]);
};

const OnboardingScreen = ({navigation}) => {
  useEffect(() => {
    getLocation();
  }, []);

  const { userApps, setLocation } = useContext(RideContext);
  const scrollRef = useRef();

  // Create a vendors object can be later moved to the API to dynamiclly add more
  const vendors = [
    {
      vendorName: 'Arrow',
      pos: [0, 20]
    },
    {
      vendorName: 'Lyft',
      pos: [130, 20]
    },
    {
      vendorName: 'Uber',
      pos: [45, 60]
    },
];

  // Bubble Animation - Using react-native-reanimated due to it running on the UI Thread thus it being more performant (Declarative API), this means declarations will be used e.g. instead of if - cond()
  const delta = 1 / vendors.length;

  // Using useMemo due the context change render which would cause the reanimated animation to replay
  const { clock, isPlaying, progress } = useMemoOne(
    () => ({
      clock: new Clock(),
      isPlaying: new Value(1),
      progress: new Value(0)
    }),
    []
  );

  useCode(
    () =>
      block([
        cond(and(isPlaying, not(clockRunning(clock))), startClock(clock)),
        cond(and(not(isPlaying), clockRunning(clock)), stopClock(clock)),
        set(progress, runTiming(clock))
      ]),
    [clock, isPlaying, progress]
  );
  
  const onNext = () => {
    scrollRef.current.scrollTo({
      animated: true,
      x: deviceWidth,
      y: 0
    });
  };

  const onComplete = () => {
    console.log(userApps);
    if (userApps === undefined || userApps.length == 0) {
      Alert.alert(
        'Select an app',
        'Please select at least 1 app',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    } else {
      scrollRef.current.scrollTo({
        animated: true,
        x: deviceWidth * 2,
        y: 0
      });

      setTimeout(() => {
        navigation.navigate('FindRidesScreen', {name: 'Jane'});
      }, 1000);
    }
  };

  // Get Location
  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      console.log('Permission to location access was denied.');
    }

    console.log('Getting Location....');
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    console.log('Got Location....', location);
    setLocation(location);
  };

  return (
    <View style={styles.container}>
      <Logo />
      <ScrollView
        ref={scrollRef}
        decelerationRate={0.3}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.onboardSection}>
          <View style={styles.sectionContainer}>
            <Text style={styles.bodyText}>
              Please enable location services on your device.
            </Text>
            <View style={styles.sectionActions}>
              <NextButton onPress={onNext} />
            </View>
          </View>
        </View>

        <View style={styles.onboardSection}>
          <View style={{ ...styles.sectionContainer, height: 900 }}>
            <Text style={styles.bodyText}>
              Now select the ride apps that you use.
            </Text>
            <View style={styles.rideAppsContainer}>

              {vendors.map((vendorName, i) => {
              const start = i * delta;
              const end = start + delta;

              const rotate = interpolate(progress, {
                inputRange: [start, end],
                outputRange: [0, 0.2],
                extrapolate: Extrapolate.CLAMP
              });

              const translateX = interpolate(progress, {
                inputRange: [start, end],
                outputRange: [vendorName.pos[0], vendorName.pos[0] + 10],
                extrapolate: Extrapolate.EXTEND
              });

              const translateY = interpolate(progress, {
                inputRange: [start, end],
                outputRange: [vendorName.pos[1], vendorName.pos[1] + 15],
                extrapolate: Extrapolate.CLAMP
              });

              return (
                <Animated.View
                  key={i}
                  style={[styles.animatedBubble, { transform: [{ translateX, translateY, rotate }] }]}
                >
                  <Bubble vendor={vendorName.vendorName} onPress={() => selectVendor(vendorName.vendorName)} />
                </Animated.View>
              );
            })}

            </View>
            <View style={styles.sectionActions}>
              <NextButton onPress={onComplete} />
            </View>
          </View>
        </View>

        <View style={styles.onboardSection}>
          <View style={styles.sectionContainer}>
            <Text style={styles.bodyText}>
              You can now start using Hurry! 🚗
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: Colors.lightBlue
  },
  onboardSection: {
    flex: 1,
    flexDirection: "row",
    width: deviceWidth,
    height: 950,
    justifyContent: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: Colors.darkBlue
  },
  bodyText: {
    fontFamily: "source-sans-pro",
    fontSize: 17,
    color: Colors.green
  },
  sectionContainer: {
    height: 500
  },
  sectionActions: {
    alignItems: "flex-end",
    marginTop: 50
  },
  rideAppsContainer: {},
  animatedBubble: {
    width: 100,
    height: 100,
    opacity: 1
  }
});

export default OnboardingScreen;
