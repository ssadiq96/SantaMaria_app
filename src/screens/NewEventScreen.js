import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Animated,
} from 'react-native';
import {Image} from 'react-native-animatable';
import {FONTS, IMAGES} from '../assets';
import {moderateScale, scale} from '../common/Scale';
import {COLORS, CONSTANTS} from '../common';
import {hp, wp} from '../utils/constants';
import Request from '../api/Request';
import {showSimpleAlert} from '../utils/CommonUtils';
import {ActivityLoader} from '../components/ActivityLoader';
import moment from 'moment';
import StorageService, {clearAllData} from '../utils/StorageService';
import NavigationService from '../utils/NavigationService';
import {EventSkeleton} from '../common/CustomSkeleton';
import {WebView} from 'react-native-webview';
import CustomIndicator from '../components/CustomIndicator';

export default function NewEventScreen(Props) {
  const [eventselected, seteventselected] = useState(true);
  const [newsData, setnewsData] = useState([]);
  const [user, setuserData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [eventbanner, seteventbanner] = useState([]);
  const flatListRef = useRef(null); // Ref for the FlatList
  const scrollX = useRef(new Animated.Value(0)).current; // Animated value to track scroll position

  useEffect(() => {
    async function fetchData3() {
      const userData = await StorageService.getItem(
        StorageService.STORAGE_KEYS.USER_DETAILS,
      );
      setuserData(userData);
      console.log('userDatauserDatauserData', userData);
      await geteventnewsBanner();
    }
    // Call the async function
    fetchData3();
  }, []);

  useEffect(() => {
    async function fetchData() {
      getnewsEvent(true);
    }
    fetchData();
  }, []);
  const geteventnewsBanner = async () => {
    setisLoading(true);
    const response = await Request.get('newsandevent/featuredList');
    setisLoading(false);

    if (response.code == 200) {
      seteventbanner(response.data);
    } else {
      showSimpleAlert(response.message);
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{margin: scale(10)}}
        onPress={() => {
          Props.props.navigation.navigate('EventDetail', {newsevent: item});
        }}>
        {item.image ? (
          <Image style={styles.imageView} source={{uri: item.image}} />
        ) : (
          <Image
            resizeMode="contain"
            style={styles.imageView}
            source={IMAGES.appLogo}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: scale(10),
          }}>
          <View
            style={{
              width: CONSTANTS.screenWidth - 150,
            }}>
            <Text numberOfLines={2} style={styles.descText}>
              {item.title}
            </Text>
            {/* <WebView originWhitelist={['*']} source={{html: item.content}} /> */}
            {/* <Text style={styles.descText}>{item.content}</Text> */}
          </View>
          <Text style={styles.dateView}>
            {moment(item.published_date).format('DD-MMM-YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
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
  const getnewsEvent = async data => {
    setisLoading(true);
    const response = await Request.get(
      `newsandevent?type=${data == true ? 'Event' : 'News'}`,
    );
    if (response) {
      setisLoading(false);
      console.log('responser123', response);
      if (response.code == 200) {
        setnewsData(response.data.rows);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const eventbannerRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Props.props.navigation.navigate('EventDetail', {newsevent: item});
        }}>
        <View style={styles.renderItem2}>
          <ImageBackground
            style={styles.renderItem}
            imageStyle={{borderRadius: scale(20)}}
            source={item.image ? {uri: item.image} : IMAGES.appLogo}>
            <View style={styles.overlay} />
            <View style={styles.typeView}>
              <Text style={styles.typeText}>{item?.type}</Text>
            </View>
            <Text numberOfLines={2} style={styles.contentText}>
              {item?.title}
            </Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={styles.subContainer2}>
            <Image
              source={user?.image ? {uri: user?.image} : IMAGES.appLogo}
              style={styles.profileEditImage}
            />
            <Text style={styles.headerText}>
              {'Good Morning'} {user?.firstName}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('EmergencyContact');
            }}>
            <Image source={IMAGES.notification} tintColor={COLORS.white} />
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
        <Text style={styles.discoverText}>{'Discover whats trending'}</Text>
        <View style={{marginTop: scale(15)}}>
          <FlatList
            data={eventbanner}
            renderItem={eventbannerRenderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={styles.subView}>
        <TouchableOpacity
          onPress={() => {
            seteventselected(true);
            getnewsEvent(true);
          }}
          style={[
            styles.eventView,
            {backgroundColor: eventselected ? COLORS.yellow : COLORS.white},
          ]}>
          <Text
            style={[
              styles.eventText,
              {color: eventselected ? COLORS.white : COLORS.yellow},
            ]}>
            {'Events'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            seteventselected(false);
            getnewsEvent(false);
          }}
          style={[
            styles.eventView,
            {
              backgroundColor: eventselected ? COLORS.white : COLORS.yellow,
              borderColor: eventselected ? COLORS.yellow : COLORS.yellow,
              borderRightWidth: 1,
            },
          ]}>
          <Text
            style={[
              styles.newsText,
              {color: eventselected ? COLORS.yellow : COLORS.white},
            ]}>
            {'News'}
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <EventSkeleton />
      ) : (
        <View style={styles.mainView}>
          <FlatList
            data={newsData}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={styles.flatlistView}
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
                    marginTop: scale(50),
                  }}>
                  <Text style={[styles.nodatafound]}>{'No data Found'}</Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  typeText: {
    fontSize: scale(12),
    color: COLORS.white,
    fontFamily: FONTS.GotamBold,
    fontWeight: '400',
    paddingHorizontal: scale(10),
  },
  logoutView: {
    height: scale(20),
    width: scale(20),
    marginLeft: scale(10),
  },
  contentText: {
    paddingTop: '30%',
    paddingHorizontal: '10%',
    color: COLORS.white,
    fontSize: scale(14),
    fontWeight: '500',
  },
  nodatafound: {
    color: COLORS.white,
    fontSize: scale(14),
    fontWeight: '500',
    padding: scale(10),
  },
  discoverText: {
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    fontFamily: FONTS.GotamBold,
    color: COLORS.white,
    fontSize: scale(16),
    fontWeight: '500',
  },
  typeView: {
    backgroundColor: COLORS.yellow,
    marginTop: scale(20),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(20),
    width: scale(70),
    height: scale(23),
  },
  mainView: {flex: 1, marginBottom: scale(60)},
  mainContainer: {
    height: scale(320),
    backgroundColor: COLORS.yellow,
    width: '100%',
    // borderBottomLeftRadius: scale(40),
    // borderBottomRightRadius: scale(40),
    //
  },
  eventText: {
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventView: {
    height: wp('10%'),
    width: moderateScale(95),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(40),
  },
  newsText: {
    alignSelf: 'center',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsView: {
    height: wp('10%'),
    width: moderateScale(95),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(40),
  },
  flatlistView: {
    flex: 1,
    marginTop: scale(10),
    marginHorizontal: scale(10),
    marginBottom: scale(20),
  },
  headerText: {
    fontSize: scale(12),
    fontWeight: '500',
    width: scale(200),
    paddingHorizontal: scale(10),
    color: COLORS.white,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: scale(50),
  },
  subView: {
    flexDirection: 'row',
    borderRadius: scale(40),
    width: moderateScale(191),
    borderWidth: 1,
    borderColor: COLORS.yellow,
    marginTop: hp('2%'),
    marginLeft: wp(5),
  },
  descText: {
    fontSize: scale(13),
    fontWeight: '500',
    letterSpacing: 0.3,
    color: COLORS.grey,
    paddingVertical: scale(2),
  },
  dateView: {
    color: COLORS.textColor,
    fontSize: scale(10),
    fontStyle: 'italic',
    alignSelf: 'center',
    textAlign: 'left',
    width: scale(100),
  },
  imageView: {
    height: scale(150),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.yellow,
    borderRadius: scale(15),
  },
  subContainer2: {flexDirection: 'row', alignItems: 'center'},
  profileEditImage: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
  },
  renderItem: {
    height: scale(150),
    width: scale(240),
    marginHorizontal: scale(10),
    borderRadius: scale(40),
  },
  renderItem2: {
    marginHorizontal: scale(10),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: scale(20),
    backgroundColor: 'rgba(0, 0, 0, 1)', // Your overlay color
    opacity: 0.5, // Adjust opacity as needed
  },
});
