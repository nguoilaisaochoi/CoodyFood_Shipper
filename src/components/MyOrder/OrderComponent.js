import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { appColor } from '../../constants/appColor';
import TextComponent from '../TextComponent';
import { fontFamilies } from '../../constants/fontFamilies';
import { appInfor } from '../../constants/appInfor';

const OrderComponent = ({ order, selectedOrder, handleSelectOrder }) => {
  return (
    <TouchableOpacity
      style={styles.order}
      activeOpacity={0.9}
      onPress={() => {
        handleSelectOrder(order);
      }}>
      <TextComponent
        color={selectedOrder == order ? appColor.primary : appColor.lightgray}
        fontFamily={selectedOrder == order ? fontFamilies.extraBold : null}
        fontsize={18}
        text={order == 'delivered' ? 'Đã giao' : order == 'cart' ? 'Đơn nháp' : 'Đang giao'}
      />
    </TouchableOpacity>
  );
};

export default OrderComponent;
const styles = StyleSheet.create({
  order: {
    flex: 1,
    alignItems: 'center',
    padding: appInfor.sizes.width * 0.03,
  },
  selectorder: {


  },
});
