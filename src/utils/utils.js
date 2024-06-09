import {Component} from 'react';
import {Dimensions, Platform, Animated, Easing, Share} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export default class Util extends Component {
  static isScrollToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  static onHapticFeedback = () => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true,
    };
    Platform.OS === 'ios'
      ? ReactNativeHapticFeedback.trigger('impactHeavy', options)
      : ReactNativeHapticFeedback.trigger('impactLight', options);
  };

  static onAgeCalculation = selectedDate => {
    var today = new Date();
    var birthDate = new Date(selectedDate);
    var ageNow = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      ageNow--;
    }
    return ageNow;
  };
  static slideAnimation = (moveAnimation, xValue, axis, type, callBack) => {
    axis === 'track'
      ? Animated.spring(moveAnimation, {
          toValue: xValue,
          duration: 300,
          friction: 7,
          useNativeDriver: true,
          // easing: Easing.bounce,
        }).start(() => callBack !== undefined && callBack())
      : Animated.timing(moveAnimation, {
          toValue: xValue,
          duration:
            type === 'toolBar'
              ? 250
              : axis === 'newTabs'
              ? 350
              : type === 'hideOption'
              ? 500
              : 300,
          useNativeDriver: true,
        }).start(() => callBack !== undefined && callBack());
  };
  static onShare = async () => {
    try {
      const result = await Share.share({
        // message: `Hey I thought you might like this app, it teaches piano through a new method, without sheet music !\n\nLINK : ${DEVICE_OS === 'ios' ? 'https://apps.apple.com/us/app/pianohack-skip-sheet-music/id1595060274' : 'https://play.google.com/store/apps/details?id=com.pianohack.android'}`,
        message: `Hey I thought you might like this app, it teaches piano through a new method, without sheet music !\n\nLINK : https://onelink.to/gmxkve`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  static slideLeftAnim = (moveAnimation, xValue, axis, type, callBack) => {
    axis === 'track'
      ? Animated.spring(moveAnimation, {
          toValue: {
            x: axis !== 'y' ? xValue : 0,
            y: axis === 'y' ? xValue : 0,
          },
          duration: 300,
          friction: 7,
          // easing: Easing.bounce,
        }).start(() => callBack !== undefined && callBack())
      : Animated.timing(moveAnimation, {
          toValue: {
            x: axis !== 'y' ? xValue : 0,
            y: axis === 'y' ? xValue : 0,
          },
          duration:
            type === 'toolBar'
              ? 250
              : axis === 'newTabs'
              ? 350
              : type === 'hideOption'
              ? 500
              : 300,
        }).start(() => callBack !== undefined && callBack());
  };
  static slideRightAnim = (moveAnimation, xValue, axis, type, callBack) => {
    const directionMultiplier = axis === 'x' ? 1 : -1; // Adjust direction based on the axis

    Animated.timing(moveAnimation, {
      toValue: {
        x: axis === 'x' ? -xValue * 1 : 0, // Negate xValue to move to the right
        y: axis === 'y' ? -xValue * 1 : 0, // Negate xValue to move upward
      },
      duration:
        type === 'toolBar'
          ? 250
          : axis === 'newTabs'
          ? 350
          : type === 'hideOption'
          ? 500
          : 300,
    }).start(() => callBack !== undefined && callBack());
  };
  static slideLeftAnim2 = (moveAnimation, xValue, axis, type, callBack) => {
    axis === 'track'
      ? Animated.spring(moveAnimation, {
          toValue: {
            x: axis !== 'y' ? xValue : 0,
            y: axis === 'y' ? xValue : 0,
          },
          duration: 300,
          friction: 7,
          // easing: Easing.bounce,
        }).start(() => callBack !== undefined && callBack())
      : Animated.timing(moveAnimation, {
          toValue: {
            x: axis !== 'y' ? xValue : 0,
            y: axis === 'y' ? xValue : 0,
          },
          duration:
            type === 'toolBar'
              ? 250
              : axis === 'newTabs'
              ? 350
              : type === 'hideOption'
              ? 500
              : 300,
        }).start(() => callBack !== undefined && callBack());
  };
}
