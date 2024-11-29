import {View, Modal, StyleSheet, Image, ToastAndroid} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {fontFamilies} from '../../../constants/fontFamilies';
import {appColor} from '../../../constants/appColor';
import BtnComponent from './BtnComponent';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import {getSocket} from '../../../socket/socket';
import {useSelector} from 'react-redux';
import {formatCurrency} from '../../../utils/Validators';
import TextComponent from '../../../components/TextComponent';

const ModalviewComponent = ({
  setModalVisible,
  setAcceptOrder,
  Order,
  setShopLocation,
  setCustomerLocation,
  setGetjob,
}) => {
  const {user} = useSelector(state => state.login); //thông tin khi đăng nhập
  const [cancelVisible, setCancelVisible] = useState(false); //quản lí modal xác nhận huỷ
  const {getData} = useSelector(state => state.shipper); //thông tin shipper
  const refTimer = useRef();
  //socket

  const acceptorders = () => {
    const socketInstance = getSocket();
    socketInstance.emit('confirm_order_shipper_exists', {
      orderId: Order._id,
      shipperId: getData._id,
    });
    setModalVisible(false);
    setAcceptOrder(true);
    setShopLocation([Order.shopOwner.longitude, Order.shopOwner.latitude]);
    setCustomerLocation([
      Order.shippingAddress.longitude,
      Order.shippingAddress.latitude,
    ]);
  };

  useEffect(() => {
    setGetjob(false);
    const socketInstance = getSocket();
    socketInstance.on('order_cancelled', data => {
      if (Order._id == data.orderId) {
        ToastAndroid.show('Đơn khách hàng đã huỷ đơn', ToastAndroid.SHORT);
        setModalVisible(false);
        setTimeout(() => {
          setGetjob(true);
        }, 200);
      }
    });
    socketInstance.on('order_assigned', data => {
      console.log(data.status);
      if (data.orderId == Order._id && data.shipperId != user._id) {
        ToastAndroid.show('Đã có tài xế khác nhận đơn', ToastAndroid.SHORT);
        setModalVisible(false);
        setTimeout(() => {
          setGetjob(true);
        }, 200);
      }
    });
  }, []);

  if (!Order) {
    return null;
  }
  return (
    <View style={[styles.bg, {zIndex: 6}]}>
      {/*làm tối bg khi modal xác nhận huỷ xuất hiện */}
      {cancelVisible && <View style={[styles.bg, {zIndex: 2}]} />}
      <View style={[styles.modal]}>
        <View style={styles.detail}>
          <View style={styles.titletime}>
            <TextComponent
              text={'Đơn Hàng Mới'}
              fontsize={24}
              fontFamily={fontFamilies.bold}
              color={appColor.primary}
            />
            <CountDownTimer
              ref={refTimer}
              timestamp={900}
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
            <TextComponent
              text={'Cửa hàng: ' + Order.shopOwner.name}
              fontsize={16}
              color={appColor.subText}
            />
            <TextComponent
              text={'Địa chỉ: ' + Order.shopOwner.address}
              fontsize={16}
              width={'100%'}
              styles={{textAlign: 'justify'}}
            />
            <Image
              style={styles.down}
              source={require('../../../assets/images/shipper/down.png')}
            />
            <TextComponent
              text={'Giao đến: ' + Order.shippingAddress.recipientName}
              fontsize={16}
              color={appColor.subText}
            />
            <TextComponent
              text={'Địa chỉ: ' + Order.shippingAddress.address}
              fontsize={16}
              width={'100%'}
              styles={{textAlign: 'justify'}}
            />
          </View>
          <View style={styles.title2}>
            <TextComponent text={'Quảng đường ước tính:'} />
            <TextComponent
              text={Order.distance + ' Km'}
              fontsize={14}
              fontFamily={fontFamilies.bold}
            />
          </View>
          <View style={styles.title2}>
            <TextComponent text={'Thu nhập từ đơn này:'} />
            <TextComponent
              text={formatCurrency(Order.shippingfee)}
              fontsize={20}
              fontFamily={fontFamilies.bold}
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
                setGetjob(true);
              }}
            />
            <BtnComponent
              text={'NHẬN ĐƠN'}
              styles={{flex: 1}}
              color={appColor.white}
              fontFamily={fontFamilies.bold}
              onPress={() => {
                acceptorders();
              }}
            />
          </View>
        </View>
      </View>
      {/*modal xác nhận huỷ */}
      {cancelVisible && (
        <Modal animationType="fade" transparent={true} visible={cancelVisible}>
          <View style={styles.modal}>
            <View style={styles.detailcanel}>
              <TextComponent
                text={'Xác nhận từ chối đơn hàng'}
                fontsize={23}
                fontFamily={fontFamilies.bold}
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
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
  },
  line: {
    flexShrink: 1,
    height: 60,
    backgroundColor: 'pink',
    borderBottomWidth: 1,
  },
  detail: {
    width: '76%',
    maxHeight: '80%',
    minHeight: '50%',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: '6%',
    alignItems: 'center',
    elevation: 20,
    justifyContent: 'space-between',
  },
  detailcanel: {
    width: '76%',
    height: '25%',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: '6%',
    alignItems: 'center',
    elevation: 20,
    justifyContent: 'space-between',
    gap: 30,
    justifyContent: 'center',
  },
  time: {
    position: 'absolute',
    right: '-20%',
    top: '29%',
  },
  address: {
    width: '100%',
    maxHeight: '60%',
    borderBottomWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingBottom: '5%',
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  down: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 25,
    height: 25,
  },
  title2: {
    flexDirection: 'row',
    maxHeight: '20%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2%',
  },
  twobtn: {
    flexDirection: 'row',
    maxHeight: '20%',
    gap: 25,
  },
});
