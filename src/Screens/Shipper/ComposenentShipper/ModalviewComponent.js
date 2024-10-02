import {View, Modal, StyleSheet, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import Textcompose from './TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {appColor} from '../../../constants/appColor';
import BtnComponent from './BtnComponent';
import CountDownTimer from 'react-native-countdown-timer-hooks';

const ModalviewComponent = ({setModalVisible, setOrder}) => {
  const [cancelVisible, setCancelVisible] = useState(false); //quản lí modal xác nhận huỷ
  const refTimer = useRef();
  return (
    <View style={[styles.bg, {zIndex: 1}]}>
      {/*làm tối bg khi modal xác nhận huỷ xuất hiện */}
      {cancelVisible && <View style={[styles.bg, {zIndex: 2}]} />}
      <View style={[styles.modal]}>
        <View style={styles.detail}>
          <View style={styles.titletime}>
            <Textcompose
              text={'Đơn Hàng Mới'}
              fontsize={24}
              fontfamily={fontFamilies.bold}
              color={appColor.primary}
            />
            <CountDownTimer
              ref={refTimer}
              timestamp={300}
              timerCallback={() => {
                setModalVisible(false);
              }} //gọi funtion khi hết tg
              containerStyle={styles.time}
              textStyle={{
                color: appColor.primary,
                fontsize: 14,
                fontFamily: fontFamilies.bold,
              }}
            />
          </View>
          <View style={styles.address}>
            <Textcompose
              text={'Lấy: Tên của shop '}
              fontsize={16}
              color={appColor.subText}
            />
            <Textcompose
              text={
                'Công Viên Phần Mềm Quang Trung, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh, Việt Nam'
              }
              fontsize={16}
            />
            <Image
              style={styles.down}
              source={require('../../../assets/images/shipper/down.png')}
            />
            <Textcompose
              text={'Giao: Tên người nhận'}
              fontsize={16}
              color={appColor.subText}
            />
            <Textcompose
              text={
                'Công Viên Phần Mềm Quang Trung, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh, Việt Nam'
              }
              fontsize={16}
            />
          </View>
          <View style={styles.title2}>
            <Textcompose text={'Quảng đường ước tính:'} />
            <Textcompose
              text={'6' + ' Km'}
              fontsize={14}
              fontfamily={fontFamilies.bold}
            />
          </View>
          <View style={styles.title2}>
            <Textcompose text={'Thu nhập từ đơn này:'} />
            <Textcompose
              text={'31,500' + ' đ'}
              fontsize={20}
              fontfamily={fontFamilies.bold}
              color={appColor.primary}
            />
          </View>
          <View style={styles.twobtn}>
            <BtnComponent
              text={'HUỶ'}
              styles={{flex: 1}}
              backgroundColor={appColor.white}
              borderColor={appColor.gray}
              fontFamily={fontFamilies.bold}
              onPress={() => {
                setCancelVisible(true);
              }}
            />
            <BtnComponent
              text={'NHẬN ĐƠN'}
              styles={{flex: 1}}
              color={appColor.white}
              fontFamily={fontFamilies.bold}
              onPress={() => {
                setModalVisible(false);
                setOrder(true);
              }}
            />
          </View>
        </View>
      </View>
      {/*modal xác nhận huỷ */}
      {cancelVisible && (
        <Modal animationType="fade" transparent={true} visible={cancelVisible}>
          <View style={styles.modal}>
            <View style={styles.detail}>
              <Textcompose
                text={'Xác nhận từ chối đơn hàng'}
                fontsize={23}
                fontfamily={fontFamilies.bold}
                styles={{textAlign: 'center'}}
              />
              <View style={styles.twobtn}>
                <BtnComponent
                  text={'HUỶ'}
                  styles={{flex: 1}}
                  backgroundColor={appColor.white}
                  borderColor={appColor.gray}
                  fontFamily={fontFamilies.bold}
                  onPress={() => {
                    setCancelVisible(false);
                  }}
                />
                <BtnComponent
                  text={'XÁC NHẬN'}
                  styles={{flex: 1}}
                  color={appColor.white}
                  fontFamily={fontFamilies.bold}
                  onPress={() => {
                    setModalVisible(false);
                    setCancelVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ModalviewComponent;
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
  },
  line: {
    flexShrink: 1,
    height: 60,
    backgroundColor: 'pink',
    borderBottomWidth: 1,
  },
  detail: {
    width: '76%',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: '6%',
    alignItems: 'center',
    elevation: 20,
    justifyContent: 'space-between',
  },
  time: {
    position: 'absolute',
    right: '-20%',
    top: '29%',
  },
  address: {
    borderBottomWidth: 1,
    justifyContent: 'space-around',
    paddingBottom: '5%',
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  down: {
    resizeMode: 'contain',
    alignSelf: 'center',
    flex: 0.3,
  },
  title2: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  twobtn: {
    paddingTop: '5%',
    flexDirection: 'row',
    gap: 25,
  },
});
