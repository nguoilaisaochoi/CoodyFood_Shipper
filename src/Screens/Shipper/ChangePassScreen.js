import {View, StyleSheet, ToastAndroid, ScrollView} from 'react-native';
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
  const [repass, setRepass] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [correct, setcorrect] = useState(false);
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
      setIsLoading(false);
    }
  }, [ChangePasswordStatus]);
  useEffect(() => {
    oldpass && newpass && repass && repass == newpass && newpass.length >= 6
      ? setcorrect(true)
      : setcorrect(false);
  }, [oldpass, newpass, repass]);
  return (
    <View style={styles.container}>
      <HeaderComponent isback={true} text={'Đổi mật khẩu'} />
      <ScrollView style={{flex: 1}}>
        <PassInputComponent
          text={'Mật khẩu cũ'}
          placeholder={'Nhập mật khẩu'}
          value={oldpass}
          onChangeText={text => setOldpass(text)}
          isPassword={true}
        />
        <PassInputComponent
          text={'Mật khẩu mới'}
          placeholder={'Tối thiểu 6 ký tự'}
          value={newpass}
          onChangeText={text => setNewpass(text)}
          isPassword={true}
        />
        <PassInputComponent
          text={'Xác nhận mật khẩu mới'}
          placeholder={'Xác nhận mật khẩu mới'}
          value={repass}
          onChangeText={text => setRepass(text)}
          isPassword={true}
          error={repass != newpass ? 'Mật khẩu không khớp' : null}
        />
        <TextComponent text="* Đổi mật khẩu thành công, tài khoản sẽ đăng xuất" />
      </ScrollView>

      <ButtonComponent
        text={'Thay đổi'}
        color={appColor.white}
        height={51}
        onPress={() => {
          if (correct) {
            changepass();
            setIsLoading(true);
          }
        }}
        styles={{opacity: correct ? 1 : 0.5}}
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
