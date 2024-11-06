import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {appInfor} from '../constants/appInfor';
import {appColor} from '../constants/appColor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  useEffect(() => {
    const clearMessageList = async () => {
      try {
        await AsyncStorage.removeItem('messageList');
        console.log('Message list cleared successfully.');
      } catch (error) {
        console.error('Failed to clear message list:', error);
      }
    };

    clearMessageList();
  }, []);
  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/images/auth/Splash/background.png')}>
      <Image
        style={styles.logo}
        source={require('../assets/images/auth/Splash/logo.png')}
      />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColor.white,
  },
  logo: {
    width: appInfor.sizes.width * 0.26,
    resizeMode: 'contain',
  },
});
