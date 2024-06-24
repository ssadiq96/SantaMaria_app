/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../common';
import {scale} from '../common/Scale';
import {FONTS, IMAGES} from '../assets';
import {Image} from 'react-native-animatable';

const NotificationScreen = ({route, navigation}) => {
  const renderNotificationItem = ({item}) => {
    return (
      <TouchableOpacity style={{marginTop: scale(10)}} onPress={() => {}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image
              source={item.img ? item.img : IMAGES.appLogo}
              style={styles.iconView}
            />
          </View>
          <Text style={styles.titleText} numberOfLines={2}>
            {item.text}
          </Text>
        </View>
        <View
          style={{
            height: 2,
            backgroundColor: COLORS.yellow,
            marginVertical: scale(10),
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.backIconView}>
        <TouchableOpacity
          style={styles.backView}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={IMAGES.backIcon} style={styles.backIconStyle} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notificaciones</Text>
      </View>
      <View
        style={{
          paddingHorizontal: scale(30),
          paddingRight: scale(20),
          marginTop: scale(23),
          marginBottom: scale(60),
        }}>
        <FlatList
          data={[
            {
              text: 'This is Lorem Ipsum custom text to display on the screen  screen  display on the screen  screen ',
              img: IMAGES.appLogo,
            },
            {
              text: 'This is Lorem Ipsum custom text to display on the screen',
              img: IMAGES.appLogo,
            },
            {
              text: 'This is Lorem Ipsum custom text to display on the screen',
              img: IMAGES.appLogo,
            },
            {
              text: 'This is Lorem Ipsum custom text to display on the screen',
              img: IMAGES.appLogo,
            },
            {
              text: 'This is Lorem Ipsum custom text to display on the screen',
              img: IMAGES.appLogo,
            },
            {
              text: 'This is Lorem Ipsum custom text to display on the screen',
              img: IMAGES.appLogo,
            },
            {
              text: 'This is Lorem Ipsum custom text to display on the screen',
              img: IMAGES.appLogo,
            },
            {
              text: 'This is Lorem Ipsum custom text to display on the screen',
              img: IMAGES.appLogo,
            },
            {
              text: 'This is Lorem Ipsum custom text to display on the screen',
              img: IMAGES.appLogo,
            },
            {
              text: 'This is Lorem Ipsum custom text to display on the screen',
              img: IMAGES.appLogo,
            },
          ]}
          showsVerticalScrollIndicator={false}
          renderItem={renderNotificationItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240,240,240)',
  },
  headerText: {
    fontSize: scale(20),
    textAlign: 'center',
    fontFamily: FONTS.GothamMedium,
    fontWeight: '600',
    color: COLORS.grey,
    flex: 1,
    paddingRight: scale(50),
  },
  backIconView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: scale(30),
  },
  backIconStyle: {
    height: scale(30),
    width: scale(30),
    marginHorizontal: scale(20),
  },
  backView: {
    alignSelf: 'flex-start',
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
  titleText: {
    color: '#000',
    fontSize: scale(13),
    fontFamily: FONTS.GothamLight,
    fontWeight: '600',
    marginHorizontal: scale(10),
    flex: 1,
    flexWrap: 'wrap',
  },
});
