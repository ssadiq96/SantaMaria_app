import React from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS, CONSTANTS} from '../common/index';
import {verticalScale, moderateScale, scale} from '../common/Scale';
import {Fonts} from '../utils/font';
import {DEVICE_OS, hp, wp} from '../utils/constants';
import {FONTS} from '../assets';

/**
 * comman text input component
 */
const CustomTextInput = props => {
  /**
   * component rendring method
   */
  return (
    <View style={[styles.mainContainer, props.mainStyle]}>
      <Image
        source={props.imageSource}
        style={[styles.imageStyle, props.imgstyle]}
      />
      <TextInput
        ref={props.inputRef}
        style={[
          styles.container,
          props.style,
          {fontSize: props.value ? wp(4) : wp(4)},
        ]}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor || COLORS.yellow}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        showSoftInputOnFocus={true}
        autoCapitalize={props.autoCapitalize}
        autoFocus={props.autoFocus}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        editable={props.editable}
        returnKeyType={props.returnKeyType}
        secureTextEntry={props.secureTextEntry}
        inputAccessoryViewID={props.inputAccessoryViewID}
        onSubmitEditing={props.onSubmitEditing}
        maxLength={props.maxLength}
        selectionColor={props.selectionColor}
        textContentType={props.textContentType}
      />
    </View>
  );
};

/**
 * component styling
 */
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    height: scale(45),
    width: CONSTANTS.screenWidth - 60,
    marginBottom: verticalScale(12),
    borderRadius: wp('3.2%'),
    alignItems: 'center',
    paddingLeft: wp('1.5%'),
    shadowOffset: {
      height: 3,
      width: 0,
    },
    borderBottomWidth: 1,
    borderBottomColor: COLORS.yellow,
    shadowOpacity: 0.1,
    shadowColor: '#707070',
    shadowRadius: 3,
    marginVertical: scale(5),
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: scale(5),
    fontSize: wp('3.8%'),
    color: COLORS.black,
    fontWeight: '400',
    paddingRight: 10,

    letterSpacing: 0.4,
    paddingLeft: wp('1.5%'),
  },
  imageStyle: {
    marginHorizontal: 2,
  },
});

/**
 * cpmponent propes types
 * Handle comman style and all other propes of text input
 */
CustomTextInput.propTypes = {
  style: PropTypes.any,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
  editable: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  inputRef: PropTypes.func,
  multiline: PropTypes.bool,
  inputAccessoryViewID: PropTypes.string,
  maxLength: PropTypes.number,
  textContentType: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default CustomTextInput;
