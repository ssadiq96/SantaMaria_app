import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

/**
 * exporting deviceHeight, deviceWidth, devicetype and stateusBarHeight
 */
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const deviceType = Platform.OS === 'ios' ? 2 : 1;
export const statusbarHeight =
  Platform.OS === 'ios' ? (DeviceInfo.hasNotch() ? 44 : 20) : 0;

/**
 * All Common Texts of App
 */
export const ConstantsText = {
  serverErrorMessage: 'Error del Servidor',
  noNetworkAlert: 'Sin conexión a Internet',
  requestTimeoutMessage: 'pide tiempo fuera',
  netTitle: 'Red',
  networkErrorMessage: 'error de red',
  somethingWrongText: 'Algo salió mal..',
  logOutMessage: '¿Estás segura de que quieres cerrar sesión?',
  appName: 'EarBoss',
};
