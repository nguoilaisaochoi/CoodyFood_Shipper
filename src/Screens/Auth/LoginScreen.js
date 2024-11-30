import {Alert, Image, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TextComponent from '../../components/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColor} from '../../constants/appColor';
import RowComponent from '../../components/RowComponent';
import SpaceComponent from '../../components/SpaceComponent';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import {appInfor} from '../../constants/appInfor';
import {globalStyle} from '../../styles/globalStyle';
import ContainerComponent from '../../components/ContainerComponent';
import {useDispatch, useSelector} from 'react-redux';
import {login, loginWithSocial} from '../../Redux/API/UserAPI';
import LoadingModal from '../../modal/LoadingModal';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, Profile, Settings} from 'react-native-fbsdk-next';
import AxiosInstance from '../../helpers/AxiosInstance';

GoogleSignin.configure({
  webClientId:
    '579678214190-9acmo8gjkg01kl2epuv0a4bhfvmhgrk7.apps.googleusercontent.com',
});
Settings.setAppID('825915416410531');

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPass, setErrorPass] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {user, status, error} = useSelector(state => state.login);
  const [signbtn, setsignbtn] = useState(false);


  const changeEmail = data => {
    setEmail(data);
    setErrorEmail('');
  };
  const changePass = data => {
    setPassword(data);
    setErrorPass('');
  };
  const handleLogin = async () => {
    try {
      setsignbtn(true);
      setIsLoading(true);
      dispatch(login({identifier: email, password}));
    } catch (error) {}
  };

  //quản lí đăng nhập
  useEffect(() => {
    if (status == 'failed' && signbtn == true) {
      setIsLoading(false);
      setTimeout(() => {
        Alert.alert('Thông báo', 'Thông tin đăng nhập không đúng');
        setsignbtn(true);
      }, 200);
    } else if (
      status == 'success' &&
      signbtn == true &&
      user?.role != 'shipper'
    ) {
      setIsLoading(false);
      setTimeout(() => {
        Alert.alert('Thông báo', 'Thông tin đăng nhập không đúng');
        setsignbtn(true);
      }, 200);
    }
  }, [status]);

  const handleLoginWithGG = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const usergg = await GoogleSignin.signIn();
      // console.log('usergg: ', usergg);
      const userInfo = usergg.data.user;
      console.log('userInfo: ', userInfo);
      const response = await AxiosInstance().post('/users/check-user', {
        email: userInfo.email,
      });
      if (response.data == true) {
        dispatch(loginWithSocial({userInfo}));
      } else {
        navigation.navigate('Register', {userInfo});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWithFB = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        const profile = await Profile.getCurrentProfile();
        console.log('profile: ', profile);
        if (profile) {
          const userInfo = {
            email: profile.userID,
            name: profile.name,
            photo: profile.imageURL,
          };
          const response = await AxiosInstance().post('/users/check-user', {
            email: userInfo.email,
          });
          if (response.data == true) {
            dispatch(loginWithSocial({userInfo}));
          } else {
            navigation.navigate('Register', {userInfo});
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ContainerComponent styles={globalStyle.container}>
      <Image
        source={require('../../assets/images/auth/login-regis/logo.png')}
      />

      <RowComponent>
        <TextComponent
          text={'Coody Shipper '}
          fontsize={28}
          fontFamily={fontFamilies.bold}
          color={appColor.primary}
        />
        <TextComponent
          text={'Xin Chào'}
          fontsize={28}
          fontFamily={fontFamilies.bold}
        />
      </RowComponent>
      <SpaceComponent height={10} />
      <TextComponent
        text={'Vui lòng nhập thông tin của bạn'}
        fontFamily={fontFamilies.bold}
        color={appColor.subText}
      />
      <SpaceComponent height={40} />
      <InputComponent
        label={'Tài khoản'}
        placeholder={'Nhập email/SĐT'}
        value={email}
        onChangeText={text => changeEmail(text)}
        error={errorEmail}
      />
      {errorEmail && (
        <View style={{marginTop: 5}}>
          <TextComponent
            text={errorEmail}
            color={appColor.primary}
            fontsize={11}
          />
        </View>
      )}
      <SpaceComponent height={30} />
      <InputComponent
        label={'Mật khẩu'}
        placeholder={'Nhập mật khẩu'}
        value={password}
        error={errorPass}
        onChangeText={text => changePass(text)}
        isPassword
      />
      {errorPass && (
        <View style={{marginTop: 5}}>
          <TextComponent
            text={errorPass}
            color={appColor.primary}
            fontsize={11}
          />
        </View>
      )}
      <SpaceComponent height={12} />
      <RowComponent justifyContent="flex-end">
        <ButtonComponent
          type={'link'}
          text={'Quên mật khẩu?'}
          fontsize={14}
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </RowComponent>
      <SpaceComponent height={30} />
      <ButtonComponent
        text={'Đăng nhập'}
        color={appColor.white}
        onPress={() => {
          handleLogin();
        }}
      />
      <SpaceComponent height={20} />
      <ButtonComponent
        text={'Tạo tài khoản'}
        color={appColor.primary}
        backgroundColor={appColor.white}
        onPress={() => navigation.navigate('Register')}
      />
      <SpaceComponent height={30} />
      <TextComponent
        text={'Hoặc đăng nhập bằng'}
        color={appColor.subText}
        textAlign="center"
      />
      <SpaceComponent height={30} />
      <RowComponent justifyContent="space-between">
        <ButtonComponent
          width={appInfor.sizes.width * 0.37}
          height={51}
          icon={
            <Image
              source={require('../../assets/images/auth/login-regis/gg.png')}
            />
          }
          text={'Google'}
          backgroundColor={appColor.white}
          borderColor={appColor.subText}
          onPress={handleLoginWithGG}
        />
        <ButtonComponent
          width={appInfor.sizes.width * 0.37}
          height={51}
          icon={
            <Image
              source={require('../../assets/images/auth/login-regis/fb.png')}
            />
          }
          text={'Facebook'}
          backgroundColor={appColor.white}
          borderColor={appColor.subText}
          onPress={handleLoginWithFB}
        />
      </RowComponent>
      {/* <ButtonComponent text={'Clear'} onPress={() => dispatch(logout())} type={'link'} /> */}
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  a: {
    fontFamily: fontFamilies.medium,
    color: appColor.primary,
  },
});
