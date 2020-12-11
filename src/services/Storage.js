import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  static getToken = () => {
    return AsyncStorage.getItem('token');
  };

  static setToken = (token) => {
    return AsyncStorage.setItem('token', token);
  };

  static removeToken = () => {
    return AsyncStorage.removeItem('token');
  };

  static getId = () => {
    return AsyncStorage.getItem('id');
  };

  static setId = (id) => {
    return AsyncStorage.setItem('id', id);
  };

  static removeId = () => {
    return AsyncStorage.removeItem('id');
  };

  static getPassword = () => {
    return AsyncStorage.getItem('password');
  };

  static setPassword = (password) => {
    return AsyncStorage.setItem('password', password);
  };

  static removePassword = () => {
    return AsyncStorage.removeItem('password');
  };

  static getSecretCode = () => {
    return AsyncStorage.getItem('secret_code');
  };

  static setSecretCode = (secret_code) => {
    return AsyncStorage.setItem('secret_code', secret_code);
  };

  static removeSecretCode = () => {
    return AsyncStorage.removeItem('secret_code');
  };

  static getPhoneNumber = () => {
    return AsyncStorage.getItem('phone_number');  
  };

  static setPhoneNumber = (phone_number) => {
    return AsyncStorage.setItem('phone_number', phone_number);
  };
  
  static removePhoneNumber = () => {
    return AsyncStorage.removeItem('phone_number');
  };

  static getVisitedStatus = () => {
    return AsyncStorage.getItem('visited');  
  };

  static setVisitedStatus = (visited) => {
    return AsyncStorage.setItem('visited', visited);
  };
  
  static removeVisitedStatus = () => {
    return AsyncStorage.removeItem('visited');
  };

  static getBackgroundDate = () => {
    return AsyncStorage.getItem('background_date');  
  };

  static setBackgroundDate = (background_date) => {
    return AsyncStorage.setItem('background_date', background_date);
  };
  
  static removeBackgroundDate = () => {
    return AsyncStorage.removeItem('background_date');
  };
}