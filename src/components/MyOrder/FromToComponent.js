import {View, Text} from 'react-native';
import React from 'react';
import TextComponent from '../TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';

const FromToComponent = ({text1, text2, color}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TextComponent
        text={text1}
        color={color}
        fontFamily={fontFamilies.bold}
        styles={{width: "10%"}}
      />
      <TextComponent text={text2} fontFamily={fontFamilies.medium} />
    </View>
  );
};

export default FromToComponent;
