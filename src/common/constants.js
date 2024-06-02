import {Platform, Dimensions} from 'react-native';
const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const {width, height} = Dimensions.get('window');
const isLandscape = width > height;
const isPortrait = width < height;
const screenWidth = width;
const screenHeight = height;
const activeOpacity = 0.5;
const AppName = 'Santa Maria';
/**
 * keyboard related constants
 */
const keyboardConstant = {
  doneReturnKeyType: 'done',
  nextReturnKeyType: 'next',
  searchReturnKeyType: 'search',
  emailKeyboardType: 'email-address',
  numericKeyboardType: 'numeric',
  LATITUDE_DELTA: 0.4,
  LONGITUDE_DELTA: 0.4,
};

/**
 * common constants used in app for different purpose
 */
const common = {
  isLandscape,
  isPortrait,
  screenWidth,
  screenHeight,
  isIOS,
  isAndroid,
  activeOpacity,
  AppName,
};

/**constants used in app */
const CONSTANTS = {
  ...common,
  ...keyboardConstant,
};

export default CONSTANTS;
