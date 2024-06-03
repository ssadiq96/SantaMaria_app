import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {FONTS, IMAGES} from '../assets';
import {COLORS, CONSTANTS} from '../common';
import {moderateScale, scale, verticalScale} from '../common/Scale';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import DatePicker from 'react-native-date-picker';
import {DEVICE_OS, wp} from '../utils/constants';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isValidEmail, showSimpleAlert} from '../utils/CommonUtils';
import Request from '../api/Request';
import StorageService from '../utils/StorageService';
import {ActivityLoader} from '../components/ActivityLoader';

export default function SignUpScreen({route, navigation}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setselectedDate] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [bio, setbio] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [location, setlocation] = useState('');
  const refRBSheet = useRef();
  const [image, setImage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [imgObj, setimgObj] = useState([]);

  const selectImageFromLibrary = async () => {
    try {
      const selectedImage = await ImagePicker.openPicker({
        mediaType: 'photo',
      });
      // console.log('selectedImage', selectedImage);
      setImage(selectedImage.path);
      setimgObj(selectedImage);
      refRBSheet.current.close();
    } catch (error) {
      console.error('Image selection error:', error);
    }
  };

  const takePhoto = async () => {
    try {
      const takenImage = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      setImage(takenImage.path);
      setimgObj(takenImage);
      refRBSheet.current.close();
    } catch (error) {
      console.error('Photo taking error:', error);
    }
  };
  const signup = async () => {
    // console.log('image', image);
    const dateofbirth =
      date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    // console.log('dateofbirth', dateofbirth);
    const ConfirmValid = validationofField();
    if (ConfirmValid) {
      // let params = {
      //   email: email,
      //   password: password,
      //   bio: bio,
      //   firstName: name,
      //   dob: dateofbirth,
      //   location: location,
      //   image: image,
      // };
      let formData = new FormData();
      formData.append('bio', bio);
      formData.append('email', email);
      formData.append('firstName', name);

      formData.append('image', {
        uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
        name: `photo.${imgObj.filename}`,
        type: `image/${imgObj.filename}`,
      });
      formData.append('location', location);
      formData.append('password', password);

      formData.append('dob', dateofbirth);
      setisLoading(true);
      // console.log('formdara', formData);
      const response = await Request.post('register', formData);
      setisLoading(false);

      if (response.code == 201) {
        showSimpleAlert(response.message);
        navigation.goBack();
      } else if (response.code == 200) {
        showSimpleAlert(response.message);
        navigation.goBack();
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const validationofField = () => {
    if (!image) {
      showSimpleAlert('Por favor sube imagen');
    } else if (name == '') {
      showSimpleAlert('Por favor ingrese el nombre');
    } else if (email == '') {
      showSimpleAlert('Por favor ingrese el correo electrónico');
    } else if (!isValidEmail(email)) {
      showSimpleAlert('Por favor introduzca un correo electrónico válido');
    } else if (bio == '') {
      showSimpleAlert('Por favor ingresa a la biografía');
    } else if (!password) {
      showSimpleAlert('Por favor, ingrese contraseña');
    } else if (!confirmpassword) {
      showSimpleAlert('Por favor ingrese confirmar contraseña');
    } else if (confirmpassword != password) {
      showSimpleAlert('Contraseña y Confirmar contraseña deben ser iguales');
    } else if (selectedDate == '') {
      showSimpleAlert('Por favor seleccione fecha de nacimiento');
    } else if (location == '') {
      showSimpleAlert('Por favor ingresa la ubicación');
    } else {
      return true;
    }
  };
  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{alignSelf: 'flex-start', marginTop: scale(20)}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={IMAGES.backIcon} style={styles.backIconStyle} />
        </TouchableOpacity>
        <View>
          <Image source={IMAGES.appLogo} />
        </View>
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}>
            {image ? (
              <Image source={{uri: image}} style={styles.imageView} />
            ) : (
              <Image source={IMAGES.dummyImage} style={styles.imageView} />
            )}
            <Image source={IMAGES.galleryIcon} style={styles.galleryIconView} />
          </TouchableOpacity>
        </View>
        <View style={styles.textinputView}>
          <CustomTextInput
            value={name}
            onChangeText={text => {
              setname(text);
            }}
            imageSource={IMAGES.profile}
            placeholder={'Nombre'}
          />
          <CustomTextInput
            value={email}
            onChangeText={text => {
              setemail(text);
            }}
            imageSource={IMAGES.emailIcon}
            placeholder={'Correo electrónico'}
          />
          <CustomTextInput
            value={bio}
            onChangeText={text => {
              setbio(text);
            }}
            imageSource={IMAGES.bio}
            placeholder={'Correo electrónico'}
          />

          <CustomTextInput
            value={password}
            onChangeText={text => {
              setpassword(text);
            }}
            imageSource={IMAGES.passwordIcon}
            placeholder={'Contraseña'}
          />
          <CustomTextInput
            value={confirmpassword}
            onChangeText={text => {
              setconfirmpassword(text);
            }}
            imageSource={IMAGES.passwordIcon}
            placeholder={'confirmar Contraseña'}
          />
          <TouchableOpacity
            onPress={() => {
              setOpen(!open);
            }}>
            <View style={styles.mainContainer2}>
              <Image source={IMAGES.calendar} style={styles.imageStyle} />
              <View style={[styles.container2]}>
                <Text
                  style={{
                    color: selectedDate ? COLORS.black : COLORS.yellow,
                    fontSize: wp(4),
                    fontWeight: '400',
                    fontFamily: FONTS.GothamLight,
                  }}>
                  {selectedDate
                    ? date.getDate() +
                      '-' +
                      (date.getMonth() + 1) +
                      '-' +
                      date.getFullYear()
                    : 'Seleccione fecha de nacimiento'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <CustomTextInput
            value={location}
            onChangeText={text => {
              setlocation(text);
            }}
            imageSource={IMAGES.location}
            placeholder={'Ingrese la ubicación'}
          />
          <CustomButton
            flag={0}
            title={'Register'}
            onPress={() => {
              signup();
            }}
            style={{alignSelf: 'center'}}
          />
          <DatePicker
            modal
            open={open}
            mode="date"
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setselectedDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            height={scale(280)}
            closeOnPressMask={true}
            customStyles={{
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
            }}>
            <View style={{alignItems: 'center', height: '70%'}}>
              <Text style={styles.selectImageText}>Seleccione una imagen</Text>
              <CustomButton
                flag={0}
                style={{marginVertical: scale(10)}}
                title="Elige de la biblioteca"
                onPress={selectImageFromLibrary}
              />
              <CustomButton
                style={{marginVertical: scale(10)}}
                flag={0}
                title="Tomar foto"
                onPress={takePhoto}
              />
              <CustomButton
                flag={0}
                style={{marginVertical: scale(10)}}
                title="Cancelar"
                onPress={() => refRBSheet.current.close()}
              />
            </View>
          </RBSheet>
        </View>
      </View>
      <ActivityLoader loading={isLoading} />
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  backIconStyle: {
    height: scale(30),
    width: scale(30),
    top: scale(10),
    margin: scale(20),
  },

  textinputView: {
    marginTop: scale(20),
  },
  mainContainer2: {
    flexDirection: 'row',
    height: DEVICE_OS === 'ios' ? wp('10.5%') : wp('10.5%'),
    width: CONSTANTS.screenWidth - 60,
    marginBottom: verticalScale(5),
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
  selectImageText: {
    fontSize: scale(18),
    alignSelf: 'center',
    color: COLORS.yellow,
    paddingVertical: scale(20),
  },
  container2: {
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: scale(5),
    fontSize: wp('3.8%'),
    color: COLORS.black,
    fontWeight: '300',
    paddingRight: 10,
    letterSpacing: 0.4,
    paddingLeft: wp('1.5%'),
  },
  imageStyle: {
    marginHorizontal: 2,
  },
  imageView: {
    height: scale(100),
    width: scale(100),
    borderRadius: scale(50),
    borderWidth: 1,
    borderColor: COLORS.yellow,
  },
  galleryIconView: {
    alignSelf: 'flex-end',
    top: scale(70),
    position: 'absolute',
    justifyContent: 'flex-end',
  },
});
