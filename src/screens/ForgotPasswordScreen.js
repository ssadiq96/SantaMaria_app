/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
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
  const [email, setEmail] = useState('');
  const [, setIsLoading] = useState(false);

  const forgotPassword = async () => {
    const ConfirmValid = validationOfField();
    if (ConfirmValid) {
      let params = {
        email: email,
      };
      setIsLoading(true);
      const response = await Request.post('forgotPassword', params);
      setIsLoading(false);

      if (response.status == true) {
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const validationOfField = () => {
    if (email == '') {
      showSimpleAlert('Por favor ingrese el correo electrónico');
    } else if (!isValidEmail(email)) {
      showSimpleAlert('Por favor introduzca un correo electrónico válido');
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
              setEmail(text);
            }}
            placeholder={'Correo electrónico'}
          />
        </View>
        <CustomButton
          flag={0}
          title={'Has olvidado tu contraseña'}
          onPress={() => {
            forgotPassword();
          }}
        />
        <Text style={styles.signUpText}>
          Le enviaremos una nueva contraseña a su correo electrónico y luego
          podrá cambiarla en su configuración.
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
