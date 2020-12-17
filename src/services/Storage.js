import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  static getGroups = () => {
    return AsyncStorage.getItem('groups');
  };

  static setGroups = (groups) => {
    return AsyncStorage.setItem('groups', groups);
  };

  // static removeGroup = () => {
  //   return AsyncStorage.removeItem('token');
  // };
}