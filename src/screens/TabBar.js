/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React, {useState} from 'react';
import {Animated, View} from 'react-native';
import {DEVICE} from '..//utils/constants';
import OnBackPressed from '../components/OnBackPressed';
import globalStyles from '../res/globalStyles';
import Util from '../utils/utils';
import DiscountScreen from './DiscountScreen';
import EmergencyContact from './EmergencyContact';
import HomeScreen from './HomeScreen';
import NewEventScreen from './NewEventScreen';
import SupplierScreen from './SupplierScreen';

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
  const [, setIsBottomBarVisible] = useState(true);
  const ontabPress = index => {
    props.setTabIndex(index);
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
            <EmergencyContact
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
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default TabBar;
