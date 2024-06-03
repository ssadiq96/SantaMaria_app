import {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class StorageService extends Component {
  /**
   * storage comman keys
   */
  static KEYS = {
    LOGIN: 'LOGIN',
    SIGNIN: 'SIGN_IN',
  };

  static STORAGE_KEYS = {
    TOKENS: 'TOKENS',
    AUTH_TOKEN: 'AUTH TOKEN',
    DEVICE_TOKEN: 'DEVICE_TOKEN',
    USER_DETAILS: 'USER_DETAILS',
  };

  /** save item to local storage */
  static saveItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('saving error', e);
    }
  };

  /** get items from local storage */
  static getItem = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return await JSON.parse(value);
      }
    } catch (e) {
      console.error(' error reading value', e);
    }
  };

  /** delete item from local storage */
  static deleteItem = async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(`error while removing ${key}`, e);
    }
  };
}

export async function clearAllData(success, failure) {
  await AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(
      data => success(data),
      fail => failure(fail),
    );
}
