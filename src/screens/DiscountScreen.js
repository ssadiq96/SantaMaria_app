/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {Buffer} from 'buffer';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Request from '../api/Request';
import {FONTS, IMAGES} from '../assets';
import {COLORS, CONSTANTS} from '../common';
import {DiscountSkeleton} from '../common/CustomSkeleton';
import {moderateScale, scale} from '../common/Scale';
import {showSimpleAlert} from '../utils/CommonUtils';
import NavigationService from '../utils/NavigationService';
import {clearAllData} from '../utils/StorageService';

export default function DiscountScreen({route, navigation}) {
  const [searchValue, setSearchValue] = useState('');
  const [discountData, setDiscountData] = useState([]);
  const [discountCategory, setDiscountCategory] = useState([]);
  const [activeDiscountCategory, setActiveDiscountCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await getDiscountData();
    }
    fetchData();
  }, []);
  const getDiscountData = async () => {
    let response = await Request.get('discount');
    if (response) {
      setIsLoading(false);
      if (response.code == 200) {
        response = response.data.rows.map((row, index) => {
          row.testCategory = `${row.title}`;
          return row;
        });
        setDiscountCategory(response.map(item => item.testCategory));
        setDiscountData(response);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const navigateDiscountDetailPage = item => {
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

  const onWishListSave = async item => {
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
        getDiscountData();
      } else {
        showSimpleAlert(response.message);
      }
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigateDiscountDetailPage(item);
        }}
        style={{borderRadius: scale(12), marginBottom: scale(10)}}>
        <View style={styles.renderView}>
          {item.image ? (
            <Image
              resizeMode="cover"
              source={{uri: item.image}}
              style={styles.discountImage}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={[
                styles.discountImage,
                {
                  height: scale(120),
                  width: scale(140),
                  alignSelf: 'center',
                  backgroundColor: COLORS.white,
                },
              ]}
              source={IMAGES.appLogo}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              onWishListSave(item);
            }}
            style={styles.wishListView}>
            <View style={styles.savedImage}>
              <Image
                source={
                  item?.isWishlist == true ? IMAGES.unsaved : IMAGES.saved
                }
                resizeMode="contain"
                style={{}}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.profileView}>
            <View style={styles.profileImage}>
              {item.company.profile_image ? (
                <Image
                  source={{uri: item.company.profile_image}}
                  style={styles.companyProfileImage}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  style={styles.companyProfileImage}
                  source={IMAGES.appLogo}
                />
              )}
              {/* <Image source={{uri: item.company.profile_image}} /> */}
            </View>
            {/* <Text numberOfLines={1} style={styles.ambulanceText}> */}
            {/* {item.name} */}
            {/* </Text> */}
          </View>
          {/* <Image source={{uri: item.company.profile_image}} /> */}
          <View style={styles.bottomView}>
            <Text numberOfLines={1} style={styles.titleText}>
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const searchData = useMemo(() => {
    return async searchText => {
      try {
        setIsLoading(true);
        let response = await Request.get(`discount?search=${searchText}`);
        if (response) {
          setIsLoading(false);
          if (response.code == 200) {
            response = response.data.rows.map((row, index) => {
              row.testCategory = `${row.title}`;
              return row;
            });
            setDiscountCategory(response.map(item => item.testCategory));
            setDiscountData(response);
          } else {
            showSimpleAlert(response.message);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  }, []); // Empty dependency array means this memoized function won't change

  const handleSearchChange = text => {
    setSearchValue(text);
    searchData(text); // Call the memoized API function when search text changes
  };
  const logoutApi = async () => {
    // NavigationService.navigate('LoginScreen');
    setIsLoading(true);
    const response = await Request.get('logout');
    if (response) {
      setIsLoading(false);
      if (response.code == 200) {
        clearAllData(() => {
          NavigationService.navigate('LoginScreen');
        });
      }
    }
  };

  const categoryListHeaderComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setActiveDiscountCategory('all');
        }}>
        <View
          style={[
            styles.categoryView,
            activeDiscountCategory === 'all'
              ? {}
              : {
                  backgroundColor: COLORS.transparent,
                },
          ]}>
          <Text
            numberOfLines={1}
            style={[
              styles.category,
              activeDiscountCategory === 'all'
                ? {}
                : {
                    color: COLORS.yellow,
                  },
            ]}>
            All
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setActiveDiscountCategory(item);
        }}>
        <View
          style={[
            styles.categoryView,
            activeDiscountCategory === item
              ? {}
              : {
                  backgroundColor: COLORS.transparent,
                },
          ]}>
          <Text
            numberOfLines={1}
            style={[
              styles.category,
              activeDiscountCategory === item
                ? {}
                : {
                    color: COLORS.yellow,
                  },
            ]}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <Image source={IMAGES.discountIcon} style={styles.imageView} />
          <Text style={styles.headerText}>Descuentos</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              // NavigationService.navigate('EmergencyContact');
            }}>
            <View style={styles.subContainer}>
              <Image source={IMAGES.notification} tintColor={COLORS.black} />
            </View>
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
      </View>
      <View
        style={{
          height: scale(45),
          marginTop: scale(20),
          justifyContent: 'center',
        }}>
        <Image source={IMAGES.searchIcon} style={styles.searchIconView} />
        <TextInput
          value={searchValue}
          placeholder="Buscar en Descuentos"
          placeholderTextColor={COLORS.textColor}
          onChangeText={handleSearchChange}
          style={styles.textInput}
        />
      </View>

      {isLoading ? (
        <DiscountSkeleton />
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.categoryListContainer}>
            <FlatList
              data={discountCategory}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={categoryListHeaderComponent}
              renderItem={renderCategoryList}
              keyExtractor={(item, index) => `${index}`}
              horizontal
            />
          </View>
          <View style={{flex: 1}}>
            <FlatList
              data={
                activeDiscountCategory !== 'all'
                  ? discountData.filter(
                      item => item.testCategory === activeDiscountCategory,
                    )
                  : discountData
              }
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${index}`}
              style={{marginBottom: scale(80)}}
              numColumns={2}
            />
          </View>
        </View>
      )}
      {/* <ActivityLoader loading={isLoading} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240,240,240)',
  },
  logoutView: {
    height: scale(20),
    width: scale(20),
    marginLeft: scale(10),
    tintColor: COLORS.black,
  },
  categoryListContainer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: scale(55),
    marginHorizontal: scale(10),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  categoryView: {
    backgroundColor: COLORS.yellow,
    alignSelf: 'flex-start',
    // alignSelf: 'center',
    marginHorizontal: scale(5),
    // width: scale(150),
    paddingHorizontal: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
  },
  category: {
    color: COLORS.white,
    fontSize: scale(12),
    minWidth: scale(38),
    fontFamily: FONTS.GothamMedium,
    letterSpacing: 0.4,
    paddingVertical: scale(6),
    textAlign: 'center',
  },
  renderView: {
    borderRadius: scale(12),
    height: scale(180),
    width: scale(145),
    marginLeft: scale(15),
    marginHorizontal: scale(10),
  },
  wishListView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingTop: '10%',
    width: scale(50),
    height: scale(50),
  },
  savedImage: {
    position: 'absolute',
    alignSelf: 'flex-end',
    borderRadius: scale(10),
    marginVertical: scale(15),
    marginHorizontal: scale(10),
    right: scale(5),
  },
  profileImage: {
    height: scale(40),
    width: scale(40),
    alignSelf: 'center',
    borderRadius: scale(20),
  },
  companyProfileImage: {
    alignSelf: 'center',
    borderRadius: scale(50),
    width: scale(40),
    height: scale(40),
  },
  profileView: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: '60%',
  },
  bottomView: {
    borderBottomStartRadius: scale(12),
    borderBottomEndRadius: scale(12),
    backgroundColor: COLORS.yellow,
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#F9F1E4',
    fontWeight: '500',
    fontFamily: FONTS.GotamBold,
    fontSize: moderateScale(14),
  },
  searchIcon: {
    position: 'absolute',
    top: scale(32),
    left: scale(30),
    zIndex: 1,
  },
  iconView: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(50),
    marginHorizontal: scale(22),
  },
  textInput: {
    height: scale(45),
    width: scale(322),
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    fontSize: scale(12),
    color: COLORS.textColor,
    fontFamily: FONTS.GothamMedium,
    alignItems: 'center',
    paddingLeft: scale(35),
    borderRadius: scale(40),
    marginVertical: scale(20),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descText: {
    color: COLORS.textColor,
    paddingVertical: scale(5),
    letterSpacing: 0.2,
  },
  searchIconView: {
    position: 'absolute',
    // top: scale(32),
    left: scale(30),
    zIndex: 1,
  },
  headerText: {
    fontSize: scale(20),
    textAlign: 'center',
    fontWeight: '600',
    color: COLORS.black,
    paddingHorizontal: scale(10),
  },
  imageView: {
    tintColor: COLORS.black,
    resizeMode: 'contain',
    height: scale(25),
    width: scale(25),
  },
  discountImage: {
    height: scale(140),
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    width: scale(145),
  },
});
