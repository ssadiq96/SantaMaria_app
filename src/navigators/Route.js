import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform, SafeAreaView, StatusBar, View} from 'react-native';
import SplashScreen from '../screens/SplashScreen';

import {COLORS} from '../common';
import NavigationService from '../utils/NavigationService';
import {hp} from '../utils/constants';
import Toast from 'react-native-toast-message';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerifySignupScreen from '../screens/VerifySignupScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import TabBar from '../screens/TabBar';
import EventDetail from '../screens/EventDetail';
import NewEventScreen from '../screens/NewEventScreen';
import DiscountCompanyPage from '../screens/DiscountCompanyPage';
import DiscountScreen from '../screens/DiscountScreen';
import EmergencyContact from '../screens/EmergencyContact';
import SupplierDetails from '../screens/SupplierDetails';
import SupplierScreen from '../screens/SupplierScreen';

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
      <Stack.Screen name={'TabScreen'} component={TabBar} options={options2} />
      <Stack.Screen
        name={'VerifySignupScreen'}
        component={VerifySignupScreen}
        options={options2}
      />
      <Stack.Screen
        name={'ProfileEditScreen'}
        component={ProfileEditScreen}
        options={options2}
      />
      <Stack.Screen
        name={'NewEventScreen'}
        component={NewEventScreen}
        options={options2}
      />
      <Stack.Screen
        name={'EventDetail'}
        component={EventDetail}
        options={options2}
      />
      <Stack.Screen
        name={'DiscountScreen'}
        component={DiscountScreen}
        options={options2}
      />
      <Stack.Screen
        name={'DiscountCompanyPage'}
        component={DiscountCompanyPage}
        options={options2}
      />
      <Stack.Screen
        name={'EmergencyContact'}
        component={EmergencyContact}
        options={options2}
      />
      <Stack.Screen
        name={'SupplierDetails'}
        component={SupplierDetails}
        options={options2}
      />
      <Stack.Screen
        name={'SupplierScreen'}
        component={SupplierScreen}
        options={options2}
      />
    </Stack.Navigator>
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
        ref={navigator => NavigationService.setTopLevelNavigator(navigator)}>
        <StackNavigator />
        <Toast />
      </NavigationContainer>
    </View>
  );
}
