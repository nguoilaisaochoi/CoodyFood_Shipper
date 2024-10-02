import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {appColor} from '../../../constants/appColor';

const TextComponent = ({text, fontsize, color, fontfamily, styles}) => {
  return (
    <Text
      style={[
        {
          color: color ? color : appColor.text,
          fontSize: fontsize ? fontsize : 14,
          fontFamily: fontfamily ? fontfamily : null,
        },
        styles ? styles : null,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
const styles = StyleSheet.create({});
