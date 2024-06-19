/* eslint-disable eqeqeq */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {IMAGES} from '../assets';
import {COLORS} from '../common';
import {scale} from '../common/Scale';
import globalStyles from '../res/globalStyles';
import DiscountCompanyPage from '../screens/DiscountCompanyPage';
import DiscountScreen from '../screens/DiscountScreen';
import EmergencyContact from '../screens/EmergencyContact';
import EventDetail from '../screens/EventDetail';
import NewEventScreen from '../screens/NewEventScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import SupplierDetails from '../screens/SupplierDetails';
import SupplierScreen from '../screens/SupplierScreen';
import TabBar from '../screens/TabBar';
import NavigationService from '../utils/NavigationService';
import {DEVICE, hp, wp} from '../utils/constants';
import {isIphoneX} from '../utils/iPhoneXHelper';
import Util from '../utils/utils';
import ProfileScreen from '../screens/ProfileScreen';
import {useIsFocused} from '@react-navigation/native';
import Request from '../api/Request';

const Stack = createNativeStackNavigator();
const options2 = {
  // headerShown: false,
  gestureEnabled: false,
  animationEnabled: false,
};
/**
 * Stack navigation screens
 */
const moveMenuBarAnimation = new Animated.ValueXY({x: 0, y: 0});

const MainScreenRoutes = () => {
  const [tabArray] = React.useState([
    'Home',
    'NewsEvent',
    'Discount',
    'Supplier',
    'EmergencyContact',
  ]);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [userImage, setuserImage] = React.useState('');
  // eslint-disable-next-line react/no-unstable-nested-components
  const TabScreens = () => {
    return (
      <TabBar
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        setuserImage={setuserImage}
      />
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Profile = () => {
    return <ProfileScreen updateprofile={updateProfile} />;
  };

  const isFocused = useIsFocused();
  React.useEffect(() => {
    async function fetchData() {
      if (isFocused) {
        await updateProfile();
      }
    }
    // Call the async function
    fetchData();
  }, [isFocused]);
  const updateProfile = async () => {
    const response = await Request.get('user');
    if (response.code == 200) {
      setuserImage(response.data?.image);
    }
  };

  return (
    <>
      <Stack.Navigator
        initialRouteName="TabScreen"
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
          name={'TabScreen'}
          component={TabScreens}
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
        <Stack.Screen
          name={'ProfileScreen'}
          component={Profile}
          options={options2}
        />
      </Stack.Navigator>
      <View style={[styles.tabBarContainer, moveMenuBarAnimation.getLayout()]}>
        {tabArray.map((data, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.tabIcon}
              onPress={() => {
                Util.onHapticFeedback();
                setTabIndex(index);
                NavigationService.navigate('TabScreen');
              }}>
              <Image
                style={[
                  globalStyles.img,
                  {
                    height: wp('7%'),
                    width: wp('7%'),
                  },
                  index === 0 && {
                    height: wp('7%'),
                    width: wp('7%'),
                    marginTop: wp(3),
                    tintColor:
                      tabIndex == index ? COLORS.yellow : COLORS.textColor,
                  },
                  index === 1 && {
                    height: wp('7%'),
                    width: wp('7%'),
                    marginTop: wp(3),
                    tintColor:
                      tabIndex == index ? COLORS.yellow : COLORS.textColor,
                  },
                  index === 2 && {
                    height: wp('7%'),
                    width: wp('7%'),
                    marginTop: wp(3),
                    tintColor:
                      tabIndex == index ? COLORS.yellow : COLORS.textColor,
                  },
                  index === 3 && {
                    height: wp('7%'),
                    width: wp('7%'),
                    marginTop: wp(3),
                    tintColor:
                      tabIndex == index ? COLORS.yellow : COLORS.textColor,
                  },
                  index === 4 && {
                    height: wp('7%'),
                    width: wp('7%'),
                    marginTop: wp(3),
                    tintColor:
                      tabIndex == index ? COLORS.yellow : COLORS.textColor,
                  },
                ]}
                source={
                  index === 0
                    ? IMAGES.home
                    : index === 1
                    ? IMAGES.newsevent
                    : index === 2
                    ? IMAGES.discount
                    : index === 3
                    ? IMAGES.supplier
                    : IMAGES.emergencyContactIcon
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

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

export default MainScreenRoutes;
