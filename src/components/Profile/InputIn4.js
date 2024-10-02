import {View, TextInput} from 'react-native';
import React from 'react';
import {fontFamilies} from '../../constants/fontFamilies';
import TextComponent from '../TextComponent';
import {appColor} from '../../constants/appColor';

const InputIn4 = ({text, value, setdata, error}) => {
  return (
    <View style={{paddingBottom: '5%'}}>
      <TextComponent
        text={text}
        fontFamily={fontFamilies.bold}
        color={error == '' ? null : appColor.primary}
      />
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderColor: error == '' ? '#CED7DF' : appColor.primary,
          marginBottom: '1%',
          color: appColor.text
        }}
        value={value}
        onChangeText={text => {
          setdata(text);
        }}
      />
      {error == '' ? null : (
        <TextComponent text={error} fontsize={12} color={appColor.primary} />
      )}
    </View>
  );
};

export default InputIn4;
