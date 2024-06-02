import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  Text,
} from "react-native";
import { IMAGES } from "../assets";
import { responsiveWidth as wp } from "react-native-responsive-dimensions";
import { Fonts } from "../utils/font";
import COLORS from "./colors";
import { scale } from "./Scale";

const CustomHeader = ({
  imageUrl,
  onNavigate,
  headerImage,
  title,
  isAppLogo,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onNavigate();
          }}
        >
          <Image source={imageUrl} style={[styles.headerImage, headerImage]} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          {title ? (
            <Text style={styles.headerTitle}>{title}</Text>
          ) : (
            <Image
              source={IMAGES.earboss}
              resizeMode={"contain"}
              style={styles.imgTitle}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  titleContainer: {
    flex: 0.9, // Expand to fill available space
    alignSelf: "center", // Center horizontally
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: Platform.OS === "ios" ? 30 : 56,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: scale(22),
    fontFamily: Fonts.KohinoorBanglaSemibold,
    textAlign: "center",
    fontWeight: "bold",
  },
  headerImage: {
    width: 30,
    height: 30,
    marginLeft: wp(4),
    resizeMode: "contain",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  imgTitle: {
    width: wp(27),
    alignSelf: "center",
  },
});

export default CustomHeader;
