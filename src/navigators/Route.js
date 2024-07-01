/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from '../screens/SplashScreen';

import Toast from 'react-native-toast-message';
import {COLORS} from '../common';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerifySignupScreen from '../screens/VerifySignupScreen';
import NavigationService from '../utils/NavigationService';
import MainScreenRoutes from './MainScreen';
import VerifyOTPScreen from '../screens/VerifyOTPScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';

const Stack = createNativeStackNavigator();
const options2 = {
  // headerShown: false,
  gestureEnabled: false,
  animationEnabled: false,
};
/**
 * Stack navigation screens
 */

const StackNavigator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={({navigation}) => ({
          cardStyleInterpolator: ({
            current,
            next,
            inverted,
            layouts: {screen},
          }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screen.width, 0],
                  }),
                },
              ],
            },
          }),
          headerShown: false,
          animation: 'none',
          detachPreviousScreen: !navigation.isFocused(), // For disabling white flickering issue during transition.
        })}>
        <Stack.Screen
          name={'SplashScreen'}
          component={SplashScreen}
          options={options2}
        />
        <Stack.Screen
          name={'LoginScreen'}
          component={LoginScreen}
          options={options2}
        />
        <Stack.Screen
          name={'ForgotPasswordScreen'}
          component={ForgotPasswordScreen}
          options={options2}
        />

        <Stack.Screen
          name={'NewPasswordScreen'}
          component={NewPasswordScreen}
          options={options2}
        />
        <Stack.Screen
          name={'VerifyOTPScreen'}
          component={VerifyOTPScreen}
          options={options2}
        />
        <Stack.Screen
          name={'SignUpScreen'}
          component={SignUpScreen}
          options={options2}
        />
        <Stack.Screen
          name={'VerifySignupScreen'}
          component={VerifySignupScreen}
          options={options2}
        />
        <Stack.Screen
          name={'MainScreen'}
          component={MainScreenRoutes}
          options={options2}
        />
      </Stack.Navigator>
    </>
  );
};

/**
 * Navigation of all screens
 */

export default function Route({route, navigate}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.light_charcoal}
      />
      <NavigationContainer
        independent={true}
        ref={navigator => {
          return NavigationService.setTopLevelNavigator(navigator);
        }}>
        <StackNavigator />
        <Toast />
      </NavigationContainer>
    </View>
  );
}
