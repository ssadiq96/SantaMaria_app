import { Dimensions, Platform, StatusBar } from 'react-native';
import deviceInfoModule from 'react-native-device-info';

export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 780 || dimen.width === 780) || (dimen.height === 812 || dimen.width === 812) || (dimen.height === 844 || dimen.width === 844) || (dimen.height === 896 || dimen.width === 896) || (dimen.height === 926 || dimen.width === 926)));
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

export function getStatusBarHeight(safe) {
    return Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: StatusBar.currentHeight,
        default: 0
    });
}

export function getBottomSpace() {
    return isIphoneX() ? 34 : 0;
}

/**
 * 
 * @param {*} value 
 * @returns bottom value need to add as space
 */
export function getBottomMoreSpace(value) {
    if (Platform.OS == "android") {
        return value
    }
    else {
        return isIphoneX() ? 34 : value;
    }
}

/**get the height for device */
export function getHeight(value) {
    if (Platform.OS == "android") {
        return value - 5
    }
    else {
        return deviceInfoModule.hasNotch() ? value + 25 : value
    }
}