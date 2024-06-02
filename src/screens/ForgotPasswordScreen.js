import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FONTS, IMAGES} from '../assets';
import {scale} from '../common/Scale';
import CustomTextInput from '../components/CustomTextInput';
import {COLORS} from '../common';
import CustomButton from '../components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isValidEmail, showSimpleAlert} from '../utils/CommonUtils';
import Request from '../api/Request';

export default function ForgotPasswordScreen({route, navigation}) {
  const [email, setemail] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const forgotPassword = async () => {
    const ConfirmValid = validationofField();
    if (ConfirmValid) {
      let params = {
        email: email,
      };
      setisLoading(true);
      const response = await Request.post('forgotPassword', params);
      setisLoading(false);

      if (response.status == true) {
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const validationofField = () => {
    if (email == '') {
      showSimpleAlert('Please enter email');
    } else if (!isValidEmail(email)) {
      showSimpleAlert('Please enter valid email');
    } else {
      return true;
    }
  };
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{alignSelf: 'flex-start', marginTop: scale(20)}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={IMAGES.backIcon} style={styles.backIconStyle} />
        </TouchableOpacity>
        <View style={{}}>
          <Image source={IMAGES.loginLogo} />
        </View>
        <View style={styles.textinputView}>
          <CustomTextInput
            imageSource={IMAGES.emailIcon}
            value={email}
            onChangeText={text => {
              setemail(text);
            }}
            placeholder={'Correo electrónico'}
          />
        </View>
        <CustomButton
          flag={0}
          title={'Forgot Password'}
          onPress={() => {
            forgotPassword();
          }}
        />
        <Text style={styles.signUpText}>
          We will send you a new password by your email you can then change it
          in your settings
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textinputView: {
    marginTop: scale(60),
  },
  forgotPasswordText: {
    textAlign: 'right',
    paddingVertical: scale(1),
    color: COLORS.yellow,
    fontWeight: '700',
    fontSize: scale(12),
  },
  backIconStyle: {
    height: scale(30),
    width: scale(30),
    top: scale(10),
    margin: scale(20),
  },
  signUpText: {
    textAlign: 'center',
    color: COLORS.yellow,
    fontFamily: FONTS.GothamLight,
    width: scale(300),
    fontSize: scale(13),
  },

  signUpView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
