import {View, StyleSheet} from 'react-native';
import React from 'react';
import {appColor} from '../../constants/appColor';
import TextComponent from './ComposenentShipper/TextComponent';
import BtnComponent from './ComposenentShipper/BtnComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import ItemAccount from './ComposenentShipper/ItemAccount';
import {useNavigation} from '@react-navigation/native';
import {logout} from '../../Redux/Reducers/LoginSlice';
import { useDispatch } from 'react-redux';

const Account = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const gotoScreen = screen => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headertext}>
          <TextComponent
            text={'Số dư của bạn'}
            fontsize={20}
            color={appColor.white}
            fontfamily={fontFamilies.bold}
          />
          <TextComponent
            text={'999.999.999đ'}
            fontsize={35}
            color={appColor.white}
            fontfamily={fontFamilies.bold}
          />
        </View>
        <View style={styles.btn}>
          <BtnComponent
            width={'30%'}
            text={'Nạp tiền'}
            backgroundColor={appColor.white}
            borderColor={appColor.white}
            fontFamily={fontFamilies.bold}
          />
          <BtnComponent
            width={'30%'}
            text={'Rút tiền'}
            backgroundColor={appColor.white}
            borderColor={appColor.white}
            fontFamily={fontFamilies.bold}
          />
        </View>
      </View>
      <View style={styles.body}>
        <ItemAccount
          screen={() => {
            gotoScreen('Profile');
          }}
          text={'Thông tin cá nhân của bạn'}
          icon={'user'}
        />
        <ItemAccount text={' Lịch sử nạp rút tiền'} icon={'setting'} />
        <ItemAccount text={'Đổi mật khẩu'} icon={'padlock'} />
        <ItemAccount
          text={'Đăng xuất'}
          screen={() => {
            dispatch(logout())
          }}
        />
      </View>
    </View>
  );
};

export default Account;
const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
    flex: 1,
    backgroundColor: appColor.white,
  },
  header: {
    flex: 1,
    backgroundColor: appColor.primary,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    padding: '2%',
  },
  body: {
    flex: 2,
    backgroundColor: appColor.white,
    padding: '10%',
    gap: 21,
  },
  headertext: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  btn: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  item: {
    flexShrink: 1,
    height: 58,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4%',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: appColor.input,
  },
  img: {
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
