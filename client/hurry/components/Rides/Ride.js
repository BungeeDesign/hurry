import React, { useContext } from "react";
import Colors from "../../constants/Colors";
import StarRaiting from "./StarRaiting";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform
} from "react-native";
import Config from '../../constants/Enviroment';
import axios from 'axios';
import RideContext from  "../../context/rideContext";
import { Linking } from 'expo';

const Ride = ({ rideData }) => {
  const { fromLocation, userDestination } = useContext(RideContext);
  const {
    vendor,
    eta,
    ridePrice,
    car,
    passenger,
    driver,
    raiting,
    fastest
  } = rideData;

  console.log(ridePrice);

  const bookRide = async () => {
    console.log(vendor);
    switch (vendor) {
      case 'Uber':
        console.log('Transfering to Uber App');
        Linking.openURL(`uber://?client_id=${Config.UBER_CLIENT_ID}&action=setPickup&pickup[latitude]=${fromLocation.coords.latitude}&pickup[longitude]=${fromLocation.coords.longitude}&pickup[nickname]=Hurry&dropoff[latitude]=${userDestination.latitude}&dropoff[longitude]=${userDestination.longitude}&dropoff[nickname]=Hurry`)
        break;
    
      default:
        break;
    }
  }

  if (Platform.OS === 'android') {
  return (
    <>
      {fastest && (
        <View style={styles.fastestRideBadge}>
          <Text style={styles.fastestRideText}>Fastest Ride</Text>
        </View>
      )}
      <View style={styles.rideContainer}>
        <View style={styles.headingContainer}>
          <Text style={{ ...styles.rideHeading, color: "white" }}>
            {vendor}
          </Text>
          <Text style={{ ...styles.rideHeading, color: Colors.green }}>
            {eta} Minutes
          </Text>

          <View style={styles.driverProfileContainer}>
            <View style={styles.driverProfile}>
              <Text style={{ ...styles.detailsText, marginTop: 10 }}>
                {driver}
              </Text>
              <StarRaiting raiting={raiting} />
            </View>
            <Image
              style={styles.driverProfileImage}
              source={{
                uri:
                  "https://pbs.twimg.com/profile_images/969073897189523456/rSuiu_Hr.jpg"
              }}
            />
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>{car}</Text>
          <View style={styles.hairLine} />
        </View>
        <View style={styles.rideInfo}>
          <Text style={{ ...styles.detailsText, marginRight: 20 }}>
            £{ridePrice}
          </Text>
          <Text style={styles.detailsText}>{passenger} Passengers</Text>
        </View>
      </View>
      <TouchableNativeFeedback
        style={styles.bookBtnContainer}
        background={TouchableNativeFeedback.Ripple(
          fastest ? Colors.bgBlue : Colors.green,
          false
        )}
        onPress={bookRide}>
        <View style={fastest ? styles.bookBtnFastest : styles.bookBtn}>
          <Text
            style={
              (styles.btnText, { color: fastest ? Colors.bgBlue : "white" })
            }
          >
            Book
          </Text>
        </View>
      </TouchableNativeFeedback>
    </>
  );
  } else {
    return (
      <>
        {fastest && (
          <View style={styles.fastestRideBadge}>
            <Text style={styles.fastestRideText}>Fastest Ride</Text>
          </View>
        )}
        <View style={styles.rideContainer}>
          <View style={styles.headingContainer}>
            <Text style={{ ...styles.rideHeading, color: "white" }}>
              {vendor}
            </Text>
            <Text style={{ ...styles.rideHeading, color: Colors.green }}>
              {eta} Minutes
            </Text>
  
            <View style={styles.driverProfileContainer}>
              <View style={styles.driverProfile}>
                <Text style={{ ...styles.detailsText, marginTop: 10 }}>
                  {driver}
                </Text>
                <StarRaiting raiting={raiting} />
              </View>
              <Image
                style={styles.driverProfileImage}
                source={{
                  uri:
                    "https://pbs.twimg.com/profile_images/969073897189523456/rSuiu_Hr.jpg"
                }}
              />
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>{car}</Text>
            <View style={styles.hairLine} />
          </View>
          <View style={styles.rideInfo}>
            <Text style={{ ...styles.detailsText, marginRight: 20 }}>
              £{ridePrice}
            </Text>
            <Text style={styles.detailsText}>{passenger} Passengers</Text>
          </View>
        </View>
        <TouchableHighlight
          style={styles.bookBtnContainer}
          background={TouchableNativeFeedback.Ripple(
            fastest ? Colors.bgBlue : Colors.green,
            false
          )}
          onPress={bookRide}>
          <View style={fastest ? styles.bookBtnFastest : styles.bookBtn}>
            <Text
              style={
                (styles.btnText, { color: fastest ? Colors.bgBlue : "white" })
              }
            >
              Book
            </Text>
          </View>
        </TouchableHighlight>
      </>
    );
  }
};

const styles = StyleSheet.create({
  rideContainer: {
    backgroundColor: Colors.darkBlue,
    width: "100%",
    height: 130,
    marginTop: 20,
    padding: 10,
    elevation: 5
  },
  headingContainer: {
    flex: 4,
    flexDirection: "row",
    marginTop: 5
  },
  rideHeading: {
    fontFamily: "source-sans-pro",
    fontSize: 25,
    marginRight: 10,
    textTransform: "uppercase"
  },
  detailsContainer: {
    flex: 4
  },
  detailsText: {
    fontFamily: "source-sans-pro",
    fontSize: 15,
    color: "white"
  },
  hairLine: {
    borderBottomColor: Colors.bgBlue,
    borderBottomWidth: 1,
    marginTop: 3
  },
  rideInfo: {
    flex: 3,
    flexDirection: "row"
  },
  driverProfileContainer: {
    flex: 1
  },
  driverProfile: {
    flex: 1,
    marginLeft: 50
  },
  driverProfileImage: {
    alignSelf: "flex-end",
    width: 50,
    height: 50,
    borderRadius: 100
  },
  bookBtn: {
    flex: 4,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    backgroundColor: Colors.bgBlue,
    elevation: 5
  },
  bookBtnFastest: {
    flex: 4,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    backgroundColor: Colors.green,
    elevation: 5
  },
  btnText: {
    fontFamily: "source-sans-pro",
    fontSize: 18,
    color: "white"
  },
  fastestRideBadge: {
    width: 100,
    height: 25,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    top: 30,
    elevation: 6,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: Colors.lightPurple
  },
  fastestRideText: {
    fontFamily: "source-sans-pro",
    fontSize: 14,
    color: "white",
    alignSelf: "center"
  }
});

export default Ride;
