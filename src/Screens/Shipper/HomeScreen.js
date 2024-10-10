import {View, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import ModalviewComponent from './ComposenentShipper/ModalviewComponent';
import OrderDetailsComponent from './ComposenentShipper/OrderDetailsComponent';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const { user, state } = useSelector((state) => state.login);
  const [modalVisible, setModalVisible] = useState(false); //modal nhận đơn hiện và tắt
  const [order, setOrder] = useState(false); //hiện thông tin(dưới dạng bottomsheet) sau khi nhấn "NHẬN ĐƠN"
  //giả lập sau 2s sẽ có đơn
  useEffect(() => {
    setTimeout(() => {
      setModalVisible(true);
    }, 2000);
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
});
