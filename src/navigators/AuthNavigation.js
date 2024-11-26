import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../Screens/Auth/OnboardingScreen';
import RegisterScreen from '../Screens/Auth/RegisterScreen';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import VerifyScreen from '../Screens/Auth/VerifyScreen';
import ResetPasswordScreen from '../Screens/Auth/ResetPasswordScreen';
import AddPhoneScreen from '../Screens/Auth/AddPhoneScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import MotorcycleInformation from '../Screens/Shipper/ComposenentShipper/MotorcycleInformation';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="AddPhone" component={AddPhoneScreen} />
      <Stack.Screen name="MotoInfo" component={MotorcycleInformation} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
