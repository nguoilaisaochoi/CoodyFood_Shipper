import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {appColor} from '../../../constants/appColor';
import TextComponent from '../../../components/TextComponent';
import {Eye, EyeSlash} from 'iconsax-react-native';

const PassInputComponent = ({
  text,
  placeholder,
  value,
  onChangeText,
  error,
}) => {
  const [showpassword, setShowPassword] = useState(true);
  return (
    <View>
      <TextComponent
        text={text}
        color={error ? appColor.primary : appColor.text}
      />
      <View
        style={[
          styles.textinput,
          {borderColor: appColor.input, flexDirection: 'row'},
        ]}>
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={showpassword}
          style={{width: '85%'}}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setShowPassword(!showpassword);
          }}
          activeOpacity={1}>
          {showpassword ? (
            <EyeSlash size={25} color={appColor.subText} />
          ) : (
            <Eye size={25} color={appColor.subText} />
          )}
        </TouchableOpacity>
      </View>
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

export default PassInputComponent;
const styles = StyleSheet.create({
  textinput: {
    marginTop: 10,
    backgroundColor: appColor.white,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: '5%',
    height: 58,
    color: appColor.text,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
