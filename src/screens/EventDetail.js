import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native-animatable';
import {FONTS, IMAGES} from '../assets';
import {COLORS, CONSTANTS} from '../common';
import {moderateScale, scale, verticalScale} from '../common/Scale';
import {Buffer} from 'buffer';
import Request from '../api/Request';
import {showSimpleAlert} from '../utils/CommonUtils';
import moment from 'moment';
import WebView from 'react-native-webview';
import {SupplierDetailSkeleton} from '../common/CustomSkeleton';

export default function EventDetail({route, navigation}) {
  const [eventDetails, seteventDetails] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [fontSize, setFontSize] = useState(40); // Initial font size

  useEffect(() => {
    async function fetchData() {
      await getEventDetails();
    }
    // Call the async function

    fetchData();
  }, []);
  const getEventDetails = async () => {
    setisLoading(true);

    const base64EncodedIdObject = Buffer.from(
      JSON.stringify({
        iv: route.params.newsevent?.id?.iv,
        encryptedData: route.params.newsevent?.id?.encryptedData,
      }),
    ).toString('base64');
    const response = await Request.get(`newsandevent/${base64EncodedIdObject}`);
    // console.log('responseresponse', response);
    if (response) {
      setisLoading(false);
      if (response.code == 200) {
        seteventDetails(response.data);
      } else {
        showSimpleAlert(response.message);
      }
    }
    // console.log('base64EncodedIdObject', base64EncodedIdObject);
  };
  const modifyHtmlContent = html => {
    // Regular expression to match <p> tags with or without existing styles
    const pRegex = /<p(.*?)>/g;
    const pReplacement = `<p style='font-size: ${fontSize}px; text-align: justify;'>`;
    const imgRegex = /<img(.*?)>/g;
    const imgReplacement = `<div style="width: 100%; height: auto; display: flex; justify-content: center;"><img style="width: 100%; height: 100%; object-fit: contain;" $1></div>`;
    // Replace all <p> tags with the new style
    const data = html
      ?.replace(pRegex, (match, p1) => {
        // Check if the <p> tag already has a style attribute
        if (/style\s*=\s*["'][^"']*["']/.test(p1)) {
          // Replace the existing style attribute with the new styles
          return match.replace(
            /style\s*=\s*["'][^"']*["']/,
            `style='font-size: ${fontSize}px; text-align: justify;'`,
          );
        } else {
          // Add the new style attribute to the <p> tag
          return `<p style='font-size: ${fontSize}px; text-align: justify;'${p1}>`;
        }
      })
      .replace(imgRegex, imgReplacement);

    // console.log('Modified HTML:', data);
    return data;
  };
  // const randomItem = dummyData[Math.floor(Math.random() * dummyData.length)];

  // Replace the placeholders in the HTML template with the random item's data
  return (
    <View style={styles.container}>
      {isLoading ? (
        <SupplierDetailSkeleton />
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.mainContainer}>
            {eventDetails?.image ? (
              <Image
                style={styles.imageView}
                source={{uri: eventDetails?.image}}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={styles.imageView}
                source={IMAGES.appLogo}
              />
            )}
          </View>
          <View style={styles.overlay} />
          <View
            style={{
              position: 'absolute',
              justifyContent: 'space-between',
              height: scale(260),
              flexDirection: 'column',
              width: CONSTANTS.screenWidth,
            }}>
            <View style={styles.backIconView}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image source={IMAGES.backIcon} />
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: scale(20), overflow: 'visible'}}>
              <View style={styles.eventView}>
                <Text numberOfLines={1} style={styles.eventText}>
                  {eventDetails?.type}
                </Text>
              </View>
              <Text numberOfLines={2} style={styles.descText}>
                {eventDetails?.title}
              </Text>
              <Text style={[styles.descText2, {fontStyle: 'italic'}]}>
                {moment(eventDetails?.published_date).format('DD-MMM-YYYY')}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopLeftRadius: scale(30),
              borderTopRightRadius: scale(30),
              padding: scale(20),
              flex: 1,
              backgroundColor: COLORS.white,
            }}>
            <WebView
              originWhitelist={['*']}
              //   injectedJavaScript={`
              //   const styleElement = document.createElement('style');
              //   styleElement.innerHTML = 'body { font-size: 40px; }';
              //   document.head.appendChild(styleElement);
              // `}
              // injectedJavaScript={injectedJavaScript}
              // source={{uri: 'https://reactnative.dev/'}}
              source={{html: modifyHtmlContent(eventDetails.content)}}
              style={styles.webview}
            />
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainContainer: {
    // backgroundColor: COLORS.transparent,
    height: scale(260),
  },
  backIconView: {
    marginTop: scale(50),
    marginHorizontal: scale(20),
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
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    padding: scale(20),
    // backgroundColor: COLORS.white,
    position: 'absolute',
  },
  webview: {
    flex: 1,
  },
  imageView: {
    width: CONSTANTS.screenWidth,
    height: verticalScale(280),
  },
  descText: {
    color: COLORS.white,
    padding: scale(5),
    fontSize: scale(16),
    fontFamily: FONTS.GotamBold,
    marginHorizontal: scale(20),
  },
  descText3: {
    color: COLORS.black,
    padding: scale(5),
    fontSize: scale(12),
    letterSpacing: 0.5,
    fontWeight: '400',
  },
  descText2: {
    color: COLORS.grayShade4,
    fontSize: scale(12),
    fontFamily: FONTS.GothamMedium,
    fontStyle: 'italic',
    marginHorizontal: scale(20),
  },
  eventText: {
    color: COLORS.white,
    fontSize: scale(12),
    fontWeight: '400',
    textAlign: 'center',
    padding: scale(4),
    paddingVertical: scale(6),
  },
  eventView: {
    backgroundColor: COLORS.yellow,
    borderRadius: scale(20),
    width: scale(80),
    alignItems: 'center',
    marginHorizontal: scale(20),
    marginVertical: scale(5),
  },
});
