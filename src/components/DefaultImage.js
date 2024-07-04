import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import {COLORS} from '../common';

class DefaultImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      failToLoad: false,
      loadComplete: false,
      loading: false,
    };
  }
  render() {
    let {containerStyle} = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {this.renderImageView()}
      </View>
    );
  }
  componentWillReceiveProps(nextProps) {
    if (_.isEqual(this.props.source, nextProps.source)) {
      this.setState({failToLoad: false /* loadComplete: false */});
    }
  }
  renderImageView() {
    let {loadComplete, failToLoad} = this.state;
    let {
      source,
      resizeMode,
      defaultImage,
      defaultImageResizeMode,
      defaultImageStyle = {},
      imageStyle = {},
      errorImage,
      errorImageStyle = {},
      style = {}, // while style is set it will overright all image styles
    } = this.props;
    if (failToLoad) {
      // renders while image load failed
      return (
        <FastImage
          source={errorImage}
          resizeMode={resizeMode || 'cover'}
          style={style ? style : [styles.errorImageStyle, errorImageStyle]}
        />
      );
    } else if (loadComplete) {
      // after cache network image
      return (
        <FastImage
          source={source}
          resizeMode={resizeMode || 'cover'}
          style={style ? style : [styles.imageStyle, imageStyle]}
        />
      );
    } else {
      // default image rendering
      return (
        <ImageBackground
          source={defaultImage}
          style={style ? style : [styles.defaultImageStyle, defaultImageStyle]}
          resizeMode={defaultImageResizeMode || 'cover'}>
          {(this.props.isBase64 && (
            <Image
              source={source}
              resizeMode={resizeMode || 'cover'}
              style={style ? style : [styles.imageStyle, imageStyle]}
            />
          )) || (
            <View
              style={[style, {justifyContent: 'center', alignItems: 'center'}]}>
              <FastImage
                source={source}
                onError={() => this.setState({failToLoad: true})}
                onLoad={() => this.setState({loadComplete: true})}
                onLoadStart={() => this.setState({loadComplete: false})}
                resizeMode={resizeMode || 'cover'}
                style={style} // I know, Hack for load image! :)
              />
              <View style={styles.loaderStyle}>
                <ActivityIndicator
                  size={'small'}
                  color={COLORS.white}
                  animating={true}
                />
              </View>
            </View>
          )}
        </ImageBackground>
      );
    }
  }
}

let styles = StyleSheet.create({
  container: {},
  imageStyle: {
    height: 150,
    width: 150,
  },
  defaultImageStyle: {
    height: 150,
    width: 150,
  },
  errorImageStyle: {
    height: 150,
    width: 150,
  },
  loaderStyle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {DefaultImage};
