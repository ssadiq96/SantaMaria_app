import React from 'react';
import {StyleSheet, Text,} from 'react-native';
import {Image, View} from 'react-native-animatable';
import {IMAGES} from '../assets';
import {scale} from '../common/Scale';
import {COLORS} from '../common';
import CustomButton from '../components/CustomButton';

export default function VerifySignupScreen({route,navigation}) {
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center',flex:1,justifyContent:'center',bottom:scale(30)}}>
        <Image source={IMAGES.verifyLogo} />
        <Text style={styles.thanksText}>{'Thank You for Signing up'}</Text>

        <Text style={styles.thanksText2}>
          {'Verifying your request, please check after sometime'}
        </Text>
        <CustomButton
          flag={0}
          style={{width: scale(180)}}
          title={'Refresh'}
          onPress={()=>{
            navigation.goBack()
        }}
          titleStyle={{fontSize: scale(12)}}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIconStyle:{
    height:scale(30),
    width:scale(30),
    top:scale(20),
    margin:scale(20)
},

  thanksText: {
    fontSize: scale(18),
    color: COLORS.yellow,
    paddingVertical: scale(5),
    fontWeight: '500',
  },
  thanksText2: {
    fontSize: scale(12),
    color: COLORS.black,
    fontWeight: '400',
  },
});
