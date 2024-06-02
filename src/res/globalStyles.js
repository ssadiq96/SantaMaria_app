import {StyleSheet} from 'react-native';
import {hp, wp, DEVICE_OS, DEVICE} from '../utils/constants';
import {COLORS} from '../common';
import {Fonts} from '../utils/font';
import {
  getBottomSpace,
  getStatusBarHeight,
  ifIphoneX,
} from 'react-native-iphone-x-helper';

const globalStyles = StyleSheet.create({
  paddingTop: {
    ...ifIphoneX(
      {
        marginTop: getStatusBarHeight() + hp('6%'),
      },
      {
        marginTop:
          DEVICE_OS === 'android'
            ? getStatusBarHeight()
            : getStatusBarHeight() + hp('6%'),
      },
    ),
  },
  paddingTop2: {
    ...ifIphoneX({
      marginTop: getStatusBarHeight() + hp('2%'),
    }),
  },
  absoluteTop: {
    ...ifIphoneX(
      {
        top: getStatusBarHeight() + 15,
      },
      {
        top: getStatusBarHeight(),
      },
    ),
  },
  paddingTop1: {
    ...ifIphoneX(
      {
        marginTop: getStatusBarHeight() + hp('2.5%'),
      },
      {
        marginTop:
          DEVICE_OS === 'ios' ? getStatusBarHeight() + hp('2.5%') : hp('2.5%'),
      },
    ),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subContainer: {
    flex: 1,
    width: DEVICE.DEVICE_WIDTH,
    backgroundColor: COLORS.white,
  },
  flex: {
    flex: 1,
    backgroundColor: COLORS.light_charcoal,
    alignItems: 'center',
  },

  bottomSpace: {
    ...ifIphoneX(
      {
        marginBottom: getBottomSpace(),
      },
      {
        marginBottom: 13,
      },
    ),
  },
  img: {
    resizeMode: 'contain',
    height: wp('12%'),
    width: wp('12%'),
  },
  text: {
    fontFamily: Fonts.HiraMaruProNW4,
    fontSize: wp('3%'),
    color: COLORS.black,
  },
  textHome: {
    fontFamily: Fonts.HiraMaruProNW4,
    fontSize: wp('4%'),
    color: COLORS.white,
  },
  shadow: {
    backgroundColor: COLORS.light_charcoal,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: -8},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  searchBox: {
    padding: wp('2%'),
    paddingTop: wp('1.7%'),
    paddingBottom: wp('1.7%'),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemContainer: {
    width: wp('90%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('2.5%'),
    paddingLeft: wp('4.4%'),
    marginBottom: wp('1.5%'),
    paddingTop: wp('1.8%'),
    paddingBottom: wp('1.8%'),
  },
  container: {
    flex: 1,
  },
});

export default globalStyles;
