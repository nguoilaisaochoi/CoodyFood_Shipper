import {View, StyleSheet, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import {appColor} from '../../constants/appColor';
import {useDispatch, useSelector} from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent';
import {logout} from '../../Redux/Reducers/LoginSlice';
import LoadingModal from '../../modal/LoadingModal';
import {ChangePassword} from '../../Redux/Reducers/ShipperReducer';
import PassInputComponent from './ComposenentShipper/PassInputComponent';
import TextComponent from '../../components/TextComponent';


const ChangePassScreen = () => {
  const {user} = useSelector(state => state.login); //thông tin khi đăng nhập
  const {ChangePasswordStatus} = useSelector(state => state.shipper);
  const [oldpass, setOldpass] = useState(null);
  const [newpass, setNewpass] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const changepass = () => {
    const body = {
      email: user.email,
      oldPassword: oldpass,
      newPassword: newpass,
    };
    dispatch(ChangePassword({data: body}));
  };
  //
  useEffect(() => {
    if (ChangePasswordStatus == 'succeeded' && isLoading) {
      ToastAndroid.show('Thành công! Hãy đăng nhập lại', ToastAndroid.SHORT);
      dispatch(logout());
      setIsLoading(false);
    } else if (ChangePasswordStatus == 'failed' && isLoading) {
      ToastAndroid.show('Đổi mật khẩu thất bại', ToastAndroid.SHORT);
      setIsLoading(false);
    }
  }, [ChangePasswordStatus]);
  return (
    <View style={styles.container}>
      <HeaderComponent isback={true} text={'Đổi mật khẩu'} />
      <View style={{flex: 1}}>
        <PassInputComponent
          text={'Mật khẩu cũ'}
          value={oldpass}
          onChangeText={text => setOldpass(text)}
          isPassword={true}
        />
        <PassInputComponent
          text={'Mật khẩu mới'}
          value={newpass}
          onChangeText={text => setNewpass(text)}
          isPassword={true}
        />
        <TextComponent text="* Đổi mật khẩu thành công, tài khoản sẽ đăng xuất" />
      </View>

      <ButtonComponent
        text={'Thay đổi'}
        color={appColor.white}
        height={51}
        onPress={() => {
          {
            changepass();
            setIsLoading(true);
          }
        }}
      />
      <LoadingModal visible={isLoading} />
    </View>
  );
};

export default ChangePassScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor.white,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '12%',
    padding: '5%',
  },
});
