import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const CustomIndicator = ({ data, scrollX }) => {
  const indicatorWidth = scrollX.interpolate({
    inputRange: [0, data.length - 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.indicatorContainer}>
      <Animated.View style={[styles.indicator, { width: indicatorWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    height: 4,
    marginTop: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  indicator: {
    height: '100%',
    backgroundColor: '#FFC107', // Active indicator color
    borderRadius: 2,
  },
});

export default CustomIndicator;
