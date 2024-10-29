import {View, Image, StyleSheet, Modal} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ModalviewComponent from './ComposenentShipper/ModalviewComponent';
import OrderDetailsComponent from './ComposenentShipper/OrderDetailsComponent';
import {useDispatch, useSelector} from 'react-redux';

import {connectSocket, disconnectSocket, getSocket} from '../../socket/socket';
import {GetShipper} from '../../Redux/Reducers/ShipperReducer';
const HomeScreen = ({navigation}) => {
  const {user} = useSelector(state => state.login);
  const {getStatus, getData} = useSelector(state => state.shipper);
  const dispath = useDispatch();
  const [modalVisible, setModalVisible] = useState(false); //modal nhận đơn hiện và tắt
  const [acceptorder, setAcceptOrder] = useState(false); //hiện thông tin(dưới dạng bottomsheet) sau khi nhấn "NHẬN ĐƠN"
  const [verify, setverify] = useState(false);
  const [order, setOrder] = useState(null);

  //nếu chưa xác thực sẽ chuyển sang màn hình xác thực
  useEffect(() => {
    if (getStatus == 'succeeded' && !getData.vehicleBrand) {
      navigation.replace('VerifyShipper');
    } else if (getData.vehicleBrand) {
      setverify(true);
    }
  }, [getStatus]);

  useEffect(() => {
    //lay id shipper
    dispath(GetShipper(user._id));
    if (verify) {
      //kết nối socket
      connectSocket();
    }
    // Ngắt kết nối socket khi component unmount
    return () => {
      disconnectSocket();
    };
  }, [verify]);

  useEffect(() => {
    if (verify) {
      const socketInstance = getSocket();
      socketInstance.on('order_shipper_receive', dataGot => {
        setOrder(dataGot), setModalVisible(true);
      });
    }
  }, [getStatus]);
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
      {acceptorder && <OrderDetailsComponent Order={order} />}
      {/*để tạm-sau này thay thế bằng maps */}
      <Image
        style={styles.img}
        source={require('../../assets/images/shipper/map.png')}
      />
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
