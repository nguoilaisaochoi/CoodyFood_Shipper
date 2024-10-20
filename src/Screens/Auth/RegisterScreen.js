import {Image, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import SpaceComponent from '../../components/SpaceComponent';
import RowComponent from '../../components/RowComponent';
import TextComponent from '../../components/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColor} from '../../constants/appColor';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import {appInfor} from '../../constants/appInfor';
import {globalStyle} from '../../styles/globalStyle';
import {
  validateEmail,
  validatePass,
  validatePhone,
} from '../../utils/Validators';
import AxiosInstance from '../../helpers/AxiosInstance';
import LoadingModal from '../../modal/LoadingModal';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    const emailcheck = validateEmail(email);
    const phonecheck = validatePhone(phone);
    const passcheck = checkpass(password);
    !email ||
    !phone ||
    !rePassword ||
    !phone ||
    !password ||
    !emailcheck ||
    !phonecheck ||
    passcheck
      ? setCorrect(false)
      : setCorrect(true);
  }, [email, password, phone, rePassword]);
  const checkEmail = data => {
    return validateEmail(data) ? null : 'Email không đúng định dạng';
  };

  const checkPhone = data => {
    return validatePhone(data) ? null : 'Số điện thoại không đúng định dạng';
  };
  const checkpass = pass => {
    return pass.length >= 6 ? null : 'Mật khẩu phải 6 ký tự trở lên';
  };

  const checkrepass = (pass, repass) => {
    return pass == repass ? null : 'Mật khẩu không khớp';
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosInstance().post('/shipper/add', {
        email,
        password,
        phone,
        gender: 'male',
        status: 'inactive',
        birthDate: new Date('2000-01-01'),
      });
      if (response.status == true) {
        ToastAndroid.show('Thành công', ToastAndroid.SHORT);
        setIsLoading(false);
        navigation.navigate('Login');
        return response.data;
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <ContainerComponent isScroll={true} styles={globalStyle.container}>
      <Image
        source={require('../../assets/images/auth/login-regis/logo.png')}
      />
      <SpaceComponent height={30} />
      <RowComponent>
        <TextComponent
          text={'Coody '}
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
      <SpaceComponent height={30} />
      <InputComponent
        label={'Email'}
        placeholder={'Nhập email'}
        value={email}
        onChangeText={text => setEmail(text)}
        error={email ? checkEmail(email) : 'Thiếu thông tin!'}
      />
      <SpaceComponent height={20} />
      <InputComponent
        label={'Số điện thoại'}
        placeholder={'Nhập số điện thoại'}
        value={phone}
        onChangeText={text => setPhone(text)}
        error={phone ? checkPhone(phone) : 'Thiếu thông tin!'}
      />
      <SpaceComponent height={20} />
      <InputComponent
        label={'Mật khẩu'}
        placeholder={'Nhập mật khẩu'}
        value={password}
        onChangeText={text => setPassword(text)}
        error={password ? checkpass(password) : 'Thiếu thông tin!'}
        isPassword
      />
      <SpaceComponent height={20} />
      <InputComponent
        label={'Xác nhận mật khẩu'}
        placeholder={'Nhập lại mật khẩu'}
        value={rePassword}
        onChangeText={text => setRePassword(text)}
        error={
          password ? checkrepass(password, rePassword) : 'Thiếu thông tin!'
        }
        isPassword
        isRePassword
      />
      <SpaceComponent height={30} />
      <ButtonComponent
        text={'Tạo tài khoản'}
        color={appColor.white}
        onPress={correct ? handleRegister : null}
        styles={{opacity: correct ? 1 : 0.5}}
      />
      <SpaceComponent height={20} />
      <ButtonComponent
        text={'Trở về đăng nhập'}
        color={appColor.primary}
        backgroundColor={appColor.white}
        onPress={() => navigation.navigate('Login')}
      />
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  a: {
    paddingBottom: 50,
  },
});
