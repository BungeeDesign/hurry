import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import FindRidesScreen from '../screens/FindRideScreen';
import RidesScreen from '../screens/RidesScreen';

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='OnboardingScreen' headerMode='none'>
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />
        <Stack.Screen name='FindRidesScreen' component={FindRidesScreen} />
        <Stack.Screen name='RidesScreen' component={RidesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator;
