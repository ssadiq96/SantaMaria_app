/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FONTS, IMAGES} from '../assets';
import {scale, verticalScale} from '../common/Scale';
import CustomTextInput from '../components/CustomTextInput';
import {COLORS} from '../common';
import CustomButton from '../components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isValidEmail, showSimpleAlert} from '../utils/CommonUtils';
import Request from '../api/Request';
import StorageService from '../utils/StorageService';
import {ActivityLoader} from '../components/ActivityLoader';

export default function LoginScreen({route, navigation}) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loginImage, setLoginImage] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const checkLogin = async () => {
    const ConfirmValid = validationofField();
    if (ConfirmValid) {
      let params = {
        email: email,
        password: password,
      };
      setisLoading(true);
      const response = await Request.post('login', params);
      setisLoading(false);

      if (response.code == 200) {
        await StorageService.saveItem(
          StorageService.STORAGE_KEYS.AUTH_TOKEN,
          response.data.authToken,
        );
        await StorageService.saveItem(
          StorageService.STORAGE_KEYS.USER_DETAILS,
          response.data,
        );
        setemail('');
        setpassword('');
        setTimeout(() => {
          // navigation.navigate('TabScreen');
          // navigation.reset()
          navigation.reset({
            index: 0,
            routes: [{name: 'MainScreen'}],
          });
        }, 1000);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const validationofField = () => {
    if (email == '') {
      showSimpleAlert('Por favor ingrese el correo electrónico');
    } else if (!isValidEmail(email)) {
      showSimpleAlert('Por favor introduzca un correo electrónico válido');
    } else if (password == '') {
      showSimpleAlert('Por favor, ingrese contraseña');
    } else {
      return true;
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      const response = await Request.get('mainPageImage/getLoginImage');
      setLoginImage(response?.data || null);
    };
    fetchImage();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: scale(80),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={
              loginImage?.cover_image
                ? {uri: loginImage.cover_image}
                : IMAGES.loginLogo
            }
            style={{
              height: verticalScale(loginImage?.cover_image ? 150 : 200),
              width: scale(loginImage?.cover_image ? 189 : 239),
            }}
          />
          <View style={{flex: 1, width: scale(245)}}>
            <Text style={styles.titleText}>Inicio de Sesión</Text>
            <Text style={styles.subTitleText}>
              ¡El Hub de la Comunidad de Santa María te espera!
            </Text>
          </View>
        </View>
        <View style={styles.textinputView}>
          <CustomTextInput
            imageSource={IMAGES.emailIcon}
            value={email}
            onChangeText={text => {
              setemail(text);
            }}
            placeholder={'Correo Electrónico'}
          />
          <CustomTextInput
            value={password}
            secureTextEntry={true}
            onChangeText={text => {
              setpassword(text);
            }}
            imageSource={IMAGES.passwordIcon}
            placeholder={'Contraseña'}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgotPasswordScreen');
            }}>
            <Text style={styles.forgotPasswordText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          flag={0}
          title={'Iniciar Sesión'}
          style={{alignSelf: 'center'}}
          onPress={() => {
            checkLogin();
          }}
        />
        <Text style={styles.signUpText}>
          ¿No tienes una cuenta?
          <TouchableOpacity
            style={styles.signUpView}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            <Text style={styles.signUpText2}> Regístrate</Text>
          </TouchableOpacity>
        </Text>
      </KeyboardAwareScrollView>
      <ActivityLoader loading={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textinputView: {
    marginTop: scale(30),
  },
  forgotPasswordText: {
    textAlign: 'right',
    paddingVertical: scale(1),
    color: COLORS.yellow,
    fontFamily: FONTS.GothamLight,
    fontWeight: '400',
    fontSize: scale(12),
  },
  signUpText: {
    textAlign: 'center',
    color: COLORS.black,
    fontWeight: '400',
    fontSize: scale(12),
    bottom: scale(18),
  },
  signUpText2: {
    color: COLORS.yellow,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: FONTS.GotamBold,
    top: scale(3),
  },
  signUpView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    color: COLORS.yellow,
    fontSize: scale(24),
    marginTop: scale(5),
    fontFamily: FONTS.GotamBold,
    flex: 1,
  },
  subTitleText: {
    textAlign: 'center',
    color: COLORS.yellow,
    fontSize: scale(14),
    marginTop: scale(5),
    fontFamily: FONTS.GothamMedium,
    flex: 1,
    flexWrap: 'wrap',
  },
});
