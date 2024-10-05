import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../Screens/Auth/OnboardingScreen';
import RegisterScreen from '../Screens/Auth/RegisterScreen';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import VerifyScreen from '../Screens/Auth/VerifyScreen';
import ResetPasswordScreen from '../Screens/Auth/ResetPasswordScreen';
import AddPhoneScreen from '../Screens/Auth/AddPhoneScreen';
import MainNavigation from './MainNavigation';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={MainNavigation} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="AddPhone" component={AddPhoneScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
