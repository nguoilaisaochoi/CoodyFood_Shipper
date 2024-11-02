import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../Screens/SplashScreen';
import MainNavigation from './MainNavigation';
import AuthNavigation from './AuthNavigation';
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';
const AppNavigation = () => {
  const {user} = useSelector(state => state.login);
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
    return () => clearTimeout(timeOut);
  }, []);
  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />
      {isShowSplash ? (
        <SplashScreen />
      ) : user?.role == 'shipper' ? (
        <MainNavigation />
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
