/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  // FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS, IMAGES} from '../assets';
import {COLORS, CONSTANTS} from '../common';
import {moderateScale, scale} from '../common/Scale';
import globalStyles from '../res/globalStyles';
// import {Rating} from 'react-native-ratings';
import {Rating} from '@kolking/react-native-rating';
import Request from '../api/Request';
import {showSimpleAlert} from '../utils/CommonUtils';

export default function SupplierDetails({route, navigation}) {
  const [, setisLoading] = useState(false);
  const [service, setservice] = useState([]);
  const [supplierDetails, setsupplierDetails] = useState([]);
  const [userRate, setuserRate] = useState(0);
  const [comment, setcomment] = useState('');
  const [supplierRating, setsupplierRating] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setisLoading(true);
      await getComponentData();
    }
    // Call the async function
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getComponentData = async () => {
    const encodedString = route?.params?.supplierObj;
    // console.log('encodedString', encodedString);
    const response = await Request.get(`supplier/${encodedString}`);
    if (response) {
      setisLoading(false);
      // console.log('getComponentDataresponser123', response);
      if (response.code == 200) {
        setsupplierDetails(response.data);
        setservice(response.data.services);
        setsupplierRating(response.data.supplier_ratings);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const renderItem1 = ({item}) => {
    return (
      <View
        style={[
          styles.renderItem1_parentView,
          {height: scale(140), width: CONSTANTS.screenWidth - 120},
        ]}>
        <View>
          <Image
            resizeMode="contain"
            source={item.image ? {uri: item.image} : IMAGES.appLogo}
            style={styles.renderItem1_img}
          />
          <View style={[styles.overlay2, {height: moderateScale(330)}]} />
        </View>
        <View style={styles.renderItem1_view2}>
          <Text numberOfLines={2} style={styles.renderItem1_text3}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };
  const ratingrenderItem = ({item}) => {
    // console.log('ratingrenderItemitem', item);
    return (
      <View style={{marginVertical: scale(10)}}>
        <View style={{flexDirection: 'row', marginHorizontal: scale(10)}}>
          <Text style={styles.username}>{item.username}</Text>
          <Rating
            size={moderateScale(18)}
            disabled
            rating={item.rate}
            touchColor={COLORS.yellow}
            fillColor={COLORS.yellow}
            type={'custom'}
            style={{
              alignSelf: 'flex-start',
              marginHorizontal: scale(10),
            }}
          />
        </View>
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            marginHorizontal: scale(10),
            borderRadius: scale(10),
            padding: scale(10),
            borderColor: COLORS.gray,
            marginTop: scale(10),
            backgroundColor: COLORS.whiteShade4,
          }}>
          <Text>{item.comment}</Text>
        </View>
      </View>
    );
  };
  const submitReview = async () => {
    if (!comment) {
      showSimpleAlert('Por favor ingrese comentario');
    } else {
      const encodedString = route?.params?.supplierObj;
      let params = {
        supplierId: encodedString,
        rate: userRate,
        comment: comment,
      };
      const response = await Request.post('supplier/giveFeedback', params);
      // console.log('responseresponse', response);

      if (response.code == 200) {
        setcomment('');
        await getComponentData();

        showSimpleAlert(response.message);

        setuserRate(0);
      }
    }
  };
  const addwishlist = async () => {
    const encodedString = route?.params?.supplierObj;
    // console.log('encodedString', encodedString);
    let params = {
      category: 'Supplier',
      typeId: encodedString,
    };
    const response = await Request.post('wishlist', params);
    if (response) {
      setisLoading(false);
      // console.log('responser123', response);
      if (response.code == 200) {
        getComponentData();
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  return (
    <View style={[globalStyles.container, {}]}>
      <View style={styles.supplierView}>
        <Image
          style={styles.suppliercoverImage}
          source={
            supplierDetails?.cover_image
              ? {uri: supplierDetails?.cover_image}
              : IMAGES.appLogo
          }
          resizeMode="contain"
        />
        <View style={styles.overlay} />
        <View style={styles.subView}>
          <View style={styles.backIconView}>
            <TouchableOpacity
              style={styles.backView}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={IMAGES.backIcon} style={styles.backIconStyle} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                addwishlist();
              }}
              style={{alignSelf: 'flex-end', marginHorizontal: scale(20)}}>
              <Image
                source={
                  supplierDetails.isWishlist ? IMAGES.unsaved : IMAGES.saved
                }
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: scale(15),
              marginTop: '1%',
            }}>
            <Image
              style={styles.supplierProfileImage}
              source={
                supplierDetails?.profile_image
                  ? {uri: supplierDetails?.profile_image}
                  : IMAGES.appLogo
              }
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={[styles.headerView, {width: '85%'}]}>
                  <Text
                    numberOfLines={1}
                    style={[styles.titleText, {alignItems: 'center'}]}>
                    {supplierDetails?.name}
                  </Text>
                </View>
              </View>
              <Rating
                size={moderateScale(15)}
                ratingColor={COLORS.yellow}
                fillColor={COLORS.yellow}
                type={'custom'}
                disabled={true}
                baseColor={COLORS.white}
                rating={supplierDetails?.average_rating}
                style={{alignSelf: 'center', right: scale(40)}}
              />
              {/* #313131 */}
            </View>
            <View style={styles.phoneview}>
              <Image
                source={IMAGES.phone}
                style={{
                  height: scale(20),
                  width: scale(20),
                  resizeMode: 'contain',
                }}
              />
              <Text style={styles.phoneText}>
                {supplierDetails?.contact_no}
              </Text>
            </View>
            <Text numberOfLines={3} style={styles.phoneText}>
              {supplierDetails?.description}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        bounces={false}
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <View>
          <Text style={styles.supplierText}>{'Servicios que brindamos'}</Text>
          <View style={{flex: 1}}>
            <FlatList
              data={service}
              renderItem={renderItem1}
              keyExtractor={(item, index) => index}
              horizontal
              // eslint-disable-next-line react/no-unstable-nested-components
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      // height: scale(40),
                      alignSelf: 'center',
                      justifyContent: 'center',
                      borderRadius: scale(12),
                      marginHorizontal: scale(20),
                      backgroundColor: COLORS.yellow,
                      marginVertical: scale(10),
                    }}>
                    <Text
                      style={[
                        styles.nodatafound,
                        {paddingHorizontal: scale(50)},
                      ]}>
                      {'No se encontró ningún servicio'}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>
            {'Califica tu experiencia con el proveedor'}
          </Text>
          <View style={styles.ratingView2}>
            <Rating
              size={moderateScale(20)}
              ratingColor={COLORS.yellow}
              fillColor={COLORS.yellow}
              type={'custom'}
              onChange={data => {
                // console.log('data', Math.round(data));
                setuserRate(Math.round((data + userRate) * 5) / 10);
              }}
              onMove={data => {
                setuserRate(data);
              }}
              maxRating={5}
              touchColor={COLORS.yellow}
              disabled={false}
              rating={userRate}
              style={{alignSelf: 'center'}}
            />
            <TouchableOpacity
              onPress={() => {
                submitReview();
              }}
              style={{
                backgroundColor: COLORS.yellow,
                borderRadius: scale(20),
              }}>
              <Text style={styles.submitText}>{'Enviar'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textinputView}>
            <TextInput
              placeholder={'Deja tus comentarios*'}
              placeholderTextColor={COLORS.textColor}
              multiline={true}
              value={comment}
              onChangeText={text => {
                setcomment(text);
              }}
              style={{
                alignSelf: 'flex-start',
                fontSize: scale(14),
                fontWeight: '300',
                color: COLORS.black,
              }}
            />
          </View>
          <Text style={[styles.ratingText]}>{'Calificaciones'}</Text>
          <FlatList
            style={{flex: 1}}
            data={supplierRating}
            renderItem={ratingrenderItem}
            // eslint-disable-next-line react/no-unstable-nested-components
            ListEmptyComponent={() => {
              return (
                <View style={styles.nodataView}>
                  <Text style={styles.nodatafound}>
                    {'No se encontró ninguna calificación'}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
    // <ActivityLoader loading={isLoading} />
  );
}
const styles = StyleSheet.create({
  backIconStyle: {
    height: scale(30),
    width: scale(30),
    marginHorizontal: scale(20),
    marginTop: scale(10),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    // borderBottomLeftRadius: scale(40),
    // borderBottomRightRadius: scale(40),
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 1)', // Your overlay color
    opacity: 0.5, // Adjust opacity as needed
  },
  overlay2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    // borderBottomLeftRadius: scale(40),
    // borderBottomRightRadius: scale(40),
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 1)', // Your overlay color
    opacity: 0.5, // Adjust opacity as needed
  },
  backIconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(30),
  },
  profileView: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: scale(120),
  },
  renderView: {
    borderRadius: scale(15),
    marginHorizontal: scale(12),
    width: scale(150),
  },
  subView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  backView: {
    alignSelf: 'flex-start',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scale(2),
  },

  titleText: {
    color: '#F9F1E4',
    fontSize: scale(24),
    fontWeight: '600',
    fontFamily: FONTS.GotamBold,
  },
  numberText: {
    color: '#F9F1E4',
    fontSize: scale(16),
    fontWeight: '600',
    fontFamily: FONTS.GotamBold,
  },

  bottomView: {
    borderBottomStartRadius: scale(20),
    borderBottomEndRadius: scale(20),
    backgroundColor: COLORS.yellow,
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ambulanceText: {
    color: '#F9F1E4',
    fontSize: scale(14),
    fontWeight: '700',
    paddingTop: scale(6),
  },
  renderItem1_parentView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: scale(10),
    marginVertical: scale(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.yellow,
    borderRadius: scale(20),
  },
  renderItem1_view2: {
    width: scale(250),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    paddingTop: scale(185),
  },
  renderItem1_img: {
    width: CONSTANTS.screenWidth - 120,
    height: moderateScale(330),
    borderRadius: scale(20),
    resizeMode: 'contain',
  },
  supplierProfileImage: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
    borderWidth: 1,
    borderColor: COLORS.yellow,
  },
  renderItem1_text3: {
    color: COLORS.white,
    fontSize: scale(14),
    textAlign: 'left',
    fontWeight: '500',
    paddingHorizontal: scale(25),
  },
  supplierText: {
    color: '#313131',
    fontSize: scale(16),
    fontFamily: FONTS.GotamBold,
    marginHorizontal: scale(20),
    paddingTop: scale(15),
  },
  ratingView: {
    marginHorizontal: scale(20),
    flex: 1,
  },
  ratingText: {
    fontSize: scale(16),
    padding: scale(10),
    paddingTop: scale(20),
    fontFamily: FONTS.GothamMedium,
    color: '#313131',
  },
  textinputView: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginTop: scale(10),
    height: scale(120),
    borderRadius: scale(20),
    width: CONSTANTS.screenWidth - 50,
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.gray,
    padding: scale(2),
    paddingHorizontal: scale(10),
  },
  submitText: {
    paddingVertical: scale(8),
    color: COLORS.white,
    fontSize: scale(13),
    fontWeight: '700',
    paddingHorizontal: scale(20),
  },
  ratingView2: {
    marginTop: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    color: COLORS.black,
    fontSize: scale(14),
    fontWeight: '600',
  },
  suppliercoverImage: {
    height: scale(280),
    width: CONSTANTS.screenWidth,
    // borderBottomLeftRadius: scale(40),
    // borderBottomRightRadius: scale(40),
  },
  supplierView: {
    height: scale(280),
    // borderBottomLeftRadius: scale(40),
    // borderBottomRightRadius: scale(40),
    width: CONSTANTS.screenWidth,
  },
  phoneview: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '40%',
  },
  phoneText: {
    color: COLORS.white,
    fontSize: scale(14),
    paddingVertical: scale(3),
    paddingHorizontal: scale(4),
  },
  nodatafound: {
    color: COLORS.white,
    fontSize: scale(14),
    fontWeight: '500',
    padding: scale(10),
  },
  nodataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(12),
    marginVertical: scale(10),
    backgroundColor: COLORS.yellow,
  },
});
