// import {
//    React, commonColors, Image, Platform, AppState, StorageService, Fonts, Request, showSimpleAlert,
//    Text,
//    useState, useEffect, messaging, showMessage, NavigationService

import {AppState, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import StorageService from './StorageService';
import NavigationService from './NavigationService';
import {COLORS} from '../common';
import {useEffect} from 'react';
import Request from '../api/Request';

// } from '../utils/importLibrary'
export default function PushNotification({route, navigation}) {
  let appState = AppState.currentState;
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    checkPermission();

    /** token refresh in firebase notification */
    messaging().onTokenRefresh(async fcmToken => {
      const deviceToken = await Request.getDeviceToken();
      if (deviceToken !== fcmToken) {
        setFCMToken(fcmToken);
      }
    });

    // forground ( when app open ) in firebase notification
    messaging().onMessage(async remoteMessage => {
      // console.log("remotemessage", remoteMessage);
      if (appState == 'active') {
        showMessage(
          {
            type: 'default',
            // description: remoteMessage.notification.body,
            message: remoteMessage.notification.title,
            color: remoteMessage.notification.body,
            autoHide: true,
            titleStyle: {
              color: COLORS.pink,
              fontSize: 16,
              marginHorizontal: 10,
            },
            textStyle: {
              color: COLORS.pink,
              fontSize: 14,
              marginHorizontal: 10,
            },
            onPress: () => handleNotificationRedirection(remoteMessage.data),
            type: 'success',
            icon: 'appIcon',
            backgroundColor:
              Platform.OS === 'android'
                ? remoteMessage.notification.android.imageUrl
                : remoteMessage.data.fcm_options.image,
          },
          () => {},
        );
        // console.log('remoteMessageremoteMessage', remoteMessage);
      }
    });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      handleNotificationRedirection(remoteMessage.data);
    });

    // executes when application is in background state.
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      handleNotificationRedirection(remoteMessage);
    });

    //If your app is closed
    const remoteInitialNotification = messaging()
      .getInitialNotification()
      .then(notificationOpen => {
        if (notificationOpen) {
          handleNotificationRedirection(notificationOpen.data, true);
        }
      });
    checkForIOS();
    return () => {
      //compowillunmout
      removeAllNotificationListners();
    };
  }, []);

  /**
   *
   * @param {*} notification
   * @param {*} isFromKilledApp
   * Handling notification tap and redireaction
   */
  const handleNotificationRedirection = (notification, isFromKilledApp) => {
    if (isFromKilledApp == true) {
      // NavigationService.navigate("NotificationViewController");
    } else {
      // NavigationService.navigate("NotificationViewController");
    }
  };

  /**check config for iOS platform */
  const checkForIOS = async () => {
    if (Platform.OS == 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  /**handle app state change  */
  const _handleAppStateChange = nextAppState => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
    }
    appState = nextAppState;
  };

  /**check the notification permission */
  const checkPermission = async () => {
    const hasPermission = await messaging().hasPermission();
    const enabled =
      hasPermission === messaging.AuthorizationStatus.AUTHORIZED ||
      hasPermission === messaging.AuthorizationStatus.PROVISIONAL;
    if (
      hasPermission === messaging.AuthorizationStatus.AUTHORIZED ||
      hasPermission === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      await getFCMToken();
    } else if (
      hasPermission === messaging.AuthorizationStatus.DENIED ||
      hasPermission === messaging.AuthorizationStatus.NOT_DETERMINED
    ) {
      const isPermission = await requestUserPermission();
      if (!isPermission) {
        return false;
      } else getFCMToken();
    } else {
      const isPermission = await requestUserPermission();
      if (!isPermission) {
        return false;
      } else getFCMToken();
    }
  };

  /**gets the fcm token */
  const getFCMToken = async () => {
    const token = await messaging().getToken();
    if (token) {
      setFCMToken(token);
    }
  };

  /**set the fcm token */
  const setFCMToken = async fcmToken => {
    // console.log('token', fcmToken);
    await StorageService.saveItem(
      StorageService.STORAGE_KEYS.DEVICE_TOKEN,
      fcmToken,
    );
  };

  /**request notification permission */
  const requestUserPermission = async () => {
    const settings = await messaging().requestPermission({
      provisional: false,
    });
    if (settings) {
      return settings;
    }
  };

  /**remove notification all listeners */
  const removeAllNotificationListners = () => {
    AppState.removeEventListener('change', _handleAppStateChange);
  };

  /**componet render method */
  return null;
}
