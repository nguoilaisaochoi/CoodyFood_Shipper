import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {appColor} from '../../../constants/appColor';
import TextComponent from '../../../components/TextComponent';

const TextInputComponent = ({text, placeholder,value}) => {
  return (
    <View>
      <TextComponent text={text}/>
      <TextInput style={styles.textinput} value={value} placeholder={placeholder} />
    </View>
  );
};

export default TextInputComponent;
const styles = StyleSheet.create({
  textinput: {
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: appColor.white,
    borderWidth: 1,
    borderColor: appColor.input,
    borderRadius: 10,
    padding: 18,
    height: 58,
    color:appColor.text
  },
});
