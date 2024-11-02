import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {appColor} from '../../constants/appColor';
import ItemAccount from './ComposenentShipper/ItemAccount';
import {useNavigation} from '@react-navigation/native';
import {logout} from '../../Redux/Reducers/LoginSlice';
import {useDispatch, useSelector} from 'react-redux';
import {GetShipper} from '../../Redux/Reducers/ShipperReducer';

const Account = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.login);
  const {getData, getStatus} = useSelector(state => state.shipper);
  const dispatch = useDispatch();

  //navigation
  const gotoScreen = screen => {
    navigation.navigate(screen);
  };

  //lay thông tin shipper trước khi vào thông tin tài khoản
  useEffect(() => {
    dispatch(GetShipper(user._id));
  }, []);

  // log  thông tin shipper
  useEffect(() => {
    getStatus == 'succeeded' &&
      console.info(
        '\x1b[34m[Account.js___GetShipper]\x1b[0m',
        JSON.stringify(getData),
      );
  }, [getStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ItemAccount
          screen={() => {
            gotoScreen('Profile');
          }}
          text={'Thông tin cá nhân của bạn'}
          icon={'user'}
        />
        <ItemAccount
          text={' Lịch sử nạp rút tiền'}
          icon={'setting'}
          screen={() => {
            gotoScreen('CallScreen');
          }}
        />
        <ItemAccount text={'Đổi mật khẩu'} icon={'padlock'} />
        <ItemAccount
          text={'Đăng xuất'}
          screen={() => {
            dispatch(logout());
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
