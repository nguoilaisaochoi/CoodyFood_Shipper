import {View, Text} from 'react-native';
import React from 'react';
import TextComponent from '../TextComponent';
import {fontConfig} from 'react-native-paper/lib/typescript/styles/fonts';
import {fontFamilies} from '../../constants/fontFamilies';

const OrderSummaryItem = ({title, price, isbold}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '3%',
      }}>
      <TextComponent
        text={title}
        fontFamily={isbold ? fontFamilies.bold : null}
      />
      <TextComponent
        text={price}
        fontFamily={isbold ? fontFamilies.bold : null}
      />
    </View>
  );
};

export default OrderSummaryItem;
