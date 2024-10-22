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
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import {useSelector} from 'react-redux';
import {appColor} from '../../constants/appColor';
import {ZegoLayoutMode, ZegoViewPosition} from '@zegocloud/zego-uikit-rn';
const CallScreen = () => {
  const {getData} = useSelector(state => state.shipper);
  const [email, setEmail] = useState(getData.email ?? null);
  const [name, setName] = useState(getData.name ?? null);
  const userID = String(Math.floor(Math.random() * 1000000));
  useEffect(() => {
    onUserLogin(email, name);
  }, []);

  //call config
  const onUserLogin = async (userID, userName) => {
    try {
      const result = await ZegoUIKitPrebuiltCallService.init(
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
            outgoingCallFileName: 'zego_incoming.mp3',
          },
          androidNotificationConfig: {
            channelID: 'ZegoUIKit',
            channelName: 'ZegoUIKit',
          },
          waitingPageConfig: {
            backgroundColor: 'pink',
            avatarBuilder: () => {
              return (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    alignItems: 'center',
                    marginBottom: '5%',
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 99,
                    }}
                    resizeMode="cover"
                    source={{
                      uri: `https://res.cloudinary.com/djywo5wza/image/upload/v1726318840/Rectangle_201_ltuozm.jpg`,
                    }}
                  />
                </View>
              );
            },
          },
        },
      );

      // Nếu init thành công, bạn có thể thực hiện các hành động khác
      console.log('Khởi tạo thành công:');
    } catch (error) {
      Alert.alert('Lỗi', 'Khởi tạo không thành công: ' + error.message);
    }
  };

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    console.log('Input Value:', inputValue);
  }, [inputValue]);

  return (
    <View style={styles.container}>
      <TextInput>{'user' + userID}</TextInput>
      <TextInput>{userID}</TextInput>
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
        //resourceID={'zego_call'}
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
