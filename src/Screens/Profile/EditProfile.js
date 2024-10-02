import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import {appColor} from '../../constants/appColor';
import {appInfor} from '../../constants/appInfor';
import InputIn4 from '../../components/Profile/InputIn4';
import TextComponent from '../../components/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonComponent from '../../components/ButtonComponent';
import {validateEmail, validatePhone} from '../../utils/Validators';
import HeaderComponent from '../../components/HeaderComponent';

//SỬA LẠI HẾT ĐI 
const EditProfile = () => {
  const [name, setName] = useState('ABC');
  const [errorName, setErrorName] = useState('Email không được để trống');
  const [email, setEmail] = useState('abc@gmail.com');
  const [errorEmail, setErrorEmail] = useState('');
  const [phone, setPhone] = useState('0123456789');
  const [errorPhone, setErrorPhone] = useState('');
  const [address, setAddress] = useState('ABCDEF');
  const [errorAddress, setErrorAddress] = useState('');
  const [correct, setCorrect] = useState(true);
  const [date, setDate] = useState(null);
  const [showPicker, setshowPicker] = useState(false);
  //hàm xử lí khi DateTimePicker đc bật
  const handleDateChange = (event, selectedDate) => {
    if (event.type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      console.log("date "+date);
    }
    setshowPicker(false);
  };

  //check
  useEffect(() => {
    //email
    if (email.length < 1) {
      setErrorEmail('Email không được để trống');
    } else if (!validateEmail(email)) {
      setErrorEmail('Email không phù hợp');
    } else {
      setErrorEmail('');
    }
    //name
    if (name.length < 1) {
      setErrorName('Tên không được để trống');
    } else {
      setErrorName('');
    }
    //phone
    if (phone.length < 1) {
      setErrorPhone('Số điện thoại không được để trống');
    } else if (!validatePhone(phone)) {
      setErrorPhone('Số điện thoại không hợp lệ');
    } else {
      setErrorPhone('');
    }
    //address
    if (address.length < 1) {
      setErrorAddress('Địa chỉ không được để trống');
    } else {
      setErrorAddress('');
    }
  }, [email, phone, name, address]);

  //
  useEffect(() => {
    if (
      errorName.length != '' ||
      errorEmail != '' ||
      errorPhone != '' ||
      errorAddress != ''
    ) {
      setCorrect(false);
    } else {
      setCorrect(true);
    }
  }, [errorName, errorEmail, errorPhone, errorAddress]);
  return (
    <ContainerComponent
      styles={{
        backgroundColor: appColor.white,
      }}>
      <HeaderComponent text={'Chỉnh sửa hồ sơ'} isback={true} />
      {/*avatar*/}
      <TouchableOpacity style={styles.body1} activeOpacity={0.85}>
        <Image
          style={styles.camera}
          source={require('../../assets/images/profile/camera.png')}
        />
        <View style={styles.boximg}>
          <Image
            style={{flex: 1}}
            source={{
              uri: 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318840/Rectangle_201_ltuozm.jpg',
            }}
          />
        </View>
      </TouchableOpacity>
      {/*họ tên -> địa chỉ*/}
      <View style={styles.body2}>
        <InputIn4
          text={'Họ và tên'}
          value={name}
          setdata={setName}
          error={errorName}
        />
        <InputIn4
          text={'Email'}
          value={email}
          setdata={setEmail}
          error={errorEmail}
        />
        <InputIn4
          text={'Số điện thoại'}
          value={phone}
          setdata={setPhone}
          error={errorPhone}
        />
        <View style={{paddingBottom: '5%'}}>
          <TextComponent text={'Ngày sinh'} fontFamily={fontFamilies.bold} />
          <TouchableOpacity
            onPress={() => {
              setshowPicker(true);
            }}
            style={styles.inputdate}
            activeOpacity={0.5}>
            <TextComponent
              fontFamily={fontFamilies.regular}
              fontsize={14}
              text={date ? date.toLocaleDateString('vi-VN') : '--/--/----'}
            />
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              mode={'date'}
              value={date || new Date()}
              onChange={handleDateChange}
            />
          )}
        </View>
        <InputIn4
          text={'Địa chỉ'}
          value={address}
          setdata={setAddress}
          error={errorAddress}
        />
      </View>
      {/*nút cập nhật*/}
      <View style={styles.footer}>
        <ButtonComponent
          text={'Cập nhật'}
          color={appColor.white}
          styles={{opacity: correct ? 1 : 0.5}}
        />
      </View>
    </ContainerComponent>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  container: {backgroundColor: appColor.white},
  body1: {
    alignItems: 'center',
    padding: '3%',
    paddingBottom: appInfor.sizes.height * 0.052,
    flexShrink: 1,
  },
  boximg: {
    width: appInfor.sizes.width * 0.2,
    aspectRatio: 1,
    borderRadius: 99,
    overflow: 'hidden',
  },
  camera: {
    position: 'absolute',
    zIndex: 1,
    right: appInfor.sizes.width * 0.38,
    top: appInfor.sizes.height * 0.017,
    resizeMode: 'contain',
    width: appInfor.sizes.width * 0.07,
  },
  body2: {
    marginLeft: appInfor.sizes.width * 0.05,
    marginRight: appInfor.sizes.width * 0.05,
    marginBottom: appInfor.sizes.height * 0.02,
    height: appInfor.sizes.height * 0.6,
  },
  inputdate: {
    borderBottomWidth: 1,
    borderColor: '#CED7DF',
    paddingTop: appInfor.sizes.height * 0.015,
    paddingBottom: appInfor.sizes.height * 0.015,
  },
  footer: {
    margin: appInfor.sizes.width * 0.05,
  },
});
