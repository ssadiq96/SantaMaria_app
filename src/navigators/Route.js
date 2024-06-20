/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Animated, StatusBar, StyleSheet, View} from 'react-native';
import SplashScreen from '../screens/SplashScreen';

import Toast from 'react-native-toast-message';
import {COLORS} from '../common';
import {scale} from '../common/Scale';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabBar from '../screens/TabBar';
import VerifySignupScreen from '../screens/VerifySignupScreen';
import NavigationService from '../utils/NavigationService';
import {DEVICE, hp, wp} from '../utils/constants';
import {isIphoneX} from '../utils/iPhoneXHelper';
import MainScreenRoutes from './MainScreen';

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

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingRight: wp(2),
  },
  absolute: {
    width: DEVICE.DEVICE_WIDTH,
    paddingTop: hp('1%'),
    paddingBottom: isIphoneX() ? hp('2.6%') : hp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tabBarContainer: {
    width: DEVICE.DEVICE_WIDTH,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: hp('1%'),
    paddingBottom: isIphoneX() ? hp('2.6%') : hp('1.5%'),
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white to mimic blur
  },

  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(2),
    marginBottom: wp(5),
    marginHorizontal: scale(16),
  },
  tabText: {
    fontSize: wp('3.2%'),
    lineHeight: wp(5),
    color: COLORS.white,
    textAlign: 'center',
  },
});
