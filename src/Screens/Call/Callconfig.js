import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {Image, View} from 'react-native';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

//cấu hình cuộc gọi
export const CallConfig = async (userID, userName,image) => {
  try {
    await ZegoUIKitPrebuiltCallService.init(
      1749442627, //AppID
      'bf27fd038a353193aa1de595443eb8c4bc78676b60d73a02c4dd99d546ab91bc', //AppSign
      userID,
      userName,
      [ZIM, ZPNs],
      {
        innerText: {
          incomingVoiceCallDialogTitle: '%0',
          incomingVoiceCallDialogMessage: 'Đang gọi đến bạn',
          outgoingVoiceCallPageMessage: 'Đang gọi...',
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
        avatarBuilder: () => {
          return (
            <View style={{width: '100%', height: '100%'}}>
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                source={{
                  uri: image
                    ? image
                    : `https://res.cloudinary.com/djywo5wza/image/upload/v1729757743/clone_viiphm.png`,
                }}
              />
            </View>
          );
        },
      },
    );
  } catch (error) {
    console.error('Keepcall không thành công: ' + error.message);
  }
};
