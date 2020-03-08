import React, { useRef } from "react";
import Colors from "../constants/Colors";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions
} from "react-native";
import Logo from "../components/Layout/Logo";
import Bubble from "../components/Onboarding/Bubble";
import NextButton from "../components/Layout/NextButton";
import Animated, { Easing } from "react-native-reanimated";

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
  add,
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
    duration: 1500,
    easing: Easing.bounce
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
      // set(config.toValue, cond(eq(state.position, 1), 0, 1))
    ]),
    state.position
  ]);
};

const OnboardingScreen = () => {
  const scrollRef = useRef();

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

  // Bubble Animation
  // Using react-native-reanimated due to it running on the UI Thread thus it being more performant (Declarative API), this means declarations will be used e.g. instead of if - cond()
  const progress = new Value(0);
  const delta = 1 / vendors.length;
  const clock = new Clock();
  const isPlaying = 1;

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

  const selectVendor = (vendor) => {
    console.log("Selected Vendor", vendor);
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

              const opacity = interpolate(progress, {
                inputRange: [start, end],
                outputRange: [0, 1],
                extrapolate: Extrapolate.CLAMP
              });

              const scale = interpolate(progress, {
                inputRange: [start, end],
                outputRange: [0, 1],
                extrapolate: Extrapolate.CLAMP
              });

              return (
                <Animated.View
                  key={i}
                  style={[styles.animatedBubble, { opacity, transform: [{ scale, translateX: vendorName.pos[0], translateY: vendorName.pos[1] }] }]}
                >
                  <Bubble vendor={vendorName.vendorName} onPress={() => selectVendor(vendorName.vendorName)} />
                </Animated.View>
              );
            })}

            </View>
            <View style={styles.sectionActions}>
              <NextButton onPress={onNext} />
            </View>
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
    height: 100
  }
});

export default OnboardingScreen;
