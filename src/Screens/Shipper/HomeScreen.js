import {View, Image, StyleSheet, Modal} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ModalviewComponent from './ComposenentShipper/ModalviewComponent';
import OrderDetailsComponent from './ComposenentShipper/OrderDetailsComponent';
import {useDispatch, useSelector} from 'react-redux';

import {connectSocket, disconnectSocket} from '../../socket/socket';
import TextComponent from './ComposenentShipper/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import BtnComponent from './ComposenentShipper/BtnComponent';
import {appColor} from '../../constants/appColor';
import {GetShipper} from '../../Redux/Reducers/ShipperReducer';
const HomeScreen = ({navigation}) => {
  const {user, state} = useSelector(state => state.login);
  const {getStatus, getData} = useSelector(state => state.shipper);
  const dispath = useDispatch();
  const host = 'https://apiproject-ylai.onrender.com/';
  const [modalVisible, setModalVisible] = useState(false); //modal nhận đơn hiện và tắt
  const [order, setOrder] = useState(false); //hiện thông tin(dưới dạng bottomsheet) sau khi nhấn "NHẬN ĐƠN"
  const [verify, setVerify] = useState(false); //verify==true - cần xác thực false - không cần xác thực

  useEffect(() => {
    if (getStatus == 'succeeded' && getData.name == 'trống') {
      navigation.replace('VerifyShipper');
    }
  }, [getStatus]);
  //giả lập sau 2s sẽ có đơn
  useEffect(() => {
    //lay id shipper
    dispath(GetShipper(user._id));

    //kết nối socket
    connectSocket();
    setTimeout(() => {
      setModalVisible(verify ? true : false);
    }, 2000);

    // Ngắt kết nối khi component unmount
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      {modalVisible && (
        <ModalviewComponent
          setModalVisible={setModalVisible}
          setOrder={setOrder}
        />
      )}
      {order && <OrderDetailsComponent setOrder={setOrder} />}
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
