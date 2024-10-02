import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {appColor} from '../../../constants/appColor';

const CheckComponent = ({checked, height, start}) => {
  return (
    <View
      style={[
        styles.boxed,
      ]}>
      <Image
        style={[styles.imgcheck]}
        source={
          start
            ? checked
              ? require('../../../assets/images/shipper/checked.png')
              : require('../../../assets/images/shipper/noncheck.png')
            : require('../../../assets/images/shipper/ide.png')
        }
      />
    </View>
  );
};

export default CheckComponent;
const styles = StyleSheet.create({
  imgcheck: {
    flex: 1,
    resizeMode: 'contain',
  },
  boxed: {
    width: "9%",
    borderRadius: 30,
    padding: '1%',
    aspectRatio: 1,
    right: '0.8%',
    alignItems: 'center',
    backgroundColor: appColor.white,
  },
});
