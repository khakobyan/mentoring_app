/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
// import { Provider } from "react-redux"
// import { store } from './src/store'
import Providers from './src/navigation'
// import Navigator from './src/Navigator';

const Content = () => (
  Platform.OS == 'android' ? 
  <SafeAreaView style={{flex: 1}}>
    <Providers/>
  </SafeAreaView> :
  <Providers/>
);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  // if (Text.defaultProps == null) Text.defaultProps = {};
  // if (TextInput.defaultProps == null) TextInput.defaultProps = {};
  // Text.defaultProps.allowFontScaling = false;
  // TextInput.defaultProps.allowFontScaling = false;
  return (
    <>
      {Platform.OS === 'ios' ? <StatusBar translucent backgroundColor='transparent' barStyle="light-content" /> : <StatusBar translucent backgroundColor='transparent' barStyle="dark-content" />}
      <Content />
    </>
  );
};

const AppStoreProvider = () => (
  // <Provider store={store}>
    <App />
  // </Provider>
);

export default AppStoreProvider;
