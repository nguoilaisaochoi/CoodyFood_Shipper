import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import {useSelector} from 'react-redux';

const CallScreen = () => {
  const {getData} = useSelector(state => state.shipper);
  const [email] = useState(getData.email ?? null);
  const [name] = useState(getData.name ?? null);
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  //login cuoc goi
  useEffect(() => {
    //onUserLogin(email, name);
  }, []);


  useEffect(() => {
    console.log('Input Value:', inputValue);
  }, [inputValue]);

  return (
    <View style={styles.container}>
      <TextInput style={{color: 'black'}}>{email}</TextInput>
      <TextInput
        style={styles.input}
        placeholder="Nhập văn bản ở đây"
        value={inputValue}
        onChangeText={text => {
          setInputValue(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập văn bản ở đây"
        value={inputValue2}
        onChangeText={text => {
          setInputValue2(text);
        }}
      />
      <ZegoSendCallInvitationButton
        invitees={[{userID: inputValue, userName: 'user' + inputValue}]}
        isVideoCall={true}
        resourceID={'zego_call'}
      />
      <ZegoSendCallInvitationButton
        invitees={[{userID: inputValue, userName: inputValue2}]}
        width={45}
        height={45}
        backgroundColor={'#EF2E2E'}
        icon={require('../../assets/images/shipper/callicon.png')}
        borderRadius={10}
        isVideoCall={true}
        resourceID={'zego_data'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    color: 'black',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default CallScreen;
