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
import {showSimpleAlert} from '../utils/CommonUtils';
import Request from '../api/Request';

export default function NewPasswordScreen({route, navigation}) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [, setIsLoading] = useState(false);

  const resetPassword = async () => {
    const isValid = validateField();
    const token = route?.params?.token;
    let params = {
      token: token,
      newPassword: newPassword,
    };
    if (isValid) {
      setIsLoading(true);
      const response = await Request.post('resetPassword', params);
      setIsLoading(false);

      if (response.code == 200) {
        showSimpleAlert(response.message);
        navigation.navigate('LoginScreen'); // Assuming there's a LoginScreen
      } else {
        showSimpleAlert(response.message);
      }
    }
  };

  const validateField = () => {
    if (newPassword == '') {
      showSimpleAlert('Por favor ingrese la nueva contraseña');
      return false;
    } else if (confirmPassword == '') {
      showSimpleAlert('Por favor confirme la nueva contraseña');
      return false;
    } else if (newPassword !== confirmPassword) {
      showSimpleAlert('Las contraseñas no coinciden');
      return false;
    }
    return true;
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
            imageSource={IMAGES.passwordIcon}
            value={newPassword}
            onChangeText={text => {
              setNewPassword(text);
            }}
            placeholder={'Nueva contraseña'}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.textinputView}>
          <CustomTextInput
            imageSource={IMAGES.passwordIcon}
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
            }}
            placeholder={'Confirmar nueva contraseña'}
            secureTextEntry={true}
          />
        </View>
        <CustomButton
          flag={0}
          title={'Restablecer contraseña'}
          onPress={() => {
            resetPassword();
          }}
        />
        <Text style={styles.instructionText}>
          Ingrese su nueva contraseña y confírmela para continuar.
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
    marginTop: scale(20),
  },
  backIconStyle: {
    height: scale(30),
    width: scale(30),
    top: scale(10),
    margin: scale(20),
  },
  instructionText: {
    textAlign: 'center',
    color: COLORS.yellow,
    fontFamily: FONTS.GothamLight,
    width: scale(300),
    fontSize: scale(13),
    marginTop: scale(20),
  },
});
