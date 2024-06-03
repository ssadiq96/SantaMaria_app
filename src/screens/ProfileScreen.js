import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS, IMAGES} from '../assets';
import {moderateScale, scale} from '../common/Scale';
import {COLORS, CONSTANTS} from '../common';
import NavigationService from '../utils/NavigationService';
import StorageService from '../utils/StorageService';
import moment from 'moment';
import Request from '../api/Request';
import {useIsFocused} from '@react-navigation/native';
import {showSimpleAlert} from '../utils/CommonUtils';
import {Rating} from '@kolking/react-native-rating';
import {Buffer} from 'buffer';

export default function ProfileScreen(props) {
  const isFocused = useIsFocused();

  const [bannerData, setbannerData] = useState([]);
  const [supplierData, setsupplierData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [user, setuserData] = useState([]);
  const supplierArray = [];
  const discountArray = [];
  useEffect(() => {
    async function fetchData() {
      if (isFocused) {
        // console.log('props234', props);
        await getProfileData();
        await getWishlistData();
        props.updateprofile(1);
      }
    }
    // Call the async function
    fetchData();
  }, [isFocused]);
  const getProfileData = async () => {
    const response = await Request.get('user');
    setuserData(response.data);

    await StorageService.saveItem(
      StorageService.STORAGE_KEYS.USER_DETAILS,
      response.data,
    );
  };
  const getWishlistData = async () => {
    setisLoading(true);
    const response = await Request.get('wishlist');
    // console.log('wishlistresponseresponseresponse', response);
    if (response) {
      setisLoading(false);

      // console.log('responser123', response);
      if (response.code == 200) {
        response.data.rows.forEach(item => {
          if (item.category === 'Supplier') {
            supplierArray.push(item);
          } else if (item.category === 'Discount') {
            discountArray.push(item);
          }
        });
        setsupplierData(supplierArray);
        setbannerData(discountArray);
        // setsupplierData(response.data.rows);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const navigatediscountDetailPage = item => {
    const base64EncodedIdObject = Buffer.from(
      JSON.stringify({
        iv: item?.id?.iv,
        encryptedData: item?.id?.encryptedData,
      }),
    ).toString('base64');
    NavigationService.navigate('DiscountCompanyPage', {
      discountobj: base64EncodedIdObject,
    });
  };
  const bannerDatarenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigatediscountDetailPage(item);
        }}
        style={{}}>
        <View style={styles.renderView2}>
          <Image
            source={
              item?.discount?.image
                ? {uri: item?.discount?.image}
                : IMAGES.appLogo
            }
            style={{
              height: scale(130),
              width: scale(200),
              borderRadius: scale(20),
            }}
          />
          <View style={styles.overlay2} />
          <View style={styles.offerView}>
            <Text numberOfLines={1} style={styles.titleName}>
              {item?.discount?.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const supplierDatarenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          const base64EncodedIdObject = Buffer.from(
            JSON.stringify({
              iv: item?.id?.iv,
              encryptedData: item?.id?.encryptedData,
            }),
          ).toString('base64');
          // console.log('base64EncodedIdObject12', base64EncodedIdObject);
          NavigationService.navigate('SupplierDetails', {
            supplierObj: base64EncodedIdObject,
          });
        }}>
        <View style={styles.renderView3}>
          <Text
            numberOfLines={1}
            style={[styles.textStyle3, {fontWeight: '500'}]}>
            {item?.supplier?.name}
          </Text>
          <Image
            source={{uri: item?.supplier?.profile_image}}
            style={{
              alignSelf: 'center',
              borderRadius: scale(10),
              width: scale(40),
              height: scale(40),
            }}
          />
          <Rating
            size={moderateScale(17)}
            ratingColor={COLORS.yellow}
            fillColor={COLORS.yellow}
            type={'custom'}
            disabled={true}
            baseColor={'#F0F0F0'}
            rating={item?.supplier?.average_rating}
            style={{
              marginVertical: scale(10),
              // marginHorizontal: scale(10),
            }}
          />

          <Text numberOfLines={2} style={styles.textStyleDesc}>
            {item?.supplier?.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView bounces={false} style={styles.container}>
      <View style={styles.mainView}>
        <Image
          style={styles.profileView}
          source={user?.image ? {uri: user?.image} : IMAGES.appLogo}
        />
        <View style={styles.overlay} />

        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate('ProfileEditScreen', {user: user});
          }}
          style={styles.profileView2}>
          <Text style={styles.profileText}>{'Editar perfil'}</Text>
        </TouchableOpacity>
        <View style={styles.nameView}>
          <Text numberOfLines={1} style={styles.nameText}>
            {`${user?.firstName || ''} ${user?.lastName || ''}`}
          </Text>
          <Text numberOfLines={1} style={styles.descText}>
            {user?.bio}
          </Text>
        </View>
      </View>
      <View style={styles.secondView}>
        <View style={[styles.subview2, {}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={IMAGES.emailIcon}
              style={{
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text
              numberOfLines={2}
              style={[styles.emailText, {width: scale(150)}]}>
              {user?.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: scale(100),
              marginLeft: scale(20),
            }}>
            <Image
              source={IMAGES.birthday}
              style={{
                height: scale(17),
                width: scale(17),
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text style={[styles.emailText]}>
              {moment(user?.dob).format('DD-MMM-YYYY')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(10),
            marginLeft: scale(20),
            alignItems: 'center',
          }}>
          <Image
            source={IMAGES.location}
            style={{height: scale(15), width: scale(12), alignSelf: 'center'}}
          />
          <Text numberOfLines={1} style={styles.emailText}>
            {user?.location}
          </Text>
        </View>
        <View style={{marginTop: scale(10)}}>
          <Text style={styles.headerText}>{'Descuentos Guardados'}</Text>
          <FlatList
            data={bannerData}
            renderItem={bannerDatarenderItem}
            bounces={false}
            horizontal
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    height: scale(40),
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderRadius: scale(12),
                    alignItems: 'center',
                    marginLeft: scale(8),
                    width: CONSTANTS.screenWidth - 40,
                    backgroundColor: COLORS.yellow,
                  }}>
                  <Text style={[styles.nodatafound]}>
                    {'No se encontró ningún descuento guardado'}
                  </Text>
                </View>
              );
            }}
            contentContainerStyle={styles.contentContainerStyle2}
            style={{flexDirection: 'row'}}
          />
        </View>

        <View style={{flex: 1, marginBottom: 40}}>
          <Text style={styles.headerText}>{'Proveedores Guardados'}</Text>
          <FlatList
            data={supplierData}
            scrollEnabled
            horizontal
            renderItem={supplierDatarenderItem}
            showsHorizontalScrollIndicator={false}
            style={{flexDirection: 'row'}}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    height: scale(40),
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderRadius: scale(12),
                    alignItems: 'center',
                    marginLeft: scale(8),
                    width: CONSTANTS.screenWidth - 40,
                    backgroundColor: COLORS.yellow,
                  }}>
                  <Text style={[styles.nodatafound]}>
                    {'No se encontró ningún proveedor guardado'}
                  </Text>
                </View>
              );
            }}
            contentContainerStyle={styles.contentContainerStyle3}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240,240,240)',
  },
  emailText: {
    paddingHorizontal: scale(8),
    fontSize: scale(12),
    fontWeight: '600',
    alignItems: 'center',
    color: COLORS.black,
    alignSelf: 'center',
    fontFamily: FONTS.GothamMedium,
  },
  contentContainerStyle3: {
    flexDirection: 'row',
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: scale(20),
    padding: scale(10),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 1)', // Your overlay color
    opacity: 0.5, // Adjust opacity as needed
  },
  overlay2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: scale(20),
    backgroundColor: 'rgba(0, 0, 0, 1)', // Your overlay color
    opacity: 0.5, // Adjust opacity as needed
  },
  nodatafound: {
    color: COLORS.white,
    fontSize: scale(14),
    fontWeight: '500',
    padding: scale(10),
  },

  contentContainerStyle: {
    flexDirection: 'row',
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: scale(10),
  },
  subview2: {
    marginTop: scale(20),
    flexDirection: 'row',
    marginHorizontal: scale(20),
    width: '70%',
  },
  secondView: {
    backgroundColor: 'rgb(240,240,240)',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    bottom: scale(60),
    flex: 1,
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileView: {
    height: scale(320),
    width: CONSTANTS.screenWidth,
  },
  profileText: {
    color: COLORS.white,
    fontSize: scale(12),
    fontWeight: '500',
    paddingVertical: scale(5),
    paddingHorizontal: scale(10),
  },
  profileView2: {
    position: 'absolute',
    backgroundColor: COLORS.yellow,
    borderRadius: scale(20),
    alignSelf: 'flex-end',
    bottom: scale(220),
    right: scale(30),
  },
  nameView: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: scale(70),
  },
  nameText: {
    color: COLORS.yellow,
    fontSize: scale(22),
    fontWeight: 'bold',
  },
  descText: {
    color: '#F9F1E4',
    fontSize: scale(14),
    fontFamily: FONTS.GothamMedium,
    fontWeight: '500',
  },
  renderView2: {
    borderRadius: scale(10),
    marginHorizontal: scale(10),
    height: scale(130),
    width: scale(200),
  },
  renderView3: {
    borderRadius: scale(10),
    backgroundColor: COLORS.white,
    marginHorizontal: scale(10),
    alignItems: 'center',
    width: moderateScale(140),
    height: '100%',
    flexDirection: 'column',
  },
  textStyle2: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    color: COLORS.white,
    paddingVertical: scale(5),
  },
  textStyle3: {
    alignSelf: 'center',
    color: COLORS.grey,
    paddingVertical: scale(10),
    textAlign: 'center',
    fontSize: scale(14),
    // width: scale(100),
    fontWeight: '500',
  },
  textStyleDesc: {
    alignSelf: 'center',
    color: COLORS.textColor,
    paddingVertical: scale(3),
    textAlign: 'center',
    fontSize: scale(10),
    fontWeight: '400',
    paddingHorizontal: moderateScale(10),
    paddingVertical: scale(10),
  },
  headerText: {
    fontSize: scale(16),
    fontWeight: '600',
    fontFamily: FONTS.GothamMedium,
    color: '#313131',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  contentContainerStyle2: {
    backgroundColor: 'rgb(240,240,240)',
    padding: scale(10),
  },
  titleName: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: scale(16),
  },
  offerView: {
    position: 'absolute',
    marginTop: '45%',
    alignSelf: 'flex-start',
    marginHorizontal: scale(10),
  },
});
