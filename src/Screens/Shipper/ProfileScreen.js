import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import HeaderComponent from '../../components/HeaderComponent';
import {appColor} from '../../constants/appColor';
import TextComponent from '../../components/TextComponent';
import TextInputComponent from './ComposenentShipper/TextInputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {validateEmail, validatePhone} from '../../utils/Validators';
import {GetShipper, UpdateShipper} from '../../Redux/Reducers/ShipperReducer';
import LoadingModal from '../../modal/LoadingModal';
import SelectImage from './ComposenentShipper/SelectImage';

const ProfileScreen = () => {
  const {user} = useSelector(state => state.login);
  const {updateStatus, getData} = useSelector(state => state.shipper);
  const [name, setName] = useState(getData.name ?? null);
  const [email, setEmail] = useState(getData.email ?? null);
  const [phone, setPhone] = useState(getData.phone ?? null);
  const [birthDate, setbirthDate] = useState(getData.birthDate ?? null);
  const [gender, setGender] = useState(getData.gender == 'male' ? 'Nam' : 'Nữ');
  const [imagePath, setImagePath] = useState(null);
  const [avatar, setAvatar] = useState(getData.image[0] ?? null);
  const [vehicleBrand, setvehicleBrand] = useState(
    getData.vehicleBrand ?? null,
  );
  const [vehiclePlate, setvehiclePlate] = useState(
    getData.vehiclePlate ?? null,
  );
  const [showPicker, setshowPicker] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [correct, setCorrect] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isclick, setisClick] = useState(false);
  const sheetRef = useRef(null); //lưu giá trị mà không cần phải rerender lại khi giá trị thay đổi
  const dispath = useDispatch();
  //check phone
  const checkPhone = data => {
    return validatePhone(data) ? null : 'Số điện thoại không hợp lệ';
  };
  //check email
  const checkEmail = data => {
    return validateEmail(data) ? null : 'Email không hợp lệ';
  };
  //cập nhật shipper lên api
  const update = () => {
    const body = {
      name: name,
      phone: phone,
      email: email,
      birthDate: new Date(birthDate),
      vehicleBrand: vehicleBrand,
      vehiclePlate: vehiclePlate,
      gender: gender == 'Nam' ? 'male' : 'female',
      status: 'active',
      image: avatar,
    };
    dispath(UpdateShipper({id: user._id, data: body}));
  };
  //quản lí state correct
  useEffect(() => {
    const checkphone = checkPhone(phone);
    const checkemail = checkEmail(email);
    !name ||
    !phone ||
    !email ||
    !vehicleBrand ||
    vehiclePlate.length < 14 ||
    checkemail ||
    checkphone
      ? setCorrect(false)
      : setCorrect(true);
  }, [name, phone, email, vehicleBrand, vehiclePlate]);

  //thông báo cập nhật
  useEffect(() => {
    if (updateStatus == 'succeeded' && isclick) {
      ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
      setIsLoading(false);
      dispath(GetShipper(user._id));
      setisClick(false);
    } else if (updateStatus == 'failed' && isclick) {
      ToastAndroid.show('Cập nhật thất bại', ToastAndroid.SHORT);
      setIsLoading(false);
      setisClick(false);
    }
  }, [updateStatus]);
  //hàm xử lí khi DateTimePicker đc bật
  const handleDateChange = (event, selectedDate) => {
    if (event.type == 'set') {
      const currentDate = selectedDate;
      setbirthDate(currentDate);
    }
    setshowPicker(false);
  };

  useEffect(() => {
    if (imagePath) {
      setAvatar(imagePath.uri);
    }
  }, [imagePath]);
  //
  return (
    <View style={styles.container}>
      <HeaderComponent text={'Thông tin cá nhân'} isback={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          {/*avatar*/}
          <TouchableOpacity
            style={styles.body1}
            activeOpacity={0.85}
            onPress={() => {
              setIsSheetOpen(true);
            }}>
            <View style={styles.boximg}>
              <Image
                style={{width: 99, height: 99}}
                source={{
                  uri: avatar
                    ? avatar
                    : 'https://res.cloudinary.com/djywo5wza/image/upload/v1729757743/clone_viiphm.png',
                }}
              />
            </View>
            <Image
              style={styles.camera}
              source={require('../../assets/images/shipper/camera.png')}
            />
          </TouchableOpacity>
          <View style={styles.rate}>
            <TextComponent text={'Đánh giá: '} color={appColor.subText} />
            <TextComponent text={'5' + ' '} />
            <Image
              style={{width: 15, height: 15}}
              source={require('../../assets/images/shipper/star.png')}
            />
          </View>
        </View>
        {/*text input*/}
        <TextInputComponent
          text={'HỌ VÀ TÊN'}
          value={name}
          onChangeText={text => setName(text)}
          error={name ? null : 'Đây là thông tin bắt buộc'}
        />
        <TextInputComponent
          text={'EMAIL'}
          value={email}
          onChangeText={text => setEmail(text)}
          error={email ? checkEmail(email) : 'Đây là thông tin bắt buộc'}
        />
        <TextInputComponent
          text={'SỐ ĐIỆN THOẠI'}
          value={phone}
          onChangeText={text => setPhone(text)}
          error={phone ? checkPhone(phone) : 'Đây là thông tin bắt buộc'}
        />
        <TextComponent text={'GIỚI TÍNH'} />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={{}}
          itemTextStyle={{color: appColor.text}}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={gender}
          value={gender}
          onChange={item => {
            setGender(item.value);
          }}
        />
        <TextComponent text={'NGÀY SINH'} fontFamily={fontFamilies.bold} />
        <View>
          <TouchableOpacity
            onPress={() => {
              setshowPicker(true);
            }}
            style={styles.button}
            activeOpacity={0.5}>
            <TextComponent
              fontFamily={fontFamilies.regular}
              fontsize={14}
              text={
                birthDate
                  ? new Date(birthDate).toLocaleDateString('vi-VN')
                  : '--/--/----'
              }
              styles={{opacity: 0.5}}
            />
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              mode={'date'}
              value={new Date(birthDate) || new Date()}
              onChange={handleDateChange}
            />
          )}
        </View>
        <TextInputComponent
          text={'HÃNG XE'}
          onChangeText={text => setvehicleBrand(text)}
          value={vehicleBrand}
          error={vehicleBrand ? null : 'Đây là thông tin bắt buộc'}
        />
        <TextInputComponent
          text={'BIỂN SỐ XE'}
          onChangeText={text => setvehiclePlate(text.toUpperCase())}
          value={vehiclePlate}
          mask={'99 - AA 999.99'}
          error={
            vehiclePlate
              ? vehiclePlate.length == 14
                ? null
                : 'Hãy điền đầy đủ thông tin'
              : 'Hãy điền đầy đủ thông tin'
          }
        />
        <View style={styles.footer}>
          <ButtonComponent
            text={'Cập nhật'}
            color={appColor.white}
            height={51}
            styles={{opacity: correct ? 1 : 0.5, marginBottom: '5%'}}
            onPress={
              correct
                ? () => {
                    update();
                    setIsLoading(true);
                    setisClick(true);
                  }
                : null
            }
          />
        </View>
      </ScrollView>
      {isSheetOpen && (
        <SelectImage
          setImagePath={setImagePath}
          setIsSheetOpen={setIsSheetOpen}
        />
      )}
      <LoadingModal visible={isLoading} />
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor.white,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '12%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  bg: {
    backgroundColor: 'rgba(217.81, 217.81, 217.81, 0.50)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  optionavatar: {
    flex: 1,
    zIndex: 2,
    backgroundColor: appColor.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  body1: {
    width: 97,
    height: 95,
  },
  boximg: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: appColor.subText,
  },
  camera: {
    position: 'absolute',
    width: 30,
    height: 30,
    zIndex: 1,
    bottom: -13,
    right: -13,
  },
  dropdown: {
    backgroundColor: appColor.white,
    padding: 18,
    height: 58,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColor.input,
  },
  placeholder: {
    color: appColor.text,
    opacity: 0.5,
  },
  selectedTextStyle: {
    color: appColor.text,
    opacity: 0.5,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    height: 58,
    marginTop: 10,
    marginBottom: 15,
    borderColor: appColor.input,
    padding: 18,
  },
  rate: {
    marginTop: '4.3%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
//data cho dropdown
const data = [
  {label: 'Nam', value: 'Nam'},
  {label: 'Nữ', value: 'Nữ'},
];
