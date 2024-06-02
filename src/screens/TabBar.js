import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import globalStyles from '../res/globalStyles';
import {hp, wp, DEVICE} from '..//utils/constants';
import Util from '../utils/utils';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {COLORS, CONSTANTS} from '../common';
import {IMAGES} from '../assets';
import OnBackPressed from '../components/OnBackPressed';
import HomeScreen from './HomeScreen';
import NewEventScreen from './NewEventScreen';
import DiscountScreen from './DiscountScreen';
import SupplierScreen from './SupplierScreen';
import ProfileEditScreen from './ProfileEditScreen';
import ProfileScreen from './ProfileScreen';
import {BlurView} from '@react-native-community/blur';
import {scale} from '../common/Scale';
import StorageService from '../utils/StorageService';
import {useIsFocused} from '@react-navigation/native';
import Request from '../api/Request';

const moveTabAnimation = new Animated.ValueXY({
  x: 0,
  y: 0,
});
const moveMenuBarAnimation = new Animated.ValueXY({x: 0, y: 0});

const moveHomeAnimation = new Animated.ValueXY({x: 0, y: 0});
const movePopularAnimation = new Animated.ValueXY({
  x: DEVICE.DEVICE_WIDTH,
  y: 0,
});
export default TabBar = props => {
  //#region local state
  const [tabIndex, setTabIndex] = useState(0);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const isFocused = useIsFocused();

  const ontabPress = index => {
    setTabIndex(index);
  };
  const [tabArray, settabArray] = useState([
    'Home',
    'NewsEvent',
    'Discount',
    'Supplier',
    'ProfileEdit',
  ]);
  const [userImage, setuserImage] = useState('');
  useEffect(() => {
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
    <View style={[globalStyles.flex]}>
      <Animated.View style={[moveTabAnimation.getLayout(), globalStyles.flex]}>
        {tabIndex !== 0 && (
          <OnBackPressed
            onBackPressed={() => {
              setTabIndex(0);
              Util.slideLeftAnim(moveHomeAnimation, 0, 'newTabs');
              Util.slideLeftAnim(
                movePopularAnimation,
                DEVICE.DEVICE_WIDTH,
                'newTabs',
              );
            }}
          />
        )}
        <View
          style={[
            globalStyles.subContainer,
            {height: DEVICE.DEVICE_HEIGHT, flex: 0},
          ]}>
          {tabIndex === 0 ? (
            <HomeScreen
              props={props}
              moveHomeAnimation={moveHomeAnimation}
              movePopularAnimation={movePopularAnimation}
              moveTabAnimation={moveTabAnimation}
              moveMenuBarAnimation={moveMenuBarAnimation}
              ontabPress={ontabPress}
              onhideBottomBar={value => {
                if (value == 0) {
                  setIsBottomBarVisible(false);
                } else {
                  setIsBottomBarVisible(true);
                }
              }}
              onBottomBarAnim={value => {
                value === 0 && setIsBottomBarVisible(true);
                Util.slideLeftAnim(moveMenuBarAnimation, value, 'y');
                value !== 0 &&
                  setTimeout(() => {
                    setIsBottomBarVisible(false);
                  }, 300);
              }}
            />
          ) : tabIndex === 1 ? (
            <NewEventScreen
              props={props}
              moveHomeAnimation={moveHomeAnimation}
              movePopularAnimation={movePopularAnimation}
              moveTabAnimation={moveTabAnimation}
              moveMenuBarAnimation={moveMenuBarAnimation}
              onhideBottomBar={value => {
                if (value == 0) {
                  setIsBottomBarVisible(false);
                } else {
                  setIsBottomBarVisible(true);
                }
              }}
              onBottomBarAnim={value => {
                value === 0 && setIsBottomBarVisible(true);
                Util.slideLeftAnim(moveMenuBarAnimation, value, 'y');
                value !== 0 &&
                  setTimeout(() => {
                    setIsBottomBarVisible(false);
                  }, 100);
              }}
            />
          ) : tabIndex === 2 ? (
            <DiscountScreen
              props={props}
              moveHomeAnimation={moveHomeAnimation}
              movePopularAnimation={movePopularAnimation}
              moveTabAnimation={moveTabAnimation}
              moveMenuBarAnimation={moveMenuBarAnimation}
              onhideBottomBar={value => {
                if (value == 0) {
                  setIsBottomBarVisible(false);
                } else {
                  setIsBottomBarVisible(true);
                }
              }}
              onBottomBarAnim={value => {
                value === 0 && setIsBottomBarVisible(true);
                Util.slideLeftAnim(moveMenuBarAnimation, value, 'y');
                value !== 0 &&
                  setTimeout(() => {
                    setIsBottomBarVisible(false);
                  }, 100);
              }}
            />
          ) : tabIndex === 3 ? (
            <SupplierScreen
              props={props}
              moveHomeAnimation={moveHomeAnimation}
              movePopularAnimation={movePopularAnimation}
              moveTabAnimation={moveTabAnimation}
              moveMenuBarAnimation={moveMenuBarAnimation}
              onhideBottomBar={value => {
                if (value == 0) {
                  setIsBottomBarVisible(false);
                } else {
                  setIsBottomBarVisible(true);
                }
              }}
              onBottomBarAnim={value => {
                value === 0 && setIsBottomBarVisible(true);
                Util.slideLeftAnim(moveMenuBarAnimation, value, 'y');
                value !== 0 &&
                  setTimeout(() => {
                    setIsBottomBarVisible(false);
                  }, 100);
              }}
            />
          ) : (
            <ProfileScreen props={props} updateprofile={updateProfile} />
          )}
        </View>
      </Animated.View>
      {isBottomBarVisible && (
        <View
          style={[styles.tabBarContainer, moveMenuBarAnimation.getLayout()]}>
          {tabArray.map((data, index) => {
            return (
              <TouchableOpacity
                style={styles.tabIcon}
                onPress={() => {
                  Util.onHapticFeedback();
                  setTabIndex(index);
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
                      height: wp('8%'),
                      width: wp('8%'),
                      borderRadius: wp('4%'),
                      marginTop: wp(3),
                      // borderWidth:StyleSheet.hairlineWidth
                    },
                  ]}
                  source={
                    index === 0
                      ? IMAGES.home
                      : index === 1
                      ? IMAGES.newsevent
                      : index === 2
                      ? IMAGES.discount
                      : index == 3
                      ? IMAGES.supplier
                      : userImage
                      ? {uri: userImage}
                      : IMAGES.placeholder
                  }
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
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
