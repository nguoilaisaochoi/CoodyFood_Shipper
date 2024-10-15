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
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {onOpenCamera} from './ComposenentShipper/CameraOpenComponent';
import {onImageLibrary} from './ComposenentShipper/ImageLibraryComponent';
import {validateEmail, validatePhone} from '../../utils/Validators';
import {GetShipper, UpdateShipper} from '../../Redux/Reducers/ShipperReducer';

const ProfileScreen = () => {
  const {user, state} = useSelector(state => state.login);
  const {updateData, updateStatus, getData} = useSelector(
    state => state.shipper,
  );
  const [name, setName] = useState(getData.name ?? null);
  const [email, setEmail] = useState(getData.email ?? null);
  const [phone, setPhone] = useState(getData.phone ?? null);
  const [carcompany, setCarcompany] = useState(getData.carcompany ?? null);
  const [licenseplate, setLicenseplate] = useState(
    getData.licenseplate ?? null,
  );
  const [date, setDate] = useState(getData.date ?? null);
  const [gender, setGender] = useState(getData.gender ?? null);
  const [imagePath, setImagePath] = useState(null);
  const [showPicker, setshowPicker] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sheetRef = useRef(null); //lưu giá trị mà không cần phải rerender lại khi giá trị thay đổi
  const clickRef = useRef(false);
  const dispath = useDispatch();
  //check phone
  const checkPhone = data => {
    return validatePhone(data) ? null : 'Số điện thoại không hợp lệ';
  };
  //check email
  const checkEmail = data => {
    return validateEmail(data) ? null : 'Email không hợp lệ';
  };
  //cập nhật shipper
  const update = () => {
    const body = {
      name: name,
      phone: phone,
      email: email,
    };
    console.log(body);
    dispath(UpdateShipper({id: user._id, data: body}));
  };

  useEffect(() => {
    if (updateStatus == 'succeeded' && clickRef.current == true) {
      ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
      dispath(GetShipper(user._id));
      clickRef.current = false;
    }
  }, [updateStatus]);
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
          placeholder={'Không công khai'}
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
        <TextInputComponent
          text={'HÃNG XE'}
          onChangeText={text => setCarcompany(text)}
          error={carcompany ? null : 'Đây là thông tin bắt buộc'}
        />
        <TextInputComponent
          text={'BIỂN SỐ XE'}
          onChangeText={text => setLicenseplate(text)}
          error={licenseplate ? null : 'Đây là thông tin bắt buộc'}
        />
        <View style={styles.footer}>
          <ButtonComponent
            text={'Cập nhật'}
            color={appColor.white}
            height={51}
            styles={{marginBottom: '5%'}}
            onPress={() => {
              update();
              clickRef.current = true;
            }}
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
        snapPoints={['18%']}
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
