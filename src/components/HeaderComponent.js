import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import { appInfor } from '../constants/appInfor';
import { appColor } from '../constants/appColor';
import { fontFamilies } from '../constants/fontFamilies';
import { useNavigation } from '@react-navigation/native';

/*
isback để hiện mũi tên quay lại(back): isback={true}
text để điền tên cho màn hinh: text={'name'}
<Header  isback={true} text={'Chỉnh Sửa Địa Chỉ'} />
*/
const HeaderComponent = ({ text, isback }) => {
  const navigation = useNavigation(); // Khai báo hook useNavigation

  const Back = () => {
    navigation.goBack(); // Sử dụng phương thức goBack để quay về trang trước
  };
  return (
    <View style={styles.header}>
      {isback && (
        <TouchableOpacity
          onPress={() => {
            Back();
          }}
          style={styles.button}>
          <Image
            style={styles.img}
            source={require('../../src/assets/images/header/back.png')}
          />
        </TouchableOpacity>
      )}
      <TextComponent text={text} styles={styles.title} fontsize={18} />
    </View>
  );
};

export default HeaderComponent;
const styles = StyleSheet.create({
  header: {
    backgroundColor: appColor.white,
    flexDirection: 'row',
    alignItems: 'center',
    // height: appInfor.sizes.height * 0.1,
    // padding: appInfor.sizes.width * 0.05,
    // paddingTop: appInfor.sizes.height * 0.08,
    paddingBottom: 30
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -4,
    textAlign: 'center',
    color: appColor.text,
    fontFamily: fontFamilies.bold,
    // transform: [{ translateY: -1 }],
  },
  button: {
    // width: appInfor.sizes.height * 0.04,
    // padding: '2%',

    zIndex: 1,
    // alignItems: 'center',
  },
  img: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});