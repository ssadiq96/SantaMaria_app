/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS, IMAGES} from '../assets';
import {scale} from '../common/Scale';
import CustomButton from '../components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showSimpleAlert} from '../utils/CommonUtils';
import Request from '../api/Request';
import {COLORS} from '../common';

export default function VerifyOTPScreen({route, navigation}) {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [, setIsLoading] = useState(false);
  const [maxLength, setMaxLength] = useState(6);

  const otpInputs = useRef([]);

  const handleChange = (text, index) => {
    if (index == 0) {
      setMaxLength(1);
    }
    if (text.toString().length > 1 && !isNaN(parseInt(text, 10))) {
      handlePaste(text);
      return;
    }
    if (/^[0-9]$/.test(text) || text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < 5) {
        otpInputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (index === 0) {
      setMaxLength(6);
    }
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handlePaste = text => {
    const pastedText = text;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      if (i < pastedText.length && /^[0-9]$/.test(pastedText[i])) {
        newOtp[i] = pastedText[i];
      } else {
        newOtp[i] = '';
      }
    }
    setOtp(newOtp);
    otpInputs.current[Math.min(pastedText.length, 5)].focus();
  };

  const verifyOTP = async () => {
    const isValid = validateField();
    if (isValid) {
      const otpValue = otp.join('');
      const email = route?.params?.email;
      let params = {
        otp: otpValue,
        email,
      };
      setIsLoading(true);
      const response = await Request.post('verifyOtp', params);
      setIsLoading(false);

      if (response.code == 200) {
        showSimpleAlert(response.message);
        navigation.navigate('NewPasswordScreen', {
          token: response.token,
        }); // Assuming there's a NewPasswordScreen
      } else {
        showSimpleAlert(response.message);
      }
    }
  };

  const validateField = () => {
    if (otp.includes('')) {
      showSimpleAlert('Por favor ingrese el OTP completo');
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
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (otpInputs.current[index] = ref)}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              style={styles.otpBox}
              keyboardType="numeric"
              maxLength={maxLength}
            />
          ))}
        </View>
        <CustomButton
          flag={0}
          title={'Verificar OTP'}
          onPress={() => {
            verifyOTP();
          }}
        />
        <Text style={styles.instructionText}>
          Ingrese el OTP enviado a su correo electrónico.
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(60),
    marginBottom: scale(30),
  },
  otpBox: {
    width: scale(40),
    height: scale(40),
    borderColor: COLORS.yellow,
    borderWidth: 1,
    marginHorizontal: scale(5),
    textAlign: 'center',
    fontSize: scale(20),
    color: COLORS.black,
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
  },
});
