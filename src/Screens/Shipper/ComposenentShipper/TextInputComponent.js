import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {appColor} from '../../../constants/appColor';
import TextComponent from '../../../components/TextComponent';
import {TextInputMask} from 'react-native-masked-text';

/*MASK*
 * mask: (String | required | default '')
 * the mask pattern
 * 9 - accept digit.
 * A - accept alpha.
 * S - accept alphanumeric.
 * * - accept all, EXCEPT white space.
 */

const TextInputComponent = ({
  text,
  placeholder,
  value,
  onChangeText,
  error,
  mask,
}) => {
  return (
    <View>
      <TextComponent
        text={text}
        color={error ? appColor.primary : appColor.text}
      />
      {mask ? (
        <TextInputMask
          type={'custom'}
          options={{
            mask: mask,
          }}
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.textinput,
            {borderColor: error ? appColor.primary : appColor.input},
          ]}
        />
      ) : (
        <TextInput
          style={[
            styles.textinput,
            {borderColor: error ? appColor.primary : appColor.input},
          ]}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
        />
      )}
      {error && (
        <TextComponent
          text={error}
          fontsize={12}
          color={appColor.primary}
          styles={{marginBottom: 10, marginLeft: 5}}
        />
      )}
    </View>
  );
};

export default TextInputComponent;
const styles = StyleSheet.create({
  textinput: {
    marginTop: 10,
    backgroundColor: appColor.white,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    padding: 18,
    height: 58,
    color: appColor.text,
  },
});
