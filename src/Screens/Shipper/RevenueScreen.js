import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import {globalStyle} from '../../styles/globalStyle';
import {Dropdown} from 'react-native-element-dropdown';
import {appColor} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import TextComponent from '../../components/TextComponent';
import Info4txtComponent from './ComposenentShipper/Info4txtComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetCustomRevenue,
  GetRevenue,
} from '../../Redux/Reducers/ShipperReducer';
import {formatCurrency} from '../../utils/Validators';
import Customday from './ComposenentShipper/Customday';

const RevenueScreen = () => {
  const {user} = useSelector(state => state.login);
  const {
    getRevenueStatus,
    getRevenueData,
    GetCustomRevenueStatus,
    GetCustomRevenueData,
  } = useSelector(state => state.shipper);
  const [value, setValue] = useState(date[0].value);
  const [Data, setData] = useState(data);
  const dispath = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); //modal huỷ
  const [fromday, setfromday] = useState(null);
  const [today, settoday] = useState(null);

  //call api
  const fetchRevenue = () => {
    setRefreshing(true);
    dispath(
      GetRevenue({id: user._id, data: formattedDay(new Date()), date: value}),
    );
  };

  //co phai chon customday k?
  useEffect(() => {
    if (value != 'custom_day') {
      fetchRevenue();
    } else {
      setModalVisible(true);
    }
  }, [value]);

  //lay doanh thu
  useEffect(() => {
    if (getRevenueStatus === 'succeeded') {
      setData(getRevenueData);
    }
    if (refreshing) {
      setRefreshing(false); // Kết thúc làm mới
    }
  }, [getRevenueStatus]);

  //status lay doanh thu tuy chinh
  useEffect(() => {
    if (GetCustomRevenueStatus === 'succeeded') {
      setData(GetCustomRevenueData);
      console.log('done');
    }
    if (refreshing) {
      setRefreshing(false); // Kết thúc làm mới
    }
  }, [GetCustomRevenueStatus]);

  //chuyen ngay sang y/m/d
  const formattedDay = date => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1);
    const day = String(currentDate.getDate());
    return `${year}/${month}/${day}`;
  };

  //ngay : (gio)
  const formattedDate = orderDate => {
    const date = new Date(orderDate);
    const timeString = date.toLocaleTimeString('vi-VN', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    const dateString = date.toLocaleDateString();
    return `${dateString}, (${timeString}) `;
  };
  //canncellayout
  const canncellayout = () => {
    setModalVisible(false);
    setValue('day');
  };

  //tim ngay tuy chon
  const customdaycall = () => {
    setModalVisible(false);
    dispath(
      GetCustomRevenue({
        id: user._id,
        startDate: formattedDay(fromday),
        endDate: formattedDay(today),
      }),
    );
  };
  //
  const renderItem = ({item}) => {
    const {
      paymentMethod,
      distance,
      shippingfee,
      orderDate,
      user,
      shopOwner,
      status,
      shippingAddress,
    } = item;
    return (
      <View style={[styles.boxed, {justifyContent: 'center', margin: '3.7%'}]}>
        <View style={{paddingLeft: '2%'}}>
          <Info4txtComponent
            text={formattedDate(orderDate)}
            color1={appColor.subText}
            color2={appColor.primary}
            fontsize={14}
            price={
              status == 'Đơn hàng đã được giao hoàn tất' ? 'Thành công' : status
            }
            fontFamily2={fontFamilies.semiBold}
          />
        </View>
        <Info4txtComponent
          text={' Khách hàng'}
          price={shippingAddress.recipientName}
          fontsize={19}
          fontFamily1={fontFamilies.semiBold}
          fontFamily2={fontFamilies.semiBold}
        />
        <Info4txtComponent
          text={' Nhà hàng'}
          price={shopOwner?.name ?? 'Không'}
          fontsize={19}
          fontFamily1={fontFamilies.semiBold}
          fontFamily2={fontFamilies.semiBold}
        />
        <Info4txtComponent
          text={' Loại thanh toán'}
          color1={appColor.subText}
          price={paymentMethod}
          fontsize={14}
        />
        <Info4txtComponent
          text={' Khoảng cách'}
          color1={appColor.subText}
          price={distance.toFixed(1) + ' Km'}
          fontsize={14}
        />
        <Info4txtComponent
          text={' Thu nhập'}
          color1={appColor.subText}
          price={formatCurrency(shippingfee)}
          fontsize={14}
        />
      </View>
    );
  };
console.log(Data)
  return (
    <ContainerComponent styles={globalStyle.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={{tintColor: 'white'}}
        itemTextStyle={{color: appColor.text}}
        data={date}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={date[0].label}
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />
      {/*Tổng doanh thu gồm số đơn, tổng thu nhập...*/}
      <View style={styles.revenue}>
        <View style={styles.boxed}>
          <View style={styles.wallanddate}>
            <Image
              style={[
                styles.img,
                {
                  flexShrink: value != 'day' ? 0.4 : 0.3,
                  flexGrow: value != 'day' ? 0.3 : 0.2,
                },
              ]}
              source={require('../../assets/images/shipper/wallet.png')}
            />
            <TextComponent
              text={new Date(Data.startDate).toLocaleDateString('vi-VN', {
                timeZone: 'UTC',
              })}
              fontsize={value != 'day' ? 16 : 18}
              fontFamily={fontFamilies.bold}
            />
            {value != 'day' && (
              <TextComponent
                text={
                  '-' +
                  new Date(Data.endDate).toLocaleDateString('vi-VN', {
                    timeZone: 'UTC',
                  })
                }
                fontsize={16}
                fontFamily={fontFamilies.bold}
              />
            )}
          </View>
          <Info4txtComponent
            color1={appColor.subText}
            fontsize={14}
            text={'Số đơn:'}
            price={Data.totalOrders}
          />
          <Info4txtComponent
            color1={appColor.subText}
            fontsize={14}
            text={'Tổng thu nhập:'}
            price={formatCurrency(Data.totalRevenue)}
          />
          <Info4txtComponent
            color1={appColor.subText}
            fontsize={14}
            text={'Nhận tiền mặt:'}
            price={formatCurrency(Data.cashTotal)}
          />
          <Info4txtComponent
            color1={appColor.subText}
            fontsize={14}
            text={'Nhận vào app:'}
            price={formatCurrency(Data.appTotal)}
          />
        </View>
      </View>
      {/*Lịch sử đơn hàng-gồm 1 img+text*/}
      <View style={styles.titlehisdeli}>
        <Image
          style={styles.time}
          source={require('../../assets/images/shipper/time.png')}
        />
        <TextComponent
          text={'Lịch sử giao hàng'}
          fontFamily={fontFamilies.semiBold}
          fontsize={20}
        />
      </View>
      {/*danh sách đơn hàng và hiển thị thông  không có đơn hàng khi trống*/}
      {Data?.orders?.length>=1 ? (
        <FlatList
          data={Data.orders}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.faltlist}
          refreshing={refreshing} // Trạng thái làm mới
          onRefresh={fetchRevenue} // Hàm gọi lại để làm mới
        />
      ) : (
        <View style={styles.nondelivery}>
          <Image
            style={styles.delivery}
            source={require('../../assets/images/shipper/delivery.png')}
          />
          <TextComponent
            text={'Bạn không có đơn hàng nào trong thời gian này'}
            fontsize={20}
            styles={{textAlign: 'center', width: '78%'}}
            fontFamily={fontFamilies.semiBold}
          />
        </View>
      )}
      {modalVisible && (
        <Customday
          Presscancel={() => {
            canncellayout();
          }}
          Pressok={() => {
            customdaycall();
          }}
          fromday={fromday}
          today={today}
          setfromday={setfromday}
          settoday={settoday}
        />
      )}
    </ContainerComponent>
  );
};

