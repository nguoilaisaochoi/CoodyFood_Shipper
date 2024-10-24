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
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import {useSelector} from 'react-redux';

const CallScreen = () => {
  const {getData} = useSelector(state => state.shipper);
  const [email] = useState(getData.email ?? null);
  const [name] = useState(getData.name ?? null);
  const [inputValue, setInputValue] = useState('');
  //login cuoc goi
  useEffect(() => {
    onUserLogin(email, name);
  }, []);
  //call config
  const onUserLogin = async (userID, userName) => {
    try {
      await ZegoUIKitPrebuiltCallService.init(
        785543570,
        'c3d0338ceef0dd5036a0aefc0a2d31818597e77598a1d3c60bed8d7d912e0b5e',
        userID,
        userName,
        [ZIM, ZPNs],
        {
          innerText: {
            incomingVideoCallDialogTitle: '%0',
            incomingVideoCallDialogMessage: 'Đang gọi đến bạn',
            outgoingVideoCallPageMessage: 'Đang gọi...',
            incomingCallPageDeclineButton: 'Từ chối',
            incomingCallPageAcceptButton: 'Trả lời',
          },
          ringtoneConfig: {
            incomingCallFileName: 'zego_incoming.mp3',
            outgoingCallFileName: 'zego_outgoing.mp3',
          },
          androidNotificationConfig: {
            channelID: 'ZegoUIKit',
            channelName: 'ZegoUIKit',
          },
          avatarBuilder: ({userInfo}) => {
            return (
              <View style={{width: '100%', height: '100%'}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                  source={{uri: `https://robohash.org/${userInfo.userID}.png`}}
                />
              </View>
            );
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

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
        value={'user' + inputValue}
      />
      <ZegoSendCallInvitationButton
        invitees={[{userID: inputValue, userName: 'user' + inputValue}]}
        isVideoCall={true}
        resourceID={'zego_call'}
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
