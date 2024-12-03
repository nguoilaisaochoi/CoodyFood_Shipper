import {View, StyleSheet, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';

import TextInputComponent from './TextInputComponent';
import HeaderComponent from '../../../components/HeaderComponent';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColor} from '../../../constants/appColor';

const MotorcycleInformation = ({navigation,route}) => {
  const {Brand, Plate} = route.params || {};
  const [vehicleBrand, setvehicleBrand] = useState(Brand??null);
  const [vehiclePlate, setvehiclePlate] = useState(Plate??null);
  //
  const save = () => {
    navigation.navigate('Register', {
      Brand: vehicleBrand,
      Plate: vehiclePlate,
    });
  };
  return (
    <View style={styles.container}>
      <HeaderComponent isback={true} text={'Thông tin xe'} />
      <View style={{flex: 1}}>
        <TextInputComponent
          text={'MẪU XE'}
          onChangeText={text => setvehicleBrand(text)}
          value={vehicleBrand}
          placeholder={"Honda Wave"}
        />
        <TextInputComponent
          text={'BIỂN SỐ XE'}
          placeholder={'77-AA 999.99'}
          onChangeText={text => setvehiclePlate(text.toUpperCase())}
          value={vehiclePlate}
          mask={'99 - AA 999.99'}
        />
      </View>

      <ButtonComponent
        text={'Lưu'}
        color={appColor.white}
        height={51}
        onPress={() => {
          save();
        }}
      />
    </View>
  );
};

export default MotorcycleInformation;
const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor.white,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '12%',
    padding: '5%',
  },
});
