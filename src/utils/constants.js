//#region import
import {Dimensions, Alert, Platform, StatusBar} from 'react-native';
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from 'react-native-responsive-screen';

var {height, width} = Dimensions.get('window');
export const hp = HP;
export const wp = WP;
export const DEVICE = {
  DEVICE_HEIGHT: height,
  DEVICE_WIDTH: width,
  ANDROID_DEVICE_HEIGHT:
    Platform.OS === 'android' && Platform.Version > 26
      ? Dimensions.get('screen').height - StatusBar.currentHeight
      : Dimensions.get('window').height,
};
export const DEVICE_OS = Platform.OS;
export const APP_NAME = 'SantaMaria';
export const SVGwidth = wp(110);
export const SVGheight = wp(60);
export function showAlert(msg) {
  Alert.alert(
    APP_NAME,
    '' + msg,
    [
      {
        text: 'DE ACUERDO',
        onPress: () => {},
      },
    ],
    {
      cancelable: false,
    },
  );
}
