import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import React, {useRef, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {appColor} from '../../../constants/appColor';
import TextComponent from '../../../components/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import SlideButton from 'rn-slide-button-updated';
import Check from './CheckComponent';
import Info4txt from './Info4txtComponent';
import {useNavigation} from '@react-navigation/native';
import {launchCamera} from 'react-native-image-picker';


const OrderDetailsComponent = ({setOrder}) => {
  const navigation = useNavigation();
  const [imagePath, setImagePath] = useState();
  const sheetRef = useRef(null);
  const snapPoints = ['20%', '90%'];
  const [phoneNumber] = useState('0123456');
  const [item1, setItem1] = useState(false);
  const [item2, setItem2] = useState(false);
  const [item3, setItem3] = useState(false);
  const [item4, setItem4] = useState(false);
  const [title, setTitle] = useState('Đã Đến Nhà Hàng');
  const Data = data;
  //chuyển sdt qua cuộc gọi
  const call = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  //setting máy ảnh
  const cameraOptions = {
    cameraType: 'front',
    saveToPhotos: true,
  };
  //yêu cầu quyền
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  //kiểm tra quyền
  const checkCameraPermission = async () => {
    const permissionStatus = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    return permissionStatus;
  };
  //mở camera
  const onOpenCamera = async () => {
    //check quyền
    const hasPermission = await checkCameraPermission();
    if (!hasPermission) {
      const granted = await requestCameraPermission();
      if (!granted) {
        Alert.alert('Quyền camera bị từ chối');
        return;
      }
    }
    try {
      //mở camera&chụp ảnh
      const response = await launchCamera(cameraOptions);
      if (response?.assets) {
        setImagePath(response.assets[0].uri);
        console.log(response.assets);
      } else {
        console.log('Có lỗi xảy ra', response.errorMessage);
      }
    } catch (error) {
      console.log('Có lỗi xảy ra', error.message);
    }
  };
  //hiện các status khi đang ship
  const handleReachedToEnd = () => {
    if (!item1) {
      setItem1(true);
      setTitle('Đã lấy món ăn');
    } else if (!item2) {
      if (imagePath) {
        setItem2(true);
        setTitle('Đã đến nơi giao');
      } else {
        Alert.alert('Thông báo', 'Bạn cần phải chụp hình');
      }
    } else if (!item3) {
      setItem3(true);
      setTitle('Hoàn tất đơn hàng');
    } else if (!item4) {
      setItem4(true);
      setTitle('Hoàn tất,Chuẩn bị đóng lại!');
      setTimeout(() => {
        sheetRef.current.close();
      }, 2200);
    }
  };
  //hiện màn chụp ảnh
  const gotoscreen = screen => {
    navigation.navigate(screen);
  };
  //render item
  const renderitem = ({item}) => {
    const {id, name, quantity, note, img} = item;
    return (
      <View style={styles.item}>
        <View style={styles.imgitem}>
          <Image
            style={{flex: 1}}
            source={{
              uri: img,
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.star}
              source={require('../../../assets/images/shipper/note.png')}
            />
            <TextComponent text={' ' + note} fontsize={11} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/*bottom sheet */}
      <BottomSheet ref={sheetRef} snapPoints={snapPoints} index={0}>
        <BottomSheetScrollView>
          {/*info1: thông tin quán ăn*/}
          <View style={styles.info1}>
            <Image
              style={styles.img}
              source={{
                uri: 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318386/Rectangle_175_xzn14n.jpg',
              }}
            />
            <View style={styles.detail1}>
              <TextComponent
                text={'Đồ Ăn Chay Thanh Đạm'}
                fontFamily={fontFamilies.bold}
              />
              <TextComponent
                text={
                  'Công Viên Phần Mềm Quang Trung, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh '
                }
                styles={{maxHeight: '50%'}}
                fontsize={13}
                color={appColor.subText}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextComponent text={'Đánh giá: ' + '4.6 '} fontsize={13} />
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
              data={Data}
              renderItem={renderitem}
              keyExtractor={item => item.id}
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
              <TextComponent text={'Shipper đã đến nhà hàng'} />
              <TextComponent text={'Shipper đã lấy món ăn'} />
              <TextComponent text={'Shipper đã đến nơi giao'} />
              <TextComponent text={'Đơn hàng hoàn tất'} />
            </View>
            {/*các vòng tròn check gồm start(bắt đầu) và check(đã thực hiện hay chưa)*/}
            <View style={styles.check}>
              <Check start={true} checked={item1 ? true : false} />
              <Check
                start={item1 ? true : false}
                checked={item2 ? true : false}
              />
              <Check
                start={item2 ? true : false}
                checked={item3 ? true : false}
              />
              <Check
                start={item3 ? true : false}
                checked={item4 ? true : false}
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
            <Info4txt text={'Giá tiền lấy đồ'} price={'0'} />
            <Info4txt text={'Phí giao hàng'} price={'31,500'} />
            <Info4txt text={'Thu tiền khách hàng'} price={'0'} />
            <Info4txt text={'Thu nhập'} price={'31,500'} />
          </View>
          <View style={[styles.info4, {marginTop: '4%', gap: 22}]}>
            {/*nút kéo từ trái sang phải*/}
            <SlideButton
              onReachedToEnd={handleReachedToEnd}
              autoReset={true}
              borderRadius={10}
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
            {/*nút chụp ảnh chỉ hiện khi ở `shiper đẫ lấy món ăn`*/}
            {item1 && !item2 && (
              <TouchableOpacity
                style={[styles.button, {backgroundColor: appColor.primary}]}
                onPress={() => {
                  onOpenCamera();
                }}>
                <TextComponent
                  text={'Chụp ảnh'}
                  color={appColor.white}
                  fontsize={20}
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
                <Image style={styles.verified} source={{uri: imagePath}} />
              </View>
            )}
            {/*view thông tin khách hàng*/}
            <View style={styles.customer}>
              <View style={styles.imgcustomer}>
                <Image
                  style={{flex: 1}}
                  source={{
                    uri: 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318386/Rectangle_175_xzn14n.jpg',
                  }}
                />
              </View>
              <View style={styles.namecustomer}>
                <TextComponent text={'Nguyễn Thị A'} />
                <TextComponent text={'Khách hàng'} />
              </View>
              <View style={styles.callandmessboder}>
                <TouchableOpacity
                  style={styles.callandmess}
                  activeOpacity={0.7}
                  onPress={() => {
                    call();
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../../assets/images/shipper/call.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.callandmess}
                  activeOpacity={0.7}
                  onPress={() => {
                    gotoscreen('Message');
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
      </BottomSheet>
    </View>
  );
};

export default OrderDetailsComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  info1: {
    width: '86%',
    minHeight: 123,
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
    justifyContent: 'space-between',
    width: '70%',
  },
  detail2: {
    justifyContent: 'space-between',
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
    margin: '6%',
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
    backgroundColor: 'pink',
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
    width: 80,
    aspectRatio: 1,
    borderRadius: 15,
    marginRight: '2%',
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
];
