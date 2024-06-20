/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import constants from '../common/constants';
import {scale, verticalScale} from '../common/Scale';
import {COLORS} from '../common';
import NavigationService from '../utils/NavigationService';
import {IMAGES} from '../assets';
import {hp, wp} from '../utils/constants';

const CustomHeader = ({
  isBackIcon,
  onBackButtonPress,
  containerStyle,
  firstViewStyle,
  imageSource,
  isAppLogo,
  headerText,
  isCenteredText,
  centerTextStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.firstView, firstViewStyle]}>
        <View style={{flex: 0.4}}>
          {isBackIcon ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginLeft: wp('7%'),
              }}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  if (onBackButtonPress) {
                    onBackButtonPress();
                  } else {
                    NavigationService.goBack();
                  }
                }}
                activeOpacity={constants.activeOpacity}
                delayPressIn={0}
                hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
                <Image
                  source={imageSource}
                  style={{height: wp('9%'), width: wp('9%')}}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={{marginLeft: wp('7%'), marginTop: hp('2%')}}>
          {isAppLogo ? (
            <View style={styles.appLogoView}>
              {isCenteredText ? (
                <Text style={styles.centeredText}>{isCenteredText}</Text>
              ) : null}

              <Image source={IMAGES.appLogo} style={styles.logoStyle} />
              <Text style={styles.accountText}>{headerText}</Text>
            </View>
          ) : null}

          {isCenteredText ? (
            <View style={styles.appLogoView}>
              <Text style={[styles.centeredText, centerTextStyle]}>
                {isCenteredText}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: verticalScale(10),
    justifyContent: 'space-between',
    marginTop: hp('6%'),
  },
  firstView: {
    zIndex: 2,
    flex: 1,
    flexDirection: 'row',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleView: {
    alignItems: 'center',
    flex: 3,
  },
  middleViewWrap: {},
  lastView: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textstyle: {
    fontSize: scale(22),
    color: COLORS.black,
    textAlign: 'center',
  },
  logoStyle: {
    height: wp('28%'),
    width: wp('28%'),
  },
  appLogoView: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  accountText: {
    color: COLORS.white,
    paddingVertical: scale(15),
    fontSize: scale(18),
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  centeredText: {
    color: COLORS.white,
    fontSize: scale(22),
    paddingVertical: scale(8),
    marginBottom: scale(20),
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
