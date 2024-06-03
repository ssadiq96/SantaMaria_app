import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {IMAGES} from '../assets';
import {COLORS, CONSTANTS} from '../common';
import {scale, verticalScale} from '../common/Scale';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import DatePicker from 'react-native-date-picker';
import {DEVICE_OS, wp} from '../utils/constants';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StorageService from '../utils/StorageService';
import {isValidEmail, showSimpleAlert} from '../utils/CommonUtils';
import {ActivityLoader} from '../components/ActivityLoader';
import Request from '../api/Request';

export default function ProfileEditScreen({route, navigation}) {
  const [date, setDate] = useState(new Date(route?.params?.user?.dob));
  const [open, setOpen] = useState(false);
  const [selectedDate, setselectedDate] = useState(route?.params?.user?.dob);
  const [name, setname] = useState(route?.params?.user?.firstName);
  const [email, setemail] = useState(route?.params?.user?.email);
  const [bio, setbio] = useState(route?.params?.user?.bio);
  const [password, setpassword] = useState('');
  const [location, setlocation] = useState(route?.params?.user?.location);
  const [imgObj, setimgObj] = useState([]);

  const refRBSheet = useRef();
  const [image, setImage] = useState(route?.params?.user?.image);
  const [user, setuserData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const userData = await StorageService.getItem(
        StorageService.STORAGE_KEYS.USER_DETAILS,
      );
      setuserData(userData);
      // console.log('imageimageimageimage', image);
    }
    // Call the async function
    fetchData();
  }, []);
  const selectImageFromLibrary = async () => {
    try {
      const selectedImage = await ImagePicker.openPicker({
        mediaType: 'photo',
        includeBase64: true,
      });
      setimgObj(selectedImage);
      setImage(selectedImage.path);
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
      setimgObj(takenImage);
      setImage(takenImage.path);
      refRBSheet.current.close();
    } catch (error) {
      console.error('Photo taking error:', error);
    }
  };
  const validationofField = () => {
    if (name == '') {
      showSimpleAlert('Por favor ingrese el nombre');
    } else if (email == '') {
      showSimpleAlert('Por favor ingrese el correo electrónico');
    } else if (!isValidEmail(email)) {
      showSimpleAlert('Por favor introduzca un correo electrónico válido');
    } else if (bio == '') {
      showSimpleAlert('Por favor ingresa a la biografía');
    } else if (selectedDate == '') {
      showSimpleAlert('Por favor seleccione fecha de nacimiento');
    } else if (location == '') {
      showSimpleAlert('Por favor ingresa la ubicación');
    } else {
      return true;
    }
  };
  const editProfile = async () => {
    const ConfirmValid = validationofField();
    const dateofbirth =
      date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    // console.log('dateofbirth', dateofbirth);
    if (ConfirmValid) {
      let formData = new FormData();
      formData.append('bio', bio);
      formData.append('image', {
        uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
        name: `photo.${imgObj.filename}`,
        type: `image/${imgObj.filename}`,
      });
      formData.append('firstName', name);
      formData.append('location', location);
      formData.append('dob', dateofbirth);
      setisLoading(true);
      // console.log('formDataformDataformData', formData);
      const response = await Request.post('update', formData);
      setisLoading(false);

      if (response.code == 201) {
        navigation.goBack();
        showSimpleAlert(response.message);
      } else if (response.code == 200) {
        navigation.goBack();
        showSimpleAlert(response.message);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  return (
    <KeyboardAwareScrollView
      bounces={false}
      style={{backgroundColor: COLORS.white}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={{marginTop: scale(40)}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={IMAGES.backIcon} />
          </TouchableOpacity>
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
            imageSource={IMAGES.emailIcon}
            placeholder={'Correo electrónico'}
          />
          <CustomTextInput
            value={bio}
            onChangeText={text => {
              setbio(text);
            }}
            imageSource={IMAGES.bio}
            placeholder={'Biografía'}
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
            title={'Actualizar'}
            onPress={() => {
              editProfile();
            }}
            style={{alignSelf: 'center'}}
          />
          <DatePicker
            modal
            open={open}
            mode="date"
            date={date}
            onConfirm={date => {
              // console.log('datedate', date);
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
  selectImageText: {
    fontSize: scale(18),
    alignSelf: 'center',
    color: COLORS.yellow,
    paddingVertical: scale(20),
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
