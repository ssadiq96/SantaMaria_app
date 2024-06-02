import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {FONTS, IMAGES} from '../assets';
import {COLORS} from '../common';
import {moderateScale, scale} from '../common/Scale';
import {wp} from '../utils/constants';
import NavigationService from '../utils/NavigationService';
import {ActivityLoader} from '../components/ActivityLoader';
import Request from '../api/Request';
import {showSimpleAlert} from '../utils/CommonUtils';
import {Buffer} from 'buffer';
import {DiscountSkeleton} from '../common/CustomSkeleton';
import {clearAllData} from '../utils/StorageService';

export default function DiscountScreen({route, navigation}) {
  const [searchValue, setsearchValue] = useState('');
  const [discountData, setdiscountData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setisLoading(true);
      await getdiscountData();
    }
    // Call the async function
    fetchData();
  }, []);
  const getdiscountData = async () => {
    const response = await Request.get('discount');
    if (response) {
      setisLoading(false);
      console.log('responser123', response);
      if (response.code == 200) {
        setdiscountData(response.data.rows);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const navigatediscountDetailPage = item => {
    console.log('item1234', item);
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
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigatediscountDetailPage(item);
        }}
        style={{borderRadius: scale(12), marginVertical: scale(10)}}>
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
        setisLoading(true);
        const response = await Request.get(`discount?search=${searchText}`);
        if (response) {
          setisLoading(false);
          console.log('responser123', response);
          if (response.code == 200) {
            setdiscountData(response.data.rows);
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
    setsearchValue(text);
    searchData(text); // Call the memoized API function when search text changes
  };
  const logoutApi = async () => {
    // NavigationService.navigate('LoginScreen');
    setisLoading(true);
    const response = await Request.get('logout');
    if (response) {
      setisLoading(false);
      if (response.code == 200) {
        clearAllData(() => {
          NavigationService.navigate('LoginScreen');
        });
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <Image source={IMAGES.discountIcon} style={styles.imageView} />
          <Text style={styles.headerText}>Discounts</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('EmergencyContact');
            }}>
            <View style={styles.subContainer}>
              <Image source={IMAGES.notification} tintColor={COLORS.black} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                CONSTANTS.AppName,
                'Are you sure you want to logout',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => logoutApi()},
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
          placeholder="Search all Discounts"
          placeholderTextColor={COLORS.textColor}
          onChangeText={handleSearchChange}
          style={styles.textInput}
        />
      </View>

      {isLoading ? (
        <DiscountSkeleton />
      ) : (
        <ScrollView style={{marginBottom: scale(20)}}>
          <FlatList
            data={discountData}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}
            style={{marginBottom: scale(80)}}
            numColumns={2}
          />
        </ScrollView>
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
  renderView: {
    borderRadius: scale(12),
    height: scale(180),
    width: scale(145),
    marginLeft: scale(15),
    marginHorizontal: scale(10),
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
    left: scale(40),
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
    marginHorizontal: scale(30),
  },
  textInput: {
    height: scale(45),
    width: scale(300),
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
    left: scale(40),
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
