import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {appColor} from '../constants/appColor';
import {Eye, EyeSlash} from 'iconsax-react-native';
import {fontFamilies} from '../constants/fontFamilies';
import {TextInput} from 'react-native-paper';
import TextComponent from './TextComponent';

const InputComponent = ({
  value,
  onChangeText,
  placeholder,
  isPassword,
  isRePassword,
  styles,
  affix,
  suffix,
  label,
  type,
  error,
  keyboardType,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(isPassword ?? false);
  const [isBlur, setisBlur] = useState(false);
  return (
    <View>
      <TextInput
        label={label}
        value={value}
        placeholderTextColor={appColor.subText}
        onChangeText={text => onChangeText(text)}
        placeholder={placeholder}
        secureTextEntry={isShowPassword}
        style={[styless.input]}
        onBlur={() => {
          setisBlur(true);
        }}
        onFocus={
          isRePassword
            ? () => {
                setisBlur(true);
              }
            : null
        }
        mode="outlined"
        outlineColor={
          isBlur
            ? error
              ? appColor.primary
              : appColor.subText
            : appColor.subText
        }
        keyboardType={keyboardType ?? 'default'}
        theme={{
          roundness: 10,
          colors: {
            primary: isBlur
              ? error
                ? appColor.primary
                : appColor.text
              : appColor.text,
            background: appColor.white,
          },
        }}
        right={
          isPassword && (
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity
                  onPress={() => setIsShowPassword(!isShowPassword)}>
                  {isShowPassword ? (
                    <EyeSlash size={22} color={appColor.subText} />
                  ) : (
                    <Eye size={22} color={appColor.subText} />
                  )}
                </TouchableOpacity>
              )}
            />
          )
        }
      />
      {isBlur && error && (
        <View style={{marginTop: 5}}>
          <TextComponent text={error} color={'red'} fontsize={11} />
        </View>
      )}
    </View>
  );
};

export default InputComponent;

const styless = StyleSheet.create({
  input: {
    height: 60,
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    color: appColor.text,
    // borderWidth:1,
    // borderRadius: 20,
  },
  // container: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     borderWidth: 1,
  //     borderColor: appColor.subText,
  //     height: 60,
  //     width: '100%',
  //     borderRadius: 10,
  //     paddingHorizontal: 20
  // }
});
