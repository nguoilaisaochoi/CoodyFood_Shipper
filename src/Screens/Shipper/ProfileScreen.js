import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
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
import {useSelector} from 'react-redux';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {onOpenCamera} from './ComposenentShipper/CameraOpenComponent';
import {onImageLibrary} from './ComposenentShipper/ImageLibraryComponent';

const ProfileScreen = () => {
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
  const [value, setValue] = useState(null);
  const {user, state} = useSelector(state => state.login);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [imagePath, setImagePath] = useState();
  const sheetRef = useRef(null);
  //hàm xử lí khi DateTimePicker đc bật
  const handleDateChange = (event, selectedDate) => {
    if (event.type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      console.log('date ' + date);
    }
    setshowPicker(false);
  };
  // Mở Bottom Sheet
  const openSheet = () => {
    sheetRef.current.snapToIndex(0);
    setIsSheetOpen(true);
  };
  // Đóng Bottom Sheet
  const closeSheet = () => {
    sheetRef.current.close();
    setIsSheetOpen(false);
  };
  console.log(user);
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
              openSheet();
            }}>
            <View style={styles.boximg}>
              <Image
                style={{width: 99, height: 99}}
                source={{
                  uri: imagePath
                    ? imagePath
                    : 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318840/Rectangle_201_ltuozm.jpg',
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
          value={''}
          placeholder={'Tên Tài Xế'}
        />
        <TextInputComponent
          text={'EMAIL'}
          value={user.email}
          placeholder={'abc123@gmail.com'}
        />
        <TextInputComponent text={'SỐ ĐIỆN THOẠI'} placeholder={'0123456789'} />
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
          placeholder={data[0].label}
          value={value}
          onChange={item => {
            setValue(item.value);
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
              text={date ? date.toLocaleDateString('vi-VN') : '--/--/----'}
              styles={{opacity: 0.5}}
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
        <TextInputComponent text={'HÃNG XE'} placeholder={'Future(đen bóng)'} />
        <TextInputComponent text={'BIỂN SỐ XE'} placeholder={'43E-567-89'} />
        <View style={styles.footer}>
          <ButtonComponent
            text={'Cập nhật'}
            color={appColor.white}
            height={51}
            styles={{opacity: correct ? 1 : 0.5, marginBottom: '5%'}}
          />
        </View>
      </ScrollView>
      {isSheetOpen && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.bg}
          onPress={() => {
            closeSheet();
          }}
        />
      )}
      <BottomSheet
        ref={sheetRef}
        handleComponent={null}
        snapPoints={['20%']}
        index={-1}
        containerStyle={{flex: 1, zIndex: 2}}>
        <BottomSheetView style={styles.optionavatar}>
          <ButtonComponent
            text={'Chụp ảnh'}
            width={'40%'}
            color={appColor.white}
            height={51}
            onPress={() => {
              onOpenCamera(setImagePath);
              closeSheet();
            }}
          />
          <ButtonComponent
            text={'Thư viện'}
            width={'40%'}
            color={appColor.white}
            height={51}
            onPress={() => {
              onImageLibrary(setImagePath);
              closeSheet();
            }}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor.white,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '10%',
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
  {label: 'Nam', value: '1'},
  {label: 'Nữ', value: '2'},
];
