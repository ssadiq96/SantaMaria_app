/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS, CONSTANTS} from '../common/index';
import {scale} from '../common/Scale';
import {Fonts} from '../utils/font';
import {FONTS} from '../assets';

const CustomButton = props => {
  /**
   * Custom button Comman rendring
   */
  // const {params} = props;
  return (
    <View>
      {props.flag == 0 ? (
        <TouchableOpacity
          style={[styles.container, props.style]}
          activeOpacity={props.activeOpacity || 0.8}
          onPress={props.onPress}
          disabled={props.disabled}>
          <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
        </TouchableOpacity>
      ) : props.flag == 2 ? (
        <TouchableOpacity
          style={[styles.container3, props.style]}
          activeOpacity={props.activeOpacity || 0.8}
          onPress={props.onPress}
          disabled={props.disabled}>
          <Image source={props.source} style={{height: 20, width: 30}} />
          <Text style={[styles.title2, props.titleStyle]}>{props.title}</Text>
        </TouchableOpacity>
      ) : props.flag == 3 ? (
        <TouchableOpacity
          style={[styles.container3, props.style]}
          activeOpacity={props.activeOpacity || 0.8}
          onPress={props.onPress}
          disabled={props.disabled}>
          <Text style={[styles.title2, props.titleStyle]}>{props.title}</Text>
          <Image
            source={props.source}
            style={[styles.imagestyle, props.imagestyle]}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.container2, props.style]}
          activeOpacity={props.activeOpacity || 0.8}
          onPress={props.onPress}
          disabled={props.disabled}>
          <Text style={[styles.title3, props.titleStyle]}>{props.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

/**
 * Custom button component comman style
 */
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(35),
    borderRadius: scale(20),
    paddingHorizontal: scale(10),
    alignSelf: 'stretch',
    width: CONSTANTS.screenWidth - 100,
    minWidth: 120,
    backgroundColor: COLORS.yellow,
    maxWidth: CONSTANTS.screenWidth - 70,
    marginVertical: scale(30),
  },

  container3: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(50),
    flexDirection: 'row',
    borderRadius: scale(20),
    paddingHorizontal: 15,
    alignSelf: 'stretch',
    width: CONSTANTS.screenWidth - 70,
    minWidth: 120,
    maxWidth: CONSTANTS.screenWidth - 70,
    marginVertical: scale(20),
  },
  title: {
    fontSize: scale(15),
    color: COLORS.white,
    fontWeight: '500',
    fontFamily: FONTS.GothamLight,
  },
  // title2: {
  //   fontSize: scale(20),
  //   color: COLORS.themeDark,
  //   paddingLeft: scale(20),
  //   fontWeight: '600',
  // },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(50),
    paddingHorizontal: 20,
    width: CONSTANTS.screenWidth / 2.5,
    backgroundColor: COLORS.pink,
    borderRadius: scale(15),
    alignSelf: 'center',
    maxWidth: CONSTANTS.screenWidth / 2,
    marginVertical: scale(20),
  },
  title2: {
    fontSize: scale(18),
    color: COLORS.themeDark,
    fontWeight: '600',
  },
  title3: {
    color: COLORS.white,
    fontSize: scale(21),
    fontFamily: Fonts.KohinoorBangla,
    letterSpacing: 0.7,
    fontWeight: 'bold',
  },
  imagestyle: {
    height: 20,
    width: 20,
  },
});

/**
 * Custom button component propes type for changeing style
 * and button click envet and initial value
 * manage other propes
 */
CustomButton.propTypes = {
  style: PropTypes.any,
  title: PropTypes.string,
  onPress: PropTypes.func,
  titleStyle: PropTypes.any,
  isWhite: PropTypes.bool,
  disabled: PropTypes.bool,
  flag: PropTypes.any,
  source: PropTypes.any,
  imagestyle: PropTypes.any,
};

export default CustomButton;
