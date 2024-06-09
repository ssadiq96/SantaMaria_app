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
const TabBar = props => {
  //#region local state
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const isFocused = useIsFocused();

  const ontabPress = index => {
    props.setTabIndex(index);
  };

  useEffect(() => {
    async function fetchData() {
      if (isFocused) {
        await updateProfile();
      }
    }
    // Call the async function
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  const updateProfile = async () => {
    const response = await Request.get('user');
    if (response.code == 200) {
      props.setuserImage(response.data?.image);
    }
  };

  return (
    <View style={[globalStyles.flex]}>
      <Animated.View style={[moveTabAnimation.getLayout(), globalStyles.flex]}>
        {props.tabIndex !== 0 && (
          <OnBackPressed
            onBackPressed={() => {
              props.setTabIndex(0);
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
          {props.tabIndex === 0 ? (
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
          ) : props.tabIndex === 1 ? (
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
          ) : props.tabIndex === 2 ? (
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
          ) : props.tabIndex === 3 ? (
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
      {/* {isBottomBarVisible && (
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
      )} */}
    </View>
  );
};

export default TabBar;
