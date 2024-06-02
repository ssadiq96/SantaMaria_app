import React, {Component} from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import {COLORS, CONSTANTS} from '../common';

export const ActivityLoader = ({loading, style, color, container}) => {
  return (
    <>
      {loading && (
        <View style={[styles.container, {container}]}>
          <View style={styles.subView}>
            <ActivityIndicator
              size={'large'}
              animating={true}
              color={color || COLORS.yellow}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: CONSTANTS.screenHeight,
    width: '100%',
    position: 'absolute',
    backgroundColor: COLORS.transparent,
  },
  subView: {
    height: CONSTANTS.screenHeight,
    width: CONSTANTS.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: COLORS.loaderBackground,
  },
});
