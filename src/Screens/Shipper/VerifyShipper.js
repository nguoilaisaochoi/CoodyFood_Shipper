import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

import {fontFamilies} from '../../constants/fontFamilies';
import BtnComponent from './ComposenentShipper/BtnComponent';
import {appColor} from '../../constants/appColor';
import {logout} from '../../Redux/Reducers/LoginSlice';
import {useDispatch, useSelector} from 'react-redux';
import TextComponent from '../../components/TextComponent';

const VerifyShipper = ({navigation}) => {
  const dispatch = useDispatch();
  const {getStatus, getData} = useSelector(state => state.shipper);
  const [navigated, setNavigated] = useState(false);
  useEffect(() => {
    if (getData.vehicleBrand && !navigated) {
      setNavigated(true);
      navigation.replace('Tab');
    }
  }, [getData]);
  return (
    <View style={styles.container}>
      <TextComponent
        text={`Để hoàn tất quy trình đăng ký tài xế, chúng tôi cần bạn bổ sung một số thông tin từ tài khoản ${getData.email}.`}
        fontsize={30}
        fontFamily={fontFamilies.bold}
      />
      <View style={{gap: 10}}>
        <BtnComponent
          text={'XÁC NHẬN'}
          color={appColor.white}
          height={51}
          fontFamily={fontFamilies.bold}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <BtnComponent
          text={'ĐĂNG XUẤT'}
          color={appColor.white}
          height={51}
          fontFamily={fontFamilies.bold}
          onPress={() => {
            dispatch(logout());
          }}
        />
      </View>
    </View>
  );
};

export default VerifyShipper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '6%',
    paddingTop: '10%',
    justifyContent: 'space-between',
    backgroundColor: appColor.white,
  },
});
