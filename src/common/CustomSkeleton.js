import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {moderateScale, scale} from './Scale';
import CONSTANTS from './constants';

export const SupplierSkeleton = ({itemCount}) => {
  const renderSkeletonItem = () => (
    <SkeletonPlaceholder.Item
      marginVertical={moderateScale(10)}
      flexDirection="row"
      marginHorizontal={moderateScale(20)}
      alignItems="center">
      <SkeletonPlaceholder.Item
        width={moderateScale(60)}
        height={moderateScale(60)}
        borderRadius={moderateScale(30)}
      />
      <SkeletonPlaceholder.Item marginLeft={20}>
        <SkeletonPlaceholder.Item
          width={moderateScale(80)}
          height={moderateScale(20)}
        />

        <SkeletonPlaceholder.Item
          marginTop={6}
          flexDirection="row"
          width={moderateScale(150)}
          height={moderateScale(20)}></SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  );

  return (
    <View style={{flex: 1}}>
      <SkeletonPlaceholder borderRadius={4}>
        {Array.from({length: itemCount || 10}).map((item, index) => (
          <View key={index}>{renderSkeletonItem()}</View>
        ))}
      </SkeletonPlaceholder>
    </View>
  );
};
export const SupplierDetailSkeleton = ({itemCount}) => {
  const renderSkeletonItem = () => (
    <SkeletonPlaceholder.Item
      marginVertical={moderateScale(10)}
      flexDirection="row"
      alignItems="center">
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          marginTop={6}
          flexDirection="row"
          marginLeft={scale(30)}
          width={CONSTANTS.screenWidth - 50}
          height={moderateScale(100)}></SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  );

  return (
    <View style={{flex: 1}}>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item
          width={CONSTANTS.screenWidth}
          height={moderateScale(250)}
          borderRadius={moderateScale(20)}
        />
        {Array.from({length: itemCount || 10}).map((item, index) => (
          <View key={index}>{renderSkeletonItem()}</View>
        ))}
      </SkeletonPlaceholder>
    </View>
  );
};
export const DiscountSkeleton = ({itemCount}) => {
  const renderSkeletonItem = () => (
    <SkeletonPlaceholder.Item
      marginVertical={moderateScale(10)}
      flexDirection="row"
      marginHorizontal={moderateScale(20)}
      alignItems="center">
      <SkeletonPlaceholder.Item
        width={moderateScale(150)}
        height={moderateScale(150)}
        marginHorizontal={scale(10)}
        borderRadius={moderateScale(20)}
      />
      <SkeletonPlaceholder.Item
        width={moderateScale(150)}
        height={moderateScale(150)}
        borderRadius={moderateScale(20)}
      />
    </SkeletonPlaceholder.Item>
  );

  return (
    <View style={{flex: 1}}>
      <SkeletonPlaceholder borderRadius={4}>
        {Array.from({length: itemCount || 12}).map((item, index) => (
          <View key={index}>{renderSkeletonItem()}</View>
        ))}
      </SkeletonPlaceholder>
    </View>
  );
};

export const EventSkeleton = ({itemCount}) => {
  const renderSkeletonItem = () => (
    <SkeletonPlaceholder.Item
      marginVertical={moderateScale(10)}
      flexDirection="row"
      marginHorizontal={moderateScale(20)}
      alignItems="center">
      <SkeletonPlaceholder.Item
        width={CONSTANTS.screenWidth - 50}
        height={moderateScale(150)}
        borderRadius={moderateScale(20)}
      />
    </SkeletonPlaceholder.Item>
  );

  return (
    <View style={{flex: 1}}>
      <SkeletonPlaceholder borderRadius={4}>
        {Array.from({length: itemCount || 12}).map((item, index) => (
          <View key={index}>{renderSkeletonItem()}</View>
        ))}
      </SkeletonPlaceholder>
    </View>
  );
};

export const CoverSkeleton = ({itemCount}) => {
  const renderSkeletonItem = () => (
    <SkeletonPlaceholder.Item
      marginTop={moderateScale(60)}
      flexDirection="row"
      marginHorizontal={moderateScale(20)}
      borderRadius={moderateScale(20)}
      alignItems="center">
      <SkeletonPlaceholder.Item
        width={CONSTANTS.screenWidth - 60}
        height={moderateScale(280)}
        borderRadius={moderateScale(20)}></SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  );

  return (
    <View style={{flex: 1}}>
      <SkeletonPlaceholder borderRadius={4}>
        {Array.from({length: itemCount || 1}).map((item, index) => (
          <View key={index}>{renderSkeletonItem()}</View>
        ))}
      </SkeletonPlaceholder>
    </View>
  );
};

export const HomeSkeleton = ({itemCount}) => {
  const renderSkeletonItem = () => (
    <SkeletonPlaceholder flex={1} borderRadius={moderateScale(20)}>
      <SkeletonPlaceholder.Item
        width={CONSTANTS.screenWidth - 40}
        marginHorizontal={moderateScale(20)}
        height={moderateScale(280)}
        marginTop={moderateScale(60)}
        borderRadius={moderateScale(20)}
      />
      <SkeletonPlaceholder
        flexDirection="row"
        marginHorizontal={moderateScale(20)}
        borderRadius={moderateScale(20)}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginTop={moderateScale(20)}>
          <SkeletonPlaceholder.Item
            width={scale(120)}
            height={moderateScale(120)}
            marginHorizontal={scale(20)}
            borderRadius={moderateScale(20)}
          />
          <SkeletonPlaceholder.Item
            width={scale(120)}
            height={moderateScale(120)}
            borderRadius={moderateScale(20)}
          />
          <SkeletonPlaceholder.Item
            width={scale(120)}
            height={moderateScale(120)}
            marginHorizontal={scale(20)}
            borderRadius={moderateScale(20)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        flexDirection="row"
        marginHorizontal={moderateScale(20)}
        borderRadius={moderateScale(20)}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginTop={moderateScale(20)}>
          <SkeletonPlaceholder.Item
            width={scale(200)}
            height={moderateScale(150)}
            marginHorizontal={scale(20)}
            borderRadius={moderateScale(20)}
          />
          <SkeletonPlaceholder.Item
            width={scale(200)}
            height={moderateScale(150)}
            borderRadius={moderateScale(20)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        flexDirection="row"
        marginHorizontal={moderateScale(20)}
        borderRadius={moderateScale(20)}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginTop={moderateScale(20)}>
          <SkeletonPlaceholder.Item
            width={scale(200)}
            height={moderateScale(150)}
            marginHorizontal={scale(20)}
            borderRadius={moderateScale(20)}
          />
          <SkeletonPlaceholder.Item
            width={scale(200)}
            height={moderateScale(150)}
            borderRadius={moderateScale(20)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </SkeletonPlaceholder>
  );

  return (
    <View style={{flex: 1}}>
      <SkeletonPlaceholder borderRadius={4}>
        {Array.from({length: itemCount || 1}).map((item, index) => (
          <View key={index}>{renderSkeletonItem()}</View>
        ))}
      </SkeletonPlaceholder>
    </View>
  );
};
