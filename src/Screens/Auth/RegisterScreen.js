import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import SpaceComponent from '../../components/SpaceComponent';
import RowComponent from '../../components/RowComponent';
import TextComponent from '../../components/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColor} from '../../constants/appColor';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import {globalStyle} from '../../styles/globalStyle';
import {validateEmail, validatePhone} from '../../utils/Validators';
import AxiosInstance from '../../helpers/AxiosInstance';
import LoadingModal from '../../modal/LoadingModal';
import {loginWithSocial} from '../../Redux/API/UserAPI';
import {useDispatch, useSelector} from 'react-redux';

const RegisterScreen = ({navigation, route}) => {
  const {Brand, Plate, userInfo} = route.params || {};
  const {status, error} = useSelector(state => state.login);
  const [regbtn, setregbtn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleBrand, setvehicleBrand] = useState(null);
  const [vehiclePlate, setvehiclePlate] = useState(null);
  const [correct, setCorrect] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const emailcheck = validateEmail(email);
    const phonecheck = validatePhone(phone);
    const passcheck = checkpass(password);
    !name ||
    !email ||
    !phone ||
    !rePassword ||
    !phone ||
    !password ||
    !emailcheck ||
    !phonecheck ||
    !vehicleBrand ||
    !vehiclePlate ||
    vehiclePlate.length < 14 ||
    passcheck
      ? setCorrect(false)
      : setCorrect(true);
  }, [email, password, phone, rePassword, vehicleBrand, vehiclePlate, name]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setvehicleBrand(Brand);
      setvehiclePlate(Plate);
    });
    return unsubscribe;
  }, [navigation, Brand, Plate]);

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.givenName);
      //setsocialinfo(userInfo);
    }
  }, []);
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

  //quản lí đăng nhập
  useEffect(() => {
    if (status == 'success' && regbtn == true) {
    }
    console.log(status);
  }, [status]);

  const gotoAuthentic = () => {
    const body = {
      name,
      email,
      password,
      phone,
      gender: 'male',
      vehicleBrand,
      vehiclePlate,
    };
    if (body) {
      navigation.navigate('Authentic', {body});
    }
  };
  return (
    <View style={[globalStyle.container, {paddingBottom: '3%'}]}>
      <ScrollView style={{flex: 1}}>
        <Image
          source={require('../../assets/images/auth/login-regis/logo.png')}
        />
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
        <SpaceComponent height={10} />

        <InputComponent
          label={'Họ tên'}
          placeholder={'Nhập tên'}
          value={name}
          onChangeText={text => setName(text)}
          error={name ? null : 'Thiếu thông tin!'}
        />
        <SpaceComponent height={10} />
        <InputComponent
          label={'Email'}
          placeholder={'Nhập email'}
          value={email}
          onChangeText={text => setEmail(text)}
          error={email ? checkEmail(email) : 'Thiếu thông tin!'}
        />
        <SpaceComponent height={10} />
        <InputComponent
          label={'Số điện thoại'}
          placeholder={'Nhập số điện thoại'}
          value={phone}
          onChangeText={text => setPhone(text)}
          error={phone ? checkPhone(phone) : 'Thiếu thông tin!'}
        />
        <SpaceComponent height={10} />
        <InputComponent
          label={'Mật khẩu'}
          placeholder={'Nhập mật khẩu'}
          value={password}
          onChangeText={text => setPassword(text)}
          error={password ? checkpass(password) : 'Thiếu thông tin!'}
          isPassword
        />
        <SpaceComponent height={10} />
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
        <SpaceComponent height={10} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MotoInfo', {
              Brand: vehicleBrand,
              Plate: vehiclePlate,
            });
          }}
          style={styles.input}>
          <TextComponent text={'Mẫu xe: ' + (vehicleBrand ?? 'Trống')} />
          <TextComponent text={'Biển số xe: ' + (vehiclePlate ?? 'Trống')} />
        </TouchableOpacity>
        <SpaceComponent height={30} />
        <ButtonComponent
          text={'Tạo tài khoản'}
          color={appColor.white}
          onPress={() => {
            correct ? gotoAuthentic() : null;
          }}
          styles={{opacity: correct ? 1 : 0.5}}
        />
        <SpaceComponent height={20} />
        <ButtonComponent
          text={'Trở về đăng nhập'}
          color={appColor.primary}
          backgroundColor={appColor.white}
          onPress={() => navigation.navigate('Login')}
        />
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  a: {
    paddingBottom: 50,
  },
  input: {
    marginTop: 10,
    backgroundColor: appColor.white,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    padding: 18,
    height: 58,
    color: appColor.text,
    borderColor: appColor.lightgray,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