export default RevenueScreen;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: appColor.primary,
    padding: 13,
    width: '46%',
    borderRadius: 10,
  },
  placeholder: {
    fontFamily: fontFamilies.bold,
    color: appColor.white,
  },
  selectedTextStyle: {
    color: appColor.white,
    fontFamily: fontFamilies.bold,
  },
  revenue: {
    marginTop: '4%',
    flexShrink: 1,
    minHeight: '30%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: appColor.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxed: {
    width: '83%',
    height: 175,
    borderWidth: 1,
    backgroundColor: appColor.white,
    borderColor: appColor.gray,
    elevation: 8,
    borderRadius: 20,
    paddingLeft: '4%',
    paddingRight: '4%',
    alignSelf: 'center',
  },
  img: {
    resizeMode: 'contain',
    marginRight: 12,
  },
  wallanddate: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titlehisdeli: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: '3%',
    marginBottom: '3%',
  },
  time: {
    width: 35,
    aspectRatio: 1,
  },
  nondelivery: {
    flex: 1,
    marginTop: '3%',
    alignItems: 'center',
    gap: 20,
  },
  delivery: {
    flex: 0.3,
    resizeMode: 'contain',
  },
});
//data flatlist
const data = [
  {
    id: 1,
    status: 'Thành công',
    namecustomer: 'abc',
    nameshop: 'def',
    paymenttype: 'ZaloPay',
    gap: 6,
    total: '250,000',
    created_at: ' 29/08/2024, (14:26)',
  },
  {
    id: 2,
    status: 'Thành công',
    namecustomer: 'ax',
    nameshop: 'def',
    paymenttype: 'ZaloPay',
    gap: 4,
    total: '250,000',
    created_at: ' 29/08/2024, (07:26)',
  },
  {
    id: 3,
    status: 'Thành công',
    namecustomer: 'abcg',
    nameshop: 'def',
    paymenttype: 'ZaloPay',
    gap: 3,
    total: '250,000',
    created_at: ' 29/08/2024, (08:26)',
  },
];
//data cho dropdown
const date = [
  {label: 'Theo ngày', value: 'day'},
  {label: 'Theo tuần', value: 'week'},
  {label: 'Theo tháng', value: 'month'},
  {label: 'Tùy chỉnh ngày', value: 'custom_day'},
];
