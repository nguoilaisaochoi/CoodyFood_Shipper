import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import {appColor} from '../../constants/appColor';

const ChangePassScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderComponent isback={true} text={'Đổi mật khẩu'} />
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
    paddingLeft: '5%',
    paddingRight: '5%',
  },
});
