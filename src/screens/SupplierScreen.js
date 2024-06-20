/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {Rating} from '@kolking/react-native-rating';
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
import {SupplierSkeleton} from '../common/CustomSkeleton';
import {moderateScale, scale} from '../common/Scale';
import {showSimpleAlert} from '../utils/CommonUtils';
import NavigationService from '../utils/NavigationService';
import {clearAllData} from '../utils/StorageService';

export default function SupplierScreen() {
  const [searchValue, setSearchValue] = useState('');
  const [supplierData, setSupplierData] = useState([]);
  const [supplierCategory, setSupplierCategory] = useState([]);
  const [activeSupplierCategory, setActiveSupplierCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await getCategoryData();
      let response = await Request.get('supplier');
      if (response) {
        setIsLoading(false);

        if (response.code == 200) {
          setSupplierData(response.data.rows);
        } else {
          showSimpleAlert(response.message);
        }
      }
    }
    fetchData();
  }, []);

  const getCategoryData = async () => {
    let response = await Request.get('category?type=Supplier');
    setSupplierCategory(response?.data?.rows);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          const base64EncodedIdObject = Buffer.from(
            JSON.stringify({
              iv: item?.id?.iv,
              encryptedData: item?.id?.encryptedData,
            }),
          ).toString('base64');
          console.log(item);
          NavigationService.navigate('SupplierDetails', {
            supplierObj: base64EncodedIdObject,
          });
        }}>
        <View style={styles.renderView}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                source={
                  item.profile_image
                    ? {uri: item.profile_image}
                    : IMAGES.appLogo
                }
                style={styles.iconView}
              />
            </View>
            <View style={{marginHorizontal: scale(10), width: scale(130)}}>
              <Text numberOfLines={1} style={styles.titleText}>
                {item.name}
              </Text>
              <Text numberOfLines={2} style={styles.descText}>
                {item.description}
              </Text>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Rating
                size={moderateScale(15)}
                readonly
                ratingColor={COLORS.yellow}
                fillColor={COLORS.yellow}
                type={'custom'}
                disabled={true}
                baseColor={'#F0F0F0'}
                rating={item.average_rating ? item.average_rating : 0}
                style={
                  {
                    // marginHorizontal: scale(10),
                  }
                }
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const searchData = useMemo(() => {
    return async searchText => {
      try {
        setIsLoading(true);
        let response = await Request.get(`supplier?name=${searchText}`);
        if (response) {
          setIsLoading(false);

          if (response.code == 200) {
            setSupplierData(response.data.rows);
          } else {
            showSimpleAlert(response.message);
          }
        }
        // Process the response data here
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
          setActiveSupplierCategory('all');
        }}>
        <View
          style={[
            styles.categoryView,
            activeSupplierCategory === 'all'
              ? {}
              : {
                  backgroundColor: COLORS.transparent,
                },
          ]}>
          <Text
            numberOfLines={1}
            style={[
              styles.category,
              activeSupplierCategory === 'all'
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
          setActiveSupplierCategory(item?.id?.iv);
        }}>
        <View
          style={[
            styles.categoryView,
            activeSupplierCategory === item?.id?.iv
              ? {}
              : {
                  backgroundColor: COLORS.transparent,
                },
          ]}>
          <Text
            numberOfLines={1}
            style={[
              styles.category,
              activeSupplierCategory === item?.id?.iv
                ? {}
                : {
                    color: COLORS.yellow,
                  },
            ]}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.mainContainer}>
          <View style={styles.subContainer}>
            <Image source={IMAGES.supplier} style={styles.imageView} />
            <Text style={styles.headerText}>Proveedores</Text>
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
            marginBottom: scale(20),
            marginTop: scale(20),
            justifyContent: 'center',
          }}>
          <Image source={IMAGES.searchIcon} style={styles.searchIconView} />
          <TextInput
            value={searchValue}
            placeholder="Buscar en proveedores"
            placeholderTextColor={COLORS.textColor}
            onChangeText={handleSearchChange}
            style={styles.textInput}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: scale(23),
          }}>
          <Image source={IMAGES.warning} />
          <Text style={styles.warningText}>
            {
              'Santa Maria no se hace responsable ni da garantía por los servicios realizados por estos proveedores.'
            }
          </Text>
        </View>

        {isLoading ? (
          <SupplierSkeleton />
        ) : (
          <View style={{flex: 1}}>
            <View style={styles.categoryListContainer}>
              <FlatList
                data={supplierCategory}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={categoryListHeaderComponent}
                renderItem={renderCategoryList}
                keyExtractor={(item, index) => `${index}`}
                horizontal
              />
            </View>
            <View style={styles.listView}>
              <FlatList
                data={
                  activeSupplierCategory !== 'all'
                    ? supplierData.filter(
                        item => item.testCategory === activeSupplierCategory,
                      )
                    : supplierData
                }
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`}
                style={{marginBottom: scale(10), marginTop: scale(10)}}
                contentContainerStyle={{flexGrow: 1}}
                // eslint-disable-next-line react/no-unstable-nested-components
                ListEmptyComponent={() => {
                  return (
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text style={styles.nodatadount}>
                        {'No se encontró ningún proveedor '}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        )}
      </View>

      {/* <ActivityLoader loading={isLoading} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240,240,240)',
  },
  renderView: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    marginVertical: scale(10),
    justifyContent: 'space-between',
  },
  iconView: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
  },
  warningText: {
    fontSize: scale(12),
    // fontWeight: '500',
    color: '#CB5757',
    fontFamily: FONTS.GothamMedium,
    paddingHorizontal: scale(15),
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(50),
    marginHorizontal: scale(23),
  },
  logoutView: {
    height: scale(20),
    width: scale(20),
    marginLeft: scale(10),
    tintColor: COLORS.black,
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
    paddingVertical: scale(10),
    letterSpacing: scale(0.8),
    lineHeight: scale(12),
    fontWeight: '400',
    fontSize: scale(10),
    fontFamily: FONTS.GothamMedium,
  },
  titleText: {
    color: '#313131',
    fontWeight: '500',
    fontSize: scale(12),
    fontFamily: FONTS.GothamMedium,
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
    height: scale(25),
    width: scale(25),
  },
  searchIconView: {
    position: 'absolute',
    // top: scale(32),
    left: scale(30),
    zIndex: 1,
  },
  categoryListContainer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: scale(55),
    marginHorizontal: scale(15),
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
  listView: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: scale(20),
    marginBottom: scale(90),
    borderRadius: scale(20),
  },
  nodatadount: {
    color: COLORS.yellow,
    fontSize: scale(18),
    alignSelf: 'center',
    fontWeight: '500',
  },
});
