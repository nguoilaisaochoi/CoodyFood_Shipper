import { View, Image, StyleSheet, Modal, Button, Platform, PermissionsAndroid } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ModalviewComponent from './ComposenentShipper/ModalviewComponent';
import OrderDetailsComponent from './ComposenentShipper/OrderDetailsComponent';
import { useDispatch, useSelector } from 'react-redux';
import MapboxGL from '@rnmapbox/maps'
import { connectSocket, disconnectSocket, getSocket } from '../../socket/socket';
import { GetShipper } from '../../Redux/Reducers/ShipperReducer';
import Geolocation from 'react-native-geolocation-service'
import MapAPI from '../../core/apiMap/MapAPI';
import { appColor } from '../../constants/appColor';
import LoadingModal from '../../modal/LoadingModal';
const polyline = require('@mapbox/polyline')


MapboxGL.setAccessToken('pk.eyJ1IjoibWFzdGVydGFvMzIxIiwiYSI6ImNtMWtrMzFhMTB6bW0ya29jMjZnbXJscnEifQ.c39zAYV1D82VHxuCJNe9Jw')

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector(state => state.login); //thông tin khi đăng nhập
  const { getStatus, getData } = useSelector(state => state.shipper); //thông tin shipper
  const [modalVisible, setModalVisible] = useState(false); //modal nhận đơn hiện và tắt
  const [acceptorder, setAcceptOrder] = useState(false); //hiện thông tin(dưới dạng bottomsheet) sau khi nhấn "NHẬN ĐƠN"
  const [verify, setverify] = useState(false); // xác nhận shipper đã điền đầy đủ thông tin
  const [order, setOrder] = useState(null); //order truyền vào các modal
  const [getjob, setGetjob] = useState(true); //quản lí nhận đơn
  const dispath = useDispatch();
  const [shipperLocation, setShipperLocation] = useState(null);
  const [shopLocation, setShopLocation] = useState([106.641335, 10.867153]);
  const [customerLocation, setCustomerLocation] = useState([106.700424, 10.775659]);
  const [routeToCustomer, setRouteToCustomer] = useState(null);
  const [routeToShop, setRouteToShop] = useState(null);
  const [atRestaurant, setAtRestaurant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const camera = useRef(null);


  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;

    }
    return true;
  };

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setShipperLocation([longitude, latitude]);
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getDirections = async () => {
    const decodePolyline = encoded => {
      const decoded = polyline.decode(encoded);

      return decoded.map(point => ({
        latitude: point[0],
        longitude: point[1],
      }));
    };
    try {
      setIsLoading(true);
      if (!atRestaurant) {
        // Lấy chỉ đường từ vị trí shipper đến nhà hàng

        const directionToRestaurant = await MapAPI.getDirections({
          vehicle: 'bike',
          origin: shipperLocation,
          destination: shopLocation,
        });

        if (directionToRestaurant.routes && directionToRestaurant.routes.length > 0) {
          const route = decodePolyline(directionToRestaurant.routes[0].overview_polyline.points);
          setRouteToShop(route);
        }
      } else {
        // Lấy chỉ đường từ nhà hàng đến chỗ người đặt hàng
        const directionToCustomer = await MapAPI.getDirections({
          vehicle: 'bike',
          origin: shipperLocation,
          destination: customerLocation,
        });

        if (directionToCustomer.routes && directionToCustomer.routes.length > 0) {
          const route = decodePolyline(directionToCustomer.routes[0].overview_polyline.points);
          setRouteToCustomer(route);
        }
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Gọi sự kiên khi nhấn nút nhận đơn
  const handleGetDirections = () => {
    if (shipperLocation && customerLocation && shopLocation) {
      getDirections();
    }
  }

  // Gọi sự kiện khi nhấn nút đã nhận món ăn
  const handleArriveAtRestaurant = () => {
    setAtRestaurant(true);
  };

  useEffect(() => {
    if (atRestaurant) {
      getDirections(); // Lấy chỉ đường từ nhà hàng đến chỗ người đặt hàng khi atRestaurant thay đổi
    }
  }, [atRestaurant]);

  useEffect(() => {
    requestLocationPermission().then((hasPermission) => {
      if (hasPermission) {
        getUserLocation();
      }
    });
  }, []);

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
    <View style={{ flex: 1 }}>
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
      {/* <Image
        style={styles.img}
        source={require('../../assets/images/shipper/map.png')}
      /> */}
      <MapboxGL.MapView
        style={styles.img}
        projection="globe" // Phép chiếu được sử dụng khi hiển thị bản đồ
        zoomEnabled={true}
      >
        {shipperLocation && (
          <MapboxGL.PointAnnotation
            id="userLocation"
            coordinate={shipperLocation}
          />
        )}
        {shopLocation && (
          <MapboxGL.PointAnnotation
            id="restaurantLocation"
            coordinate={shopLocation}
            ref={ref => (this.markerRef = ref)}
          >
            <Image source={require('../../assets/images/shipper/shop.png')} style={{ width: 30, height: 30 }}
              onLoad={() => this.markerRef.refresh()} />
          </MapboxGL.PointAnnotation>
        )}
        {customerLocation && (
          <MapboxGL.PointAnnotation
            id="customerLocation"
            coordinate={customerLocation}
            ref={ref => (this.markerRef = ref)}
          >
            <Image source={require('../../assets/images/tabBar/home2.png')} style={{ width: 30, height: 30 }}
              onLoad={() => this.markerRef.refresh()} />
          </MapboxGL.PointAnnotation>
        )}
        {routeToShop && !atRestaurant && (
          <MapboxGL.ShapeSource id="routeToRestaurantSource" shape={{
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: routeToShop.map(coord => [
                coord.longitude,
                coord.latitude,
              ]),
            },
          }}>
            <MapboxGL.LineLayer id="routeToRestaurantFill"
              style={{ lineColor: appColor.primary, lineWidth: 3, lineCap: 'round', lineJoin: 'round' }} />
          </MapboxGL.ShapeSource>
        )}
        {routeToCustomer && atRestaurant && (
          <MapboxGL.ShapeSource id="routeToCustomerSource" shape={{
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: routeToCustomer.map(coord => [
                coord.longitude,
                coord.latitude,
              ]),
            },
          }}>
            <MapboxGL.LineLayer id="routeToCustomerFill"
              style={{ lineColor: appColor.primary, lineWidth: 3, lineCap: 'round', lineJoin: 'round' }} />
          </MapboxGL.ShapeSource>
        )}

        {shipperLocation && (
          <MapboxGL.Camera
            ref={camera}
            zoomLevel={15} // Mức thu phóng của bản đồ
            centerCoordinate={shipperLocation}
            animationMode='flyTo' // Chế độ di chuyển của camera
            animationDuration={3000}
            pitch={20}
          />
        )}
      </MapboxGL.MapView>
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
      <LoadingModal visible={isLoading} />
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  img: {
    // position: 'absolute',
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
