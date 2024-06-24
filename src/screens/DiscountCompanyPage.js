/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {Buffer} from 'buffer';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Request from '../api/Request';
import {FONTS, IMAGES} from '../assets';
import {COLORS, CONSTANTS} from '../common';
import {SupplierDetailSkeleton} from '../common/CustomSkeleton';
import {scale, verticalScale} from '../common/Scale';
import globalStyles from '../res/globalStyles';
import {showSimpleAlert} from '../utils/CommonUtils';

function DiscountCompanyPage({route, navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [discountArray, setDiscountArray] = useState([]);
  const [discountCoverData, setDiscountCoverData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getDiscountDetails();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getDiscountCoverData = async data => {
    setIsLoading(true);
    const base64EncodedIdObject = Buffer.from(
      JSON.stringify({
        iv: data?.company?.id?.iv,
        encryptedData: data?.company?.id?.encryptedData,
      }),
    ).toString('base64');
    const response = await Request.get(`company/${base64EncodedIdObject}`);
    if (response) {
      setIsLoading(false);
      if (response.code == 200) {
        setDiscountCoverData(response.data);
        setDiscountArray(response.data.discounts);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const getDiscountDetails = async () => {
    setIsLoading(true);
    const encodedString = route?.params?.discountobj;

    const response = await Request.get(`discount/${encodedString}`);
    if (response) {
      setIsLoading(false);
      if (response.code == 200) {
        await getDiscountCoverData(response.data);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };

  const applysave = async item => {
    const base64EncodedIdObject = Buffer.from(
      JSON.stringify({
        iv: item?.id?.iv,
        encryptedData: item?.id?.encryptedData,
      }),
    ).toString('base64');
    let params = {
      category: 'Discount',
      typeId: base64EncodedIdObject,
    };
    const response = await Request.post('wishlist', params);
    if (response) {
      setIsLoading(false);
      if (response.code == 200) {
        getDiscountDetails();
      } else {
        showSimpleAlert(response.message);
      }
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderView}>
        <Image
          style={styles.discountImage}
          source={item.image ? {uri: item.image} : IMAGES.appLogo}
        />

        <View
          style={{
            position: 'absolute',
            justifyContent: 'space-between',
          }}>
          <View style={styles.overlay2} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: scale(10),
            }}>
            <View style={{}}>
              <View style={styles.validDateView}>
                <Text numberOfLines={1} style={styles.validDate}>
                  Desde:
                  {moment(
                    item?.valid_from ||
                      moment(item?.valid_till).subtract(1, 'day') ||
                      moment(),
                  ).format('DD MMM')}
                </Text>
              </View>
              <View style={styles.validDateView}>
                <Text numberOfLines={1} style={styles.validDate}>
                  Hasta:{' '}
                  {moment(
                    item?.valid_till ||
                      moment(item?.valid_from).add(1, 'day') ||
                      moment(),
                  ).format('DD MMM')}
                </Text>
              </View>
            </View>
            <View style={{}}>
              <TouchableOpacity
                onPress={() => {
                  applysave(item);
                }}
                style={styles.savedImage}>
                <Image
                  source={
                    item?.isWishlist == true ? IMAGES.unsaved : IMAGES.saved
                  }
                  resizeMode="contain"
                  style={{}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomView}>
            <View style={styles.titleTextView}>
              <Text numberOfLines={2} style={styles.titleText2}>
                {item?.title}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={globalStyles.container}>
      {isLoading ? (
        <SupplierDetailSkeleton />
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.coverView}>
            <Image
              style={styles.imageView}
              source={{uri: discountCoverData.cover_image}}
            />
            <View
              style={{
                position: 'absolute',
              }}>
              <View style={styles.overlay} />

              <View style={styles.topView}>
                <View>
                  <TouchableOpacity
                    style={styles.backView}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Image
                      source={IMAGES.backIcon}
                      style={styles.backIconStyle}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginRight: scale(25)}}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={[styles.phoneView]}
                      onPress={() => {
                        let phoneNumberFormatted = `tel:${discountCoverData?.contact_no}`;
                        Linking.openURL(phoneNumberFormatted).catch(err =>
                          console.error('Error opening dialer', err),
                        );
                      }}>
                      <Image
                        style={{
                          height: scale(20),
                          width: scale(20),
                          resizeMode: 'contain',
                        }}
                        source={IMAGES.phone}
                      />
                      <Text style={styles.socialText}>
                        {discountCoverData?.contact_no}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(discountCoverData?.instagram_url);
                      }}
                      style={[styles.socialContainer]}>
                      <Image
                        style={styles.instagramImage}
                        source={IMAGES.instagram}
                      />
                      <Text style={styles.socialText}>{'Instagram'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.subView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={
                      discountCoverData?.profile_image
                        ? {uri: discountCoverData?.profile_image}
                        : IMAGES.appLogo
                    }
                    style={styles.profileImage}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(discountCoverData?.location);
                    }}
                    style={styles.directionView}>
                    <Text style={styles.directionText}>{'Dirección'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.nameView}>
                  <Text numberOfLines={2} style={styles.titleText}>
                    {discountCoverData?.name}
                  </Text>
                </View>
                <Text numberOfLines={2} style={styles.descText}>
                  {discountCoverData?.bio}
                </Text>
              </View>
            </View>
          </View>
          <FlatList
            data={discountArray}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            style={{marginVertical: scale(20)}}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  backIconStyle: {
    height: scale(30),
    width: scale(30),
    marginHorizontal: scale(20),
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  subView: {
    marginHorizontal: scale(20),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: verticalScale(62),
  },
  backView: {
    alignSelf: 'flex-start',
  },
  renderView: {
    marginHorizontal: scale(20),
    marginVertical: scale(4),
    height: scale(170),
    borderRadius: scale(20),
    width: '100%',
  },
  socialText: {
    color: COLORS.white,
    fontSize: scale(14),
    paddingVertical: scale(5),
    paddingRight: scale(8),
    fontFamily: FONTS.GothamLight,
  },
  socialContainer: {
    backgroundColor: COLORS.yellow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(20),
    marginRight: scale(10),
    paddingHorizontal: scale(10),
  },
  instagramImage: {
    height: scale(15),
    width: scale(15),
    resizeMode: 'contain',
    tintColor: COLORS.white,
    alignSelf: 'center',
  },
  titleText: {
    color: COLORS.white,
    fontSize: scale(18),
    fontFamily: FONTS.GotamBold,
  },
  titleText2: {
    color: COLORS.white,
    fontSize: scale(20),
    fontFamily: FONTS.GothamMedium,
  },
  descText: {
    color: COLORS.white,
    fontSize: scale(12),
    fontFamily: FONTS.GothamLight,
    paddingTop: scale(10),
  },
  directionView: {
    backgroundColor: COLORS.yellow,
    borderRadius: scale(20),
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginLeft: scale(130),
    marginHorizontal: scale(15),
  },
  directionText: {
    color: COLORS.white,
    fontSize: scale(13),
    fontWeight: '500',
    paddingHorizontal: scale(30),
    paddingVertical: scale(6),
    textAlign: 'center',
    fontFamily: FONTS.GotamBold,
  },
  validDate: {
    color: COLORS.white,
    fontSize: scale(12),
    fontFamily: FONTS.GothamLight,
    letterSpacing: 0.4,
    paddingVertical: scale(6),
    textAlign: 'center',
  },
  savedImage: {
    alignSelf: 'flex-end',
    borderRadius: scale(20),
    marginHorizontal: scale(10),
    right: scale(5),
  },
  validDateView: {
    backgroundColor: COLORS.yellow,
    alignSelf: 'flex-start',
    marginHorizontal: scale(10),
    width: scale(185),
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    marginBottom: scale(5),
  },
  titleTextView: {
    textAlign: 'left',
    alignItems: 'center',
    marginHorizontal: scale(10),
  },
  bottomView: {
    flexDirection: 'row',
    width: CONSTANTS.screenWidth - 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(40),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(300),
    backgroundColor: 'rgba(0, 0, 0, 1)',
    opacity: 0.3, // Adjust opacity as needed
  },
  overlay2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: scale(170),
    left: 0,
    right: 0,
    borderRadius: scale(20),
    backgroundColor: 'rgba(0, 0, 0, 1)', // Your overlay color
    opacity: 0.5, // Adjust opacity as needed
  },
  discountImage: {
    height: scale(170),
    width: CONSTANTS.screenWidth - 40,
    borderRadius: scale(20),
  },
  profileImage: {
    height: scale(60),
    width: scale(60),
    borderRadius: scale(30),
  },
  imageView: {
    height: verticalScale(300),
    width: CONSTANTS.screenWidth,
  },
  coverView: {
    height: verticalScale(300),
    width: CONSTANTS.screenWidth,
    position: 'relative',
  },

  phoneView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(8),
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
    width: CONSTANTS.screenWidth - 40,
  },
});

export default DiscountCompanyPage;
