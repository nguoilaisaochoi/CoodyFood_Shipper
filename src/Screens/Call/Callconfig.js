import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {Image, View} from 'react-native';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import {ZegoLayoutMode, ZegoViewPosition} from '@zegocloud/zego-uikit-rn';
import {AppSign } from '@env';

//cấu hình cuộc gọi
export const CallConfig = async (userID, userName, image) => {
  try {
    await ZegoUIKitPrebuiltCallService.init(
      1749442627,//AppID
      AppSign, //AppSign
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
                  uri:
                    image ??
                    `https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg`,
                }}
              />
            </View>
          );
        },
        requireConfig: () => {
          return {
            layout: {
              mode: ZegoLayoutMode.pictureInPicture,
              config: {
                smallViewSize: {width: 0, height: 0},
              },
            },
          };
        },
      },
    );
  } catch (error) {
    console.error('Keepcall không thành công: ' + error.message);
  }
};
//logoutcall
export const UnmountCall = async () => {
  await ZegoUIKitPrebuiltCallService.uninit();
};
