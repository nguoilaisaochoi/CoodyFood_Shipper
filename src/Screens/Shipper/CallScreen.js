import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, Alert, StyleSheet, Image} from 'react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import {appColor} from '../constants/appColor';
const CallScreen = () => {
  // Chọn một tên ngẫu nhiên từ danh sách

  const userID = String(Math.floor(Math.random() * 1000000));
  useEffect(() => {
    onUserLogin(userID, 'user' + userID);
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
          ringtoneConfig: {
            incomingCallFileName: 'zego_incoming.mp3',
            outgoingCallFileName: 'zego_incoming.mp3',
          },
          androidNotificationConfig: {
            channelID: 'ZegoUIKit',
            channelName: 'ZegoUIKit',
          },
          waitingPageConfig: {
            //backgroundColor: appColor.gray,
            avatarBuilder: invitee => {
              return (
                <View style={{width: 100, height: 100}}>
                  <Image
                    style={{width: '100%', height: '100%', borderRadius: 99}}
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
  const [inputValue2, setInputValue2] = useState('');

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
        value={inputValue2}
        onChangeText={text => {
          setInputValue2(text);
        }}
      />
      <ZegoSendCallInvitationButton
        invitees={[{userID: inputValue, userName: inputValue2}]}
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default CallScreen;
