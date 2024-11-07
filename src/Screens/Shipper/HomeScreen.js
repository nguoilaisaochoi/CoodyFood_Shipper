import {View, Image, StyleSheet, Modal, Button} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ModalviewComponent from './ComposenentShipper/ModalviewComponent';
import OrderDetailsComponent from './ComposenentShipper/OrderDetailsComponent';
import {useDispatch, useSelector} from 'react-redux';

import {connectSocket, disconnectSocket, getSocket} from '../../socket/socket';
import {GetShipper} from '../../Redux/Reducers/ShipperReducer';
const HomeScreen = ({navigation}) => {
  const {user} = useSelector(state => state.login); //thông tin khi đăng nhập
  const {getStatus, getData} = useSelector(state => state.shipper); //thông tin shipper
  const [modalVisible, setModalVisible] = useState(false); //modal nhận đơn hiện và tắt
  const [acceptorder, setAcceptOrder] = useState(false); //hiện thông tin(dưới dạng bottomsheet) sau khi nhấn "NHẬN ĐƠN"
  const [verify, setverify] = useState(false); // xác nhận shipper đã điền đầy đủ thông tin
  const [order, setOrder] = useState(null); //order truyền vào các modal
  const [getjob, setGetjob] = useState(true); //quản lí nhận đơn
  const dispath = useDispatch();
  //nếu chưa xác thực sẽ chuyển sang màn hình xác thực
  useEffect(() => {
    if (getStatus == 'succeeded' && !getData.vehicleBrand) {
      navigation.replace('VerifyShipper');
      setGetjob(false);
    } else if (getData.vehicleBrand) {
      setverify(true);
    }
  }, [getStatus]);

  useEffect(() => {
    //lay thông tin shipper
    dispath(GetShipper(user._id));
    if (verify) {
      //kết nối socket từ file socket.js
      connectSocket();
    }
    // Ngắt kết nối socket khi component unmount
    return () => {
      disconnectSocket();
    };
  }, [verify]);

  //đợi đơn cho shipper đã xác thực
  useEffect(() => {
    const socketInstance = getSocket();
    if (verify && getjob) {
      socketInstance.on('order_confirmed', dataGot => {
        setOrder(dataGot.order), setModalVisible(true);
      });
    }
    return () => {
      if (socketInstance) {
        socketInstance.off('order_confirmed');
      }
    };
  }, [verify, getjob]);

  return (
    <View style={{flex: 1}}>
      {modalVisible && (
        <ModalviewComponent
          setModalVisible={setModalVisible}
          setAcceptOrder={setAcceptOrder}
          Order={order}
        />
      )}
      {/*modal sau khi chấp nhận đơn */}
      {acceptorder && (
        <OrderDetailsComponent
          Order={order}
          setAcceptOrder={setAcceptOrder}
          setGetjob={setGetjob}
        />
      )}
      {/*để tạm-sau này thay thế bằng maps */}
      <Image
        style={styles.img}
        source={require('../../assets/images/shipper/map.png')}
      />
      {!acceptorder && (
        <View style={styles.buttonContainer}>
          <Button
            title={'Nhận đơn: ' + (getjob ? 'Bật' : 'Tắt')}
            backgroundColor={'red'}
            onPress={() => {
              setGetjob(!getjob);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  img: {
    position: 'absolute',
    zIndex: 0,
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
  twobtn: {
    paddingTop: '5%',
    flexDirection: 'row',
    gap: 25,
  },
});
