/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {Rating} from '@kolking/react-native-rating';
import {useIsFocused} from '@react-navigation/native';
import {Buffer} from 'buffer';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-animatable';
import Request from '../api/Request';
import {FONTS, IMAGES} from '../assets';
import {COLORS, CONSTANTS} from '../common';
import {HomeSkeleton} from '../common/CustomSkeleton';
import {moderateScale, scale} from '../common/Scale';
import {showSimpleAlert} from '../utils/CommonUtils';
import NavigationService from '../utils/NavigationService';
import StorageService, {clearAllData} from '../utils/StorageService';
import {hp, wp} from '../utils/constants';
export default function HomeScreen(props) {
  const [arrData, setarrData] = useState([]);
  const [supplierArray, setsupplierArray] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [newsData, setnewsData] = useState([]);
  const [discountData, setdiscountData] = useState([]);
  const [user, setuserData] = useState([]);
  const [, setUserBirthDay] = useState(false);
  const [, setMainPageImage] = useState(null);
  const isFocused = useIsFocused();

  // const [bannerData, setbannerData] = useState([
  //   {
  //     image: IMAGES.discountBanner,
  //     text: 'Newly Launch Panigale V4 SP2',
  //   },
  //   {
  //     image: IMAGES.discountBanner,
  //     text: 'Newly Launch Panigale V4 SP2',
  //   },
  //   {
  //     image: IMAGES.discountBanner,
  //     text: 'Newly Launch Panigale V4 SP2',
  //   },
  //   {
  //     image: IMAGES.discountBanner,
  //     text: 'Newly Launch Panigale V4 SP2',
  //   },
  // ]);
  // const [supplierData, setsupplierData] = useState([
  //   {
  //     title: 'Supplier',
  //     desc: 'This is a text sample',
  //     img: IMAGES.profileEdit,
  //   },
  //   {
  //     title: 'Supplier',
  //     desc: 'This is a text sample',
  //     img: IMAGES.profileEdit,
  //   },
  //   {
  //     title: 'Supplier',
  //     desc: 'This is a text sample',
  //     img: IMAGES.profileEdit,
  //   },
  //   {
  //     title: 'Supplier',
  //     desc: 'This is a text sample',
  //     img: IMAGES.profileEdit,
  //   },
  // ]);
  useEffect(() => {
    async function fetchData() {
      setisLoading(true);
      await getComponentData();
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (isFocused) {
        await getProfileData();
        await getMainPageImage();
      }
    }
    // Call the async function
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const getProfileData = async () => {
    const response = await Request.get('user');
    setuserData(response.data);
    setUserBirthDay(checkUserBirthDay(response.data.dob));
    await StorageService.saveItem(
      StorageService.STORAGE_KEYS.USER_DETAILS,
      response.data,
    );
  };

  const getMainPageImage = async () => {
    const response = await Request.get('mainPageImage/getMainPageImage');
    setMainPageImage(response?.data);
  };

  const checkUserBirthDay = dob => {
    return moment(dob).format('DD/MM') == moment().format('DD/MM');
  };

  useEffect(() => {
    async function fetchData2() {
      setisLoading(true);
      await getComponentData2();
    }
    // Call the async function
    fetchData2();
  }, []);
  useEffect(() => {
    async function fetchData4() {
      getnewsEvent(true);
    }
    fetchData4();
  }, []);
  useEffect(() => {
    async function fetchData5() {
      setisLoading(true);
      await getdiscountData();
    }
    // Call the async function
    fetchData5();
  }, []);
  const getdiscountData = async () => {
    const response = await Request.get('discount');
    if (response) {
      setisLoading(false);

      if (response.code == 200) {
        setdiscountData(response.data.rows);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const getComponentData = async () => {
    const response = await Request.get('component');
    if (response) {
      setisLoading(false);

      if (response.code == 200) {
        setarrData(response.data.rows);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const getComponentData2 = async () => {
    const response = await Request.get('supplier');
    if (response) {
      setisLoading(false);

      if (response.code == 200) {
        setsupplierArray(response.data.rows);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.type == 'Suppliers') {
            props.ontabPress(3);
          } else if (item.type == 'Newsandevent') {
            props.ontabPress(1);
          } else if (item.type == 'Discount') {
            props.ontabPress(2);
          } else {
            props.ontabPress(4);
          }
        }}>
        <View style={styles.renderView}>
          <View
            style={{
              justifyContent: 'center',
              marginTop: scale(20),
              alignItems: 'center',
            }}>
            {item.icon ? (
              <Image
                source={{uri: item.icon}}
                style={{
                  height: scale(35),
                  width: scale(35),
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={IMAGES.appLogo}
                style={{
                  height: scale(35),
                  width: scale(35),
                }}
                resizeMode="contain"
              />
            )}
          </View>
          <Text
            style={[
              styles.textStyle,
              {
                color: '#313131',
                paddingTop: scale(10),
                fontFamily: FONTS.GothamMedium,
              },
            ]}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
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
        }}>
        <View style={styles.renderView2}>
          {item.image ? (
            <Image
              source={{uri: item.image}}
              style={{
                alignSelf: 'center',
                borderRadius: scale(10),
                width: scale(180),
                height: scale(110),
              }}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={{
                alignSelf: 'center',
                borderRadius: scale(10),
                width: scale(180),
                height: scale(100),
              }}
              source={IMAGES.appLogo}
            />
          )}
          <View style={styles.overlay} />
          <Text numberOfLines={1} style={styles.textStyle2}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const newsRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate('EventDetail', {newsevent: item});
        }}>
        <View style={styles.renderView2}>
          {item.image ? (
            <Image
              source={{uri: item.image}}
              style={{
                alignSelf: 'center',
                borderRadius: scale(10),
                width: scale(180),
                height: scale(120),
              }}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={{
                alignSelf: 'center',
                borderRadius: scale(10),
                width: scale(180),
                height: scale(100),
              }}
              source={IMAGES.appLogo}
            />
          )}
          <View style={styles.overlay} />
          <View style={styles.typeView}>
            <Text style={styles.typeText}>{item?.type}</Text>
          </View>
          <Text numberOfLines={1} style={[styles.textStyle2]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const supplierDatarenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.renderView3}
        onPress={() => {
          supplierRedirection(item);
        }}>
        <View style={{}}>
          <Text
            numberOfLines={1}
            style={[styles.textStyle3, {fontWeight: '500'}]}>
            {item.name}
          </Text>
          {item.profile_image ? (
            <Image
              source={{uri: item.profile_image}}
              style={styles.supplierImage}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={styles.supplierImage}
              source={IMAGES.appLogo}
            />
          )}
          <View>
            <Rating
              size={moderateScale(15)}
              readonly
              ratingColor={COLORS.yellow}
              fillColor={COLORS.yellow}
              type={'custom'}
              disabled={true}
              style={{
                marginVertical: scale(8),
              }}
              baseColor={'#F0F0F0'}
              rating={item.average_rating ? item.average_rating : 0}
            />
          </View>
        </View>
        <Text numberOfLines={2} style={styles.textStyle4}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  const supplierRedirection = item => {
    const base64EncodedIdObject = Buffer.from(
      JSON.stringify({
        iv: item?.id?.iv,
        encryptedData: item?.id?.encryptedData,
      }),
    ).toString('base64');

    NavigationService.navigate('SupplierDetails', {
      supplierObj: base64EncodedIdObject,
    });
  };
  const getnewsEvent = async data => {
    setisLoading(true);
    const response = await Request.get('newsandevent');
    if (response) {
      setisLoading(false);

      if (response.code == 200) {
        setnewsData(response.data.rows);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const logoutApi = async () => {
    // NavigationService.navigate('LoginScreen');
    clearAllData(() => {
      NavigationService.navigate('LoginScreen');
    });
    return;
    // setisLoading(true);
    // const response = await Request.get('logout');
    // if (response) {
    //   setisLoading(false);
    //   if (response.code == 200) {
    //     clearAllData(() => {
    //       NavigationService.navigate('LoginScreen');
    //     });
    //   }
    // }
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{flex: 1}}>
          <HomeSkeleton />
        </View>
      ) : (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          bounces={false}>
          <View style={{flex: 1}}>
            <Image
              source={IMAGES.defaultHomeImage}
              resizeMode="stretch"
              style={styles.imageStyle}
            />
            <View style={{position: 'absolute'}}>
              <TouchableOpacity
                onPress={() => {
                  NavigationService.navigate('ProfileScreen');
                }}>
                <Image
                  source={user?.image ? {uri: user?.image} : IMAGES.profileEdit}
                  style={styles.profileEditView}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // NavigationService.navigate('EmergencyContact');
                }}>
                <Image
                  source={IMAGES.notification}
                  style={styles.profileEditView2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    CONSTANTS.AppName,
                    '¿Estás seguro de que quieres cerrar sesión?',
                    [
                      {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'DE ACUERDO', onPress: () => logoutApi()},
                    ],
                  );
                }}>
                <Image source={IMAGES.logoutIcon} style={styles.logoutView} />
              </TouchableOpacity>
            </View>

            <Image
              source={IMAGES.santmariaText}
              resizeMode="stretch"
              style={styles.santText}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginVertical: scale(20),
              marginBottom: scale(70),
            }}>
            <View style={{flex: 1}}>
              <View>
                <FlatList
                  data={arrData}
                  renderItem={renderItem}
                  bounces={false}
                  keyExtractor={(item, index) => `${index}`}
                  scrollEnabled={true}
                  horizontal
                  style={{flexDirection: 'row', flex: 1}}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainerStyle}
                />
              </View>
            </View>
            <View style={{flex: 1, marginVertical: scale(15)}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.headerText}>{'Descuentos Recientes'}</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.ontabPress(2);
                  }}>
                  <Text style={styles.viewAll}>{'Ver todo'}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  data={discountData}
                  renderItem={bannerDatarenderItem}
                  bounces={false}
                  scrollEnabled={true}
                  horizontal
                  keyExtractor={(item, index) => `${index}`}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainerStyle2}
                  style={{flexDirection: 'row', flex: 1}}
                />
              </View>
            </View>
            <View style={{flex: 1}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.headerText}>{'Noticias y Eventos'}</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.ontabPress(1);
                  }}>
                  <Text style={styles.viewAll}>{'Ver todo'}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  data={newsData}
                  renderItem={newsRenderItem}
                  bounces={false}
                  scrollEnabled={true}
                  keyExtractor={(item, index) => `${index}`}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  contentContainerStyle={styles.contentContainerStyle2}
                  style={{flexDirection: 'row', flex: 1}}
                />
              </View>
            </View>

            <View style={{flex: 1, marginVertical: scale(10)}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.headerText}>{'Proveedores'}</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.ontabPress(3);
                  }}>
                  <Text style={styles.viewAll}>{'Ver todo'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: scale(20)}}>
                <FlatList
                  data={supplierArray}
                  scrollEnabled
                  horizontal
                  renderItem={supplierDatarenderItem}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => `${index}`}
                  style={{flexDirection: 'row'}}
                  // eslint-disable-next-line react/no-unstable-nested-components
                  ListEmptyComponent={() => {
                    return (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          marginLeft: scale(70),
                        }}>
                        <Text
                          style={{
                            color: COLORS.yellow,
                            fontSize: scale(16),
                            fontWeight: '500',
                            alignSelf: 'center',
                            textAlign: 'center',
                          }}>
                          {'No se encontró ningún proveedor'}
                        </Text>
                      </View>
                    );
                  }}
                  contentContainerStyle={styles.contentContainerStyle3}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240,240,240)',
    justifyContent: 'center',
  },
  typeView: {
    backgroundColor: COLORS.yellow,
    borderRadius: scale(20),
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    top: scale(10),
    right: scale(10),
    width: scale(70),
    height: scale(20),
    position: 'absolute',
  },
  typeText: {
    fontSize: scale(10),
    color: COLORS.white,
    fontFamily: FONTS.GotamBold,
    textAlign: 'center',
    paddingHorizontal: scale(10),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: scale(10),
    backgroundColor: 'rgba(0, 0, 0, 1)', // Your overlay color
    opacity: 0.5, // Adjust opacity as needed
  },
  contentContainer: {
    flex: 1,
    padding: scale(20),
    backgroundColor: COLORS.white,
    position: 'absolute',
  },
  imageStyle: {
    height: hp(55),
    width: CONSTANTS.screenWidth,
  },
  headerText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: COLORS.grey,
    fontFamily: FONTS.GothamMedium,
    paddingHorizontal: scale(20),
  },
  textStyle2: {
    position: 'absolute',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    fontSize: scale(12),
    fontFamily: FONTS.GothamMedium,
    color: COLORS.white,
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
  },
  textStyle3: {
    alignSelf: 'center',
    fontFamily: FONTS.GotamBold,
    color: '#313131',

    paddingVertical: scale(10),
    textAlign: 'center',
    fontSize: scale(14),
    fontWeight: '500',
  },
  textStyle4: {
    color: COLORS.textColor,
    fontSize: scale(10),
    fontWeight: '400',
    paddingTop: scale(5),
    paddingHorizontal: moderateScale(10),
  },
  textStyle: {
    textAlign: 'center',
    fontSize: scale(12),
    // fontWeight: '600',
    paddingVertical: scale(5),
    alignSelf: 'center',
  },
  contentContainerStyle: {
    flexDirection: 'row',
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: scale(10),
  },
  contentContainerStyle2: {
    flexDirection: 'row',
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: scale(20),
    padding: scale(10),
  },
  contentContainerStyle3: {
    flexDirection: 'row',
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: scale(20),
    padding: scale(10),
  },
  profileEditView: {
    position: 'absolute',
    margin: scale(40),
    marginTop: scale(50),
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
  },
  renderView: {
    borderRadius: scale(10),
    backgroundColor: COLORS.white,
    marginHorizontal: scale(10),
    width: scale(100),
    height: scale(120),
  },
  renderView2: {
    justifyContent: 'flex-end',
    marginHorizontal: scale(10),

    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: COLORS.yellow,
  },
  newsRender: {
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
  },
  renderView3: {
    borderRadius: scale(10),
    backgroundColor: COLORS.white,
    marginHorizontal: scale(10),
    alignItems: 'center',
    width: moderateScale(140),
    height: scale(170),
    flexDirection: 'column',
  },
  profileEditView2: {
    position: 'absolute',
    margin: scale(40),
    marginTop: scale(50),
    alignSelf: 'flex-end',
    left: scale(250),
  },
  logoutView: {
    position: 'absolute',
    height: scale(20),
    width: scale(20),
    marginTop: scale(50),
    alignSelf: 'center',
    left: scale(320),
  },
  santText: {
    width: wp(80),
    position: 'absolute',
    alignSelf: 'center',
    top: hp(15),
  },
  profileImage: {
    alignSelf: 'center',
    borderRadius: scale(10),
    width: scale(100),
    height: scale(40),
  },
  supplierImage: {
    alignSelf: 'center',
    borderRadius: scale(10),
    width: scale(40),
    height: scale(40),
  },
  viewAll: {
    color: COLORS.yellow,
    paddingHorizontal: scale(10),
    fontSize: scale(11),
    fontFamily: FONTS.GothamMedium,
  },
});
