import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {Image, View} from 'react-native';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

//cấu hình cuộc gọi
export const CallConfig = async (userID, userName,image) => {
  try {
    await ZegoUIKitPrebuiltCallService.init(
      1174464780, //AppID
      'a13abce8327d63610fdcc01effb642e7cc6bf0e9817aa0843b74c69a1e5dd59a', //AppSign
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
