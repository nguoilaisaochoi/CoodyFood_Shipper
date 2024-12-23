import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {appColor} from '../../../constants/appColor';
import TextComponent from '../../../components/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import SlideButton from 'rn-slide-button-updated';
import Check from './CheckComponent';
import Info4txt from './Info4txtComponent';
import {useNavigation} from '@react-navigation/native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {onOpenCamera} from './ImagePicker';
import {getSocket} from '../../../socket/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetRevenue,
  setOrderDetailsActive,
} from '../../../Redux/Reducers/ShipperReducer';
import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {CallConfig, UnmountCall} from '../../Call/Callconfig';
import {formatCurrency} from '../../../utils/Validators';
import ButtonComponent from '../../../components/ButtonComponent';
import ConfirmComponent from './ConfirmComponent';
import {showNotification} from './Notification';
const OrderDetailsComponent = ({
  Order,
  setAcceptOrder,
  setGetjob,
  setAtCus,
  setShopLocation,
  setCustomerLocation,
  setRouteToCustomer,
  arrive,
}) => {
  const navigation = useNavigation();
  const [imagePath, setImagePath] = useState(null);
  const sheetRef = useRef();
  const snapPoints = ['20%', '90%'];
  const [status, setStatus] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
  });
  const [title, setTitle] = useState('Đã Đến Nhà Hàng');
  const {getData} = useSelector(state => state.shipper);
  const {user} = useSelector(state => state.login);
  const [isarrive, setIsArrive] = useState(false);
  const [cancel, setcancel] = useState(false);
  const isInMessageScreenRef = useRef(false);
  const dispath = useDispatch();

  //const [phoneNumber] = useState('0123456');

  //cho phép shipper kéo trạng thái
  useEffect(() => {
    if (status.item2) {
      setTimeout(() => {
        setIsArrive(arrive);
      }, 500);
    } else {
      setIsArrive(arrive);
    }
  }, [arrive]);

  //chuyển sdt qua cuộc gọi sim
  const call = () => {
    RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
  };

  //cap nhat trang thai don hang
  const updatestatus = status => {
    const socketInstance = getSocket();
    socketInstance.emit('update_order_status', {
      orderId: Order._id,
      status: status,
    });
  };

  //khi tu man hinh khac tro ve

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      isInMessageScreenRef.current = false;
    });
    return unsubscribe;
  }, [navigation]);

  //tham gia chat
  useEffect(() => {
    dispath(setOrderDetailsActive(true));
    //logout truoc do
    UnmountCall();
    //bật nghe cuộc gọi  Order.user.image
    CallConfig(getData.phone, getData.name, Order.user.image);
    // Kết nối socket
    const socketInstance = getSocket();
    //unactive shipper
    setGetjob(false);
    //cap nhat trang thai shipper
    //updatestatus('Tài xế đang đến nhà hàng');
    setAtCus(false);
    // Tham gia room
    socketInstance.emit('join_room', Order._id);
    // Lắng nghe socket
    try {
      socketInstance.on('receive_message', async data => {
        // Lấy tin nhắn hiện tại từ AsyncStorage
        const storedMessages = await AsyncStorage.getItem('messageList');
        const messageList = storedMessages ? JSON.parse(storedMessages) : [];
        //hiển thị thông báo
        if (getData.name != data.name && !isInMessageScreenRef.current) {
          showNotification();
        }
        // Thêm tin nhắn mới vào danh sách
        const newMessageList = [...messageList, data];

        // Lưu danh sách mới vào AsyncStorage
        await AsyncStorage.setItem(
          'messageList',
          JSON.stringify(newMessageList),
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //xoá tin nhắn sau khi giao xong
  const clearMessageList = async () => {
    try {
      await AsyncStorage.removeItem('messageList');
      dispath(setOrderDetailsActive(false));
      console.log('Message list cleared successfully.');
    } catch (error) {
      console.error('Failed to clear message list:', error);
    }
  };

  //khi hoàn thành đơn
  const complete = () => {
    setImagePath(null);
    clearMessageList();
    const socketInstance = getSocket();
    socketInstance.emit('confirm_order_by_shipper_id', {
      orderId: Order._id,
      shipperId: getData._id,
    });
    Revenue();
    socketInstance.off('confirm_order_by_shipper_id');
    socketInstance.off('receive_message');
  };

  const cancelorder = () => {
    const socketInstance = getSocket();
    socketInstance.off('confirm_order_by_shipper_id');
    socketInstance.off('receive_message');
    setShopLocation([-999, -999]);
    setCustomerLocation([-999, -999]);
    setRouteToCustomer(null);
    clearMessageList();
    setImagePath(null);
    updatestatus('Shipper đã hủy đơn');
    Revenue();
    //dong bottom sheet
    setTimeout(() => {
      sheetRef.current.close();
    }, 1000);
    //khi bottom sheet đóng lại
    setTimeout(() => {
      setAcceptOrder(false);
      setGetjob(true);
      setStatus({item1: false, item2: false, item3: false, item4: false});
      ToastAndroid.show('Bạn đã huỷ đơn', ToastAndroid.SHORT);
    }, 1200);
  };

  //theo dõi các status khi đang ship
  const handleReachedToEnd = () => {
    if (!status.item1) {
      setStatus({...status, item1: true});
      updatestatus('Tài xế đã đến nhà hàng');
      setTitle('Đã lấy món ăn');
    } else if (!status.item2) {
      if (imagePath) {
        setStatus({...status, item2: true});
        setTitle('Đã đến nơi giao');
        setAtCus(true);
        updatestatus('Đang giao hàng');
      } else {
        Alert.alert('Thông báo', 'Bạn cần phải chụp hình');
      }
    } else if (!status.item3) {
      setStatus({...status, item3: true});
      setTitle('Hoàn tất đơn hàng');
      updatestatus('Shipper đã đến điểm giao hàng');
    } else if (!status.item4) {
      setStatus({...status, item4: true});
      setShopLocation([-999, -999]);
      setCustomerLocation([-999, -999]);
      setTitle('Hoàn thành, Chuẩn bị đóng!');
      setRouteToCustomer(null);
      complete();
      setTimeout(() => {
        sheetRef.current.close();
      }, 2000);
      //khi bottom sheet đóng lại
      setTimeout(() => {
        setAcceptOrder(false);
        setGetjob(true);
        setStatus({item1: false, item2: false, item3: false, item4: false});
      }, 2200);
    }
  };

  //render item
  const renderitem = ({item}) => {
    const {id, name, images, quantity, note} = item;
    return (
      <View style={styles.item}>
        <View style={styles.imgitem}>
          <Image
            style={{flex: 1}}
            source={{
              uri: images[0] ?? null,
            }}
          />
        </View>
        <View style={styles.detail2}>
          <TextComponent text={name} fontFamily={fontFamilies.bold} />
          <TextComponent
            text={'Số lượng: ' + quantity}
            styles={{maxHeight: '50%'}}
            fontsize={13}
            color={appColor.subText}
          />
          <TextComponent text={note} fontsize={13} color={appColor.subText} />
        </View>
      </View>
    );
  };

  //gọi doanh thu sau khi xong đơn
  const Revenue = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1);
    const day = String(currentDate.getDate());

    const formattedDate = `${year}/${month}/${day}`;
    dispath(GetRevenue({id: user._id, data: formattedDate, date: 'day'}));
  };

  return (
    <BottomSheet ref={sheetRef} snapPoints={snapPoints} index={0}>
      <BottomSheetScrollView style={{paddingTop: '2%', zIndex: 8}}>
        {/*info1: thông tin quán ăn*/}
        <View style={styles.info1}>
          <Image
            style={styles.img}
            source={{
              uri: Order.shopOwner.images[0],
            }}
          />
          <View style={styles.detail1}>
            <TextComponent
              text={Order.shopOwner.name}
              fontFamily={fontFamilies.bold}
            />
            <TextComponent
              text={Order.shopOwner.address}
              styles={{maxHeight: '50%'}}
              fontsize={13}
              color={appColor.subText}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextComponent
                text={'Đánh giá: ' + Order.shopOwner.rating.toFixed(1) + ' '}
                fontsize={13}
              />
              <Image
                style={styles.star}
                source={require('../../../assets/images/shipper/star.png')}
              />
            </View>
          </View>
        </View>
        {/*info2: danh sách các món ăn*/}
        <View style={styles.info2}>
          <TextComponent
            text={'Danh sách món'}
            styles={{marginLeft: '6%'}}
            fontFamily={fontFamilies.bold}
            fontsize={20}
          />
          <FlatList
            data={Order.items}
            renderItem={renderitem}
            keyExtractor={item => item.name}
            contentContainerStyle={styles.flatlist}
            scrollEnabled={false}
          />
        </View>
        {/*info3: bảng lộ trình của shipper*/}
        <View style={styles.info3}>
          {/*ảnh vòng tròn màu xám */}
          <Image
            style={styles.bodership}
            source={require('../../../assets/images/shipper/Frame_11.png')}
          />
          {/*thông tin bên phải các vòng tròn*/}
          <View style={styles.statusship}>
            <TextComponent text={'Bạn đã đến nhà hàng'} fontsize={15} />
            <TextComponent text={'Bạn đã lấy món ăn'} fontsize={15} />
            <TextComponent text={'Bạn đã đến nơi giao'} fontsize={15} />
            <TextComponent text={'Bạn đã giao hàng'} fontsize={15} />
          </View>
          {/*các vòng tròn check gồm start(bắt đầu) và check(đã thực hiện hay chưa)*/}
          <View style={styles.check}>
            <Check start={true} checked={status.item1 ? true : false} />
            <Check
              start={status.item1 ? true : false}
              checked={status.item2 ? true : false}
            />
            <Check
              start={status.item2 ? true : false}
              checked={status.item3 ? true : false}
            />
            <Check
              start={status.item3 ? true : false}
              checked={status.item4 ? true : false}
            />
          </View>
        </View>
        {/*info4: tóm tắt*/}
        <View style={styles.info4}>
          <TextComponent
            text={'Tóm tắt'}
            fontsize={20}
            fontFamily={fontFamilies.bold}
            color={appColor.primary}
          />
          {/* <Info4txt text={'Mã đơn hàng'} price={Order._id.slice(-3)} /> */}
          <Info4txt
            text={'Giá đơn hàng:'}
            price={formatCurrency(Order.totalPrice - Order.shippingfee)}
          />
          <Info4txt
            text={'Thu tiền khách hàng: '}
            price={
              Order.paymentMethod == 'Tiền mặt'
                ? formatCurrency(Order.totalPrice)
                : formatCurrency(0)
            }
          />
          <Info4txt
            text={'Thu nhập đơn này: '}
            price={formatCurrency(Order.shippingfee)}
          />
        </View>
        <View style={[styles.info4, {marginTop: '2%', gap: 10}]}>
          {/*nút kéo từ trái sang phải*/}
          <SlideButton
            onReachedToEnd={handleReachedToEnd}
            autoReset={true}
            borderRadius={10}
            disabled={!isarrive}
            title={title}
            titleStyle={{fontsize: 20, fontFamily: fontFamilies.bold}}
            containerStyle={{
              backgroundColor: appColor.primary,
              elevation: 10,
            }}
            underlayStyle={{backgroundColor: 'transparent'}}
            autoResetDelay={400}
            icon={
              <Image
                style={{flex: 0.6, resizeMode: 'contain'}}
                source={require('../../../assets/images/shipper/image_45.png')}
              />
            }
            thumbStyle={{borderRadius: 25}}
          />
          {status.item3 && (
            <ButtonComponent
              text={'Tôi muốn huỷ đơn'}
              color={appColor.white}
              textStyle={{fontFamily: fontFamilies.bold}}
              onPress={() => {
                setcancel(true);
              }}
            />
          )}
          {/*nút chụp ảnh chỉ hiện khi ở `shiper đẫ lấy món ăn`*/}
          {status.item1 && !status.item2 && (
            <TouchableOpacity
              style={[styles.button, {backgroundColor: appColor.primary}]}
              onPress={() => {
                onOpenCamera(setImagePath);
              }}>
              <TextComponent
                text={'Chụp ảnh'}
                color={appColor.white}
                fontsize={16}
                fontFamily={fontFamilies.bold}
              />
            </TouchableOpacity>
          )}
          {/*hiện ảnh nếu đã chụp*/}
          {imagePath && (
            <View>
              <TextComponent
                text={'Hình ảnh xác thực'}
                color={appColor.primary}
                fontsize={20}
                fontFamily={fontFamilies.semiBold}
              />
              <Image style={styles.verified} source={{uri: imagePath.uri}} />
            </View>
          )}
          {/*view thông tin khách hàng*/}
          <View style={styles.customer}>
            <View style={styles.imgcustomer}>
              <Image
                style={{flex: 1}}
                source={{
                  uri:
                    Order.user.image ??
                    'https://res.cloudinary.com/djywo5wza/image/upload/v1729757743/clone_viiphm.png',
                }}
              />
            </View>
            <View style={styles.namecustomer}>
              <TextComponent text={Order.shippingAddress.recipientName} />
              <TextComponent text={'Khách hàng'} />
            </View>
            <View style={styles.callandmessboder}>
              <ZegoSendCallInvitationButton
                invitees={[
                  {userID: Order.user.phone, userName: Order.user.name},
                ]}
                width={45}
                height={45}
                backgroundColor={'#EF2E2E'}
                icon={require('../../../assets/images/shipper/callicon.png')}
                borderRadius={10}
                isVideoCall={false}
                resourceID={'zego_data'}
              />
              <TouchableOpacity
                style={styles.callandmess}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate(
                    'Message',
                    {item: Order},
                    (isInMessageScreenRef.current = true),
                  );
                }}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={require('../../../assets/images/shipper/message.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
      {cancel && (
        <ConfirmComponent
          titile={'Bạn muốn huỷ đơn này'}
          setModalVisible={setcancel}
          Presscancel={() => {
            setcancel(false);
          }}
          Pressok={() => {
            {
              setcancel(false);
              cancelorder();
            }
          }}
        />
      )}
    </BottomSheet>
  );
};

export default OrderDetailsComponent;
const styles = StyleSheet.create({
  info1: {
    width: '86%',
    minHeight: 100,
    maxHeight: 143,
    backgroundColor: appColor.white,
    elevation: 10,
    alignSelf: 'center',
    borderRadius: 15,
    padding: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail1: {
    justifyContent: 'flex-start',
    gap: '20%',
    width: '70%',
  },
  detail2: {
    justifyContent: 'flex-start',
    width: '80%',
    height: '90%',
  },
  img: {
    width: 86,
    aspectRatio: 1,
    borderRadius: 15,
    marginRight: '2%',
    backgroundColor: appColor.gray,
  },
  star: {width: '5%', aspectRatio: 1},
  info2: {
    marginTop: '3%',
  },
  info3: {
    flexDirection: 'row',
    paddingTop: '4%',
    paddingBottom: '4%',
    marginLeft: '6%',
    marginRight: '6%',
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  info4: {
    margin: '5%',
    marginBottom: '2%',
    gap: 5,
  },
  bodership: {
    width: '7.7%',
    height: '100%',
    resizeMode: 'contain',
  },
  statusship: {
    gap: '70%',
    marginLeft: '3%',
  },
  check: {
    position: 'absolute',
    top: '7%',
    bottom: '7%',
    left: '0%',
    right: '0%',
    justifyContent: 'space-between',
  },
  item: {
    width: '100%',
    minHeight: 85,
    maxHeight: 105,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: appColor.white,
    elevation: 8,
    borderRadius: 10,
    padding: '3%',
  },
  imgitem: {
    width: 65,
    aspectRatio: 1,
    borderRadius: 10,
    marginRight: '5%',
    backgroundColor: appColor.gray,
    overflow: 'hidden',
  },
  flatlist: {
    gap: 15,
    width: '100%',
    height: 'auto',
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingBottom: '4%',
    paddingTop: '4%',
  },
  button: {
    width: '100%',
    height: 51,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  customer: {
    width: '100%',
    height: 104,
    backgroundColor: appColor.white,
    elevation: 8,
    padding: '3%',
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: appColor.gray,
    marginBottom: '3%',
  },
  namecustomer: {
    width: '60%',
    flexShrink: 2,
    justifyContent: 'center',
    gap: 5,
  },
  callandmessboder: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  callandmess: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 10,
  },
  imgcustomer: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: 15,
    marginRight: '2%',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  verified: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: '5%',
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
  modal: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
const data = [
  {
    id: 1,
    name: 'Bánh Pizza Margherita',
    quantity: 1,
    note: 'Nướng chín vừa',
    img: 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318386/Rectangle_175_xzn14n.jpg',
  },
  {
    id: 2,
    name: 'Bánh Pizza Margherita',
    quantity: 2,
    note: 'Nướng cháy khét lẹt',
    img: 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318386/Rectangle_175_xzn14n.jpg',
  },
  {
    id: 3,
    name: 'Bánh Pizza Margherita',
    quantity: 2,
    note: 'Nướng cháy khét lẹt',
    img: 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318386/Rectangle_175_xzn14n.jpg',
  },
  {
    id: 4,
    name: 'Bánh Pizza Margherita',
    quantity: 2,
    note: 'Nướng cháy khét lẹt',
    img: 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318386/Rectangle_175_xzn14n.jpg',
  },
  {
    id: 5,
    name: 'Bánh Pizza Margherita',
    quantity: 2,
    note: 'Nướng cháy khét lẹt',
    img: 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318386/Rectangle_175_xzn14n.jpg',
  },
  {
    id: 6,
    name: 'Bánh Pizza Margherita',
    quantity: 2,
    note: 'Nướng cháy khét lẹt',
    img: 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318386/Rectangle_175_xzn14n.jpg',
  },
  {
    id: 7,
    name: 'Bánh Pizza Margherita',
    quantity: 2,
    note: 'Nướng cháy khét lẹt',
    img: 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318386/Rectangle_175_xzn14n.jpg',
  },
  {
    id: 8,
    name: 'Bánh Pizza Margherita',
    quantity: 2,
    note: 'Nướng cháy khét lẹt',
    img: 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318386/Rectangle_175_xzn14n.jpg',
  },
];
