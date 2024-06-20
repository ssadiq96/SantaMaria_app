/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
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
import {CoverSkeleton, DiscountSkeleton} from '../common/CustomSkeleton';
import {moderateScale, scale} from '../common/Scale';
import {showSimpleAlert} from '../utils/CommonUtils';

export default function EmergencyContact({navigation}) {
  const [isLoading, setisLoading] = useState(false);
  const [emergencyContactData, setemergencyContactData] = useState([]);
  const [bannerArray, setbannerArray] = useState([]);
  const [emergencyCoverData, setemergencyCoverData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setisLoading(true);
      await getComponentData();
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData2() {
      getBannerData();
    }
    fetchData2();
  }, []);
  useEffect(() => {
    async function fetchData3() {
      getEmergencyCoverData();
    }
    fetchData3();
  }, []);
  const getEmergencyCoverData = async () => {
    setisLoading(true);
    const emergencyResponse = await Request.get('component');
    if (emergencyResponse) {
      setisLoading(false);

      let rowData = [];
      emergencyResponse.data.rows.map(item => {
        if (item.type === 'EmergencyContact') {
          rowData.push(item);
        }
      });

      setemergencyCoverData(rowData[0]);
    } else {
      setisLoading(false);
      showSimpleAlert(emergencyResponse.message);
    }
  };
  const getBannerData = async data => {
    setisLoading(true);
    const response = await Request.get('banner');
    if (response) {
      setisLoading(false);
      if (response.code == 200) {
        setbannerArray(response.data.rows);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderView}>
        <Image
          source={item.cover_image ? {uri: item.cover_image} : IMAGES.appLogo}
          style={{
            height: scale(140),
            width: scale(145),
            borderTopLeftRadius: scale(12),
            borderTopRightRadius: scale(12),
          }}
        />
        <View
          style={[
            styles.overlay,
            {
              borderTopLeftRadius: scale(12),
              borderTopRightRadius: scale(12),
              height: scale(140),
              width: scale(145),
            },
          ]}
        />
        <View style={styles.profileView}>
          <View style={styles.profileImage} />
          <Text numberOfLines={1} style={styles.ambulanceText}>
            {item.name}
          </Text>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => {
              let phoneNumberFormatted = `tel:${item.contact_no}`;
              Linking.openURL(phoneNumberFormatted).catch(err =>
                console.error('Error opening dialer', err),
              );
            }}>
            <View style={styles.contactNumberContainer}>
              <Image
                style={{
                  alignSelf: 'center',
                  borderRadius: scale(50),
                  width: scale(16),
                  height: scale(16),
                  marginHorizontal: scale(2),
                }}
                resizeMode="contain"
                source={IMAGES.phoneIcon}
              />
              <Text numberOfLines={1} style={styles.numberText}>
                {item.contact_no}
              </Text>
            </View>
          </TouchableOpacity>
          {item.whatsapp_no && (
            <TouchableOpacity
              onPress={() => {
                let phoneNumberFormatted = `https://wa.me/:${item.whatsapp_no}`;
                Linking.openURL(phoneNumberFormatted).catch(err =>
                  console.error('Error opening dialer', err),
                );
              }}>
              <View style={styles.contactNumberContainer}>
                <Image
                  style={{
                    alignSelf: 'center',
                    borderRadius: scale(50),
                    width: scale(16),
                    height: scale(16),
                    marginHorizontal: scale(2),
                  }}
                  resizeMode="contain"
                  source={IMAGES.whatsappIcon}
                />
                <Text numberOfLines={1} style={styles.numberText}>
                  {item.whatsapp_no}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderItem1 = ({item}) => {
    return (
      <View style={styles.renderItem1_parentView}>
        <Image
          source={item.image ? {uri: item.image} : IMAGES.appLogo}
          style={styles.renderItem1_img}
        />
        <View style={styles.overlay} />
        <View style={styles.renderItem1_view2}>
          <Text numberOfLines={2} style={styles.renderItem1_text3}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };
  const getComponentData = async () => {
    const response = await Request.get('contact');
    if (response) {
      setisLoading(false);
      if (response.code == 200) {
        setemergencyContactData(response.data.rows);
      } else {
        showSimpleAlert(response.message);
      }
    }
  };

  const cleandescription = description => {
    // Optionally, you can replace other special whitespace characters if needed
    description = description?.replace('\u2028', ' ');
    description = description?.replace('\u2029', ' ');
    description = description?.replace('\u00A0', ' ');
    description = description?.replace('\u2007', ' ');
    description = description?.replace('\u202F', ' ');
    description = description?.replace('\uFEFF', ' ');

    // Replace any sequence of multiple spaces with a single space
    description = description?.replaceAll('\\s+', ' ');
    description = description?.replaceAll('\\s+', ' ');

    // Trim the string to remove any leading or trailing whitespace
    description = description?.trim();

    return description;
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {isLoading ? (
          <CoverSkeleton />
        ) : (
          <View style={{}}>
            {!emergencyCoverData.cover_image ? (
              <Image source={IMAGES.appLogo} style={styles.coverImage} />
            ) : (
              <Image
                source={{uri: emergencyCoverData?.cover_image}}
                style={styles.coverImage}
              />
            )}
            <View
              style={[
                styles.overlay,
                {
                  height: scale(280),
                  // borderBottomLeftRadius: scale(40),
                  // borderBottomRightRadius: scale(40),
                },
              ]}
            />
            <View style={styles.subView}>
              <View style={styles.backIconView}>
                {/* <TouchableOpacity
                  style={styles.backView}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={IMAGES.backIcon}
                    style={styles.backIconStyle}
                  />
                </TouchableOpacity> */}
              </View>
              <View style={{marginTop: '18%', marginLeft: '5%'}}>
                <Image
                  source={{uri: emergencyCoverData?.profile_image}}
                  style={styles.profileImageView}
                />
                <Text numberOfLines={1} style={styles.titleText}>
                  {emergencyCoverData?.name}
                </Text>
                <Text numberOfLines={2} style={styles.descText}>
                  {cleandescription(emergencyCoverData?.description)}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View>
          <FlatList
            data={bannerArray}
            renderItem={renderItem1}
            keyExtractor={(item, index) => index}
            horizontal
          />
        </View>
        {isLoading ? (
          <DiscountSkeleton />
        ) : (
          <View
            style={{
              flex: 1,
              marginTop: scale(10),
              marginBottom: scale(80),
            }}>
            <FlatList
              data={emergencyContactData}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              estimatedItemSize={271}
              keyExtractor={(item, index) => index}
              numColumns={2}
            />
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverImage: {
    height: scale(280),
    // borderBottomLeftRadius: scale(40),
    // borderBottomRightRadius: scale(40),
    width: CONSTANTS.screenWidth,
  },
  profileImageView: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
  },
  backIconStyle: {
    height: scale(30),
    width: scale(30),
    marginHorizontal: scale(20),
    marginTop: scale(10),
  },
  backIconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(30),
  },
  profileView: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: '40%',
  },
  renderView: {
    marginHorizontal: scale(12),
    width: scale(145),
    marginVertical: scale(10),
    borderColor: COLORS.yellow,
    // borderRadius: scale(20),
  },
  subView: {
    position: 'absolute',
    width: '100%',
    // width: scale(400),
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
  backView: {
    alignSelf: 'flex-start',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scale(5),
  },
  profileImage: {
    height: scale(40),
    width: scale(40),
    alignSelf: 'center',
    borderRadius: scale(20),
  },

  phoneText: {
    color: COLORS.white,
    fontSize: scale(14),
    paddingVertical: scale(2),
    fontFamily: FONTS.GothamLight,
  },
  titleText: {
    color: '#F9F1E4',
    fontSize: scale(20),
    paddingTop: scale(20),
    width: '100%',
    fontFamily: FONTS.GothamMedium,
  },
  descText: {
    color: '#F9F1E4',
    fontSize: scale(14),
    paddingVertical: scale(10),
    width: '100%',
    fontFamily: FONTS.GothamLight,
  },
  numberText: {
    color: '#F9F1E4',
    fontSize: scale(12),
    fontWeight: '600',
    fontFamily: FONTS.GotamBold,
  },

  bottomView: {
    borderBottomStartRadius: scale(12),
    borderBottomEndRadius: scale(12),
    backgroundColor: COLORS.yellow,
    minHeight: scale(40),
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(2),
  },
  ambulanceText: {
    color: '#F9F1E4',
    fontSize: scale(14),
    fontFamily: FONTS.GotamBold,
    paddingTop: scale(15),
    textAlign: 'center',
  },
  renderItem1_parentView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: scale(10),
    marginTop: scale(20),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.yellow,
    borderRadius: scale(20),
  },
  renderItem1_view2: {
    width: scale(250),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    paddingTop: scale(100),
    paddingLeft: scale(10),
  },
  renderItem1_img: {
    width: CONSTANTS.screenWidth - 100,
    height: moderateScale(150),
    borderRadius: scale(20),
  },

  renderItem1_text3: {
    color: COLORS.white,
    fontSize: scale(12),
    textAlign: 'left',
    fontWeight: '500',
  },
});
