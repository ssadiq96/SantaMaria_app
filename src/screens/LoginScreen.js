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
import StorageService from '../utils/StorageService';
import {ActivityLoader} from '../components/ActivityLoader';

export default function LoginScreen({route, navigation}) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
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
        setemail('')
        setpassword('')
        setTimeout(() => {
          // navigation.navigate('TabScreen');
          // navigation.reset()
          navigation.reset({
            index: 0,
            routes: [{ name: 'TabScreen' }]
       })
        }, 1000);
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
    } else if (password == '') {
      showSimpleAlert('Please enter password');
    } else {
      return true;
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: scale(80), alignItems: 'center'}}>
          <Image source={IMAGES.loginLogo} />
        </View>
        <View style={styles.textinputView}>
          <CustomTextInput
            imageSource={IMAGES.emailIcon}
            value={email}
            onChangeText={text => {
              setemail(text);
            }}
            placeholder={'Email'}
          />
          <CustomTextInput
            value={password}
            secureTextEntry={true}
            onChangeText={text => {
              setpassword(text);
            }}
            imageSource={IMAGES.passwordIcon}
            placeholder={'Password'}
          />
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgotPasswordScreen');
            }}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity> */}
        </View>

        <CustomButton
          flag={0}
          title={'Login'}
          style={{alignSelf: 'center'}}
          onPress={() => {
            checkLogin();
          }}
        />
        <Text style={styles.signUpText}>
          Don’t have an Account?
          <TouchableOpacity
            style={styles.signUpView}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            <Text style={styles.signUpText2}> Sign up</Text>
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
    marginTop: scale(40),
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
    fontWeight: '500',
    top: scale(3),
  },
  signUpView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
