import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import HeaderComponent from '../../components/HeaderComponent';
import {globalStyle} from '../../styles/globalStyle';
import {Dropdown} from 'react-native-element-dropdown';
import {appColor} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import TextComponent from '../../components/TextComponent';
import Info4txtComponent from './ComposenentShipper/Info4txtComponent';

const RevenueScreen = () => {
  const [value, setValue] = useState(null);
  const [Data, setData] = useState(data);

  const renderItem = ({item}) => {
    const {
      status,
      namecustomer,
      nameshop,
      paymenttype,
      gap,
      total,
      created_at,
    } = item;
    return (
      <View style={[styles.boxed, {justifyContent: 'center', margin: '3.7%'}]}>
        <Info4txtComponent
          text={created_at}
          color1={appColor.subText}
          color2={appColor.primary}
          fontsize={14}
          price={status}
          fontFamily2={fontFamilies.semiBold}
        />
        <Info4txtComponent
          text={' Khách hàng'}
          price={namecustomer}
          fontsize={20}
          fontFamily1={fontFamilies.semiBold}
          fontFamily2={fontFamilies.semiBold}
        />
        <Info4txtComponent
          text={' Nhà hàng'}
          price={nameshop}
          fontsize={20}
          fontFamily1={fontFamilies.semiBold}
          fontFamily2={fontFamilies.semiBold}
        />
        <Info4txtComponent
          text={' Loại thanh toán'}
          color1={appColor.subText}
          price={paymenttype}
          fontsize={14}
        />
        <Info4txtComponent
          text={' Khoảng cách'}
          color1={appColor.subText}
          price={gap + ' Km'}
          fontsize={14}
        />
        <Info4txtComponent
          text={' Thu nhập'}
          color1={appColor.subText}
          price={total + ' đ'}
          fontsize={14}
        />
      </View>
    );
  };

  return (
    <ContainerComponent styles={globalStyle.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={{tintColor: 'white'}}
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
              style={styles.img}
              source={require('../../assets/images/shipper/wallet.png')}
            />
            <TextComponent
              text={'29/8/2024'}
              fontsize={18}
              fontFamily={fontFamilies.bold}
            />
          </View>
          <Info4txtComponent
            color1={appColor.subText}
            fontsize={14}
            text={'Số đơn:'}
            price={999999999999}
          />
          <Info4txtComponent
            color1={appColor.subText}
            fontsize={14}
            text={'Tổng thu nhập:'}
            price={999999999999 + ' đ'}
          />
          <Info4txtComponent
            color1={appColor.subText}
            fontsize={14}
            text={'Nhận tiền mặt:'}
            price={999999999999 + ' đ'}
          />
          <Info4txtComponent
            color1={appColor.subText}
            fontsize={14}
            text={'Nhận vào app:'}
            price={999999999999 + ' đ'}
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
          text={'Lịch sử đơn hàng'}
          fontFamily={fontFamilies.semiBold}
          fontsize={20}
        />
      </View>
      {/*danh sách đơn hàng và hiển thị thông  không có đơn hàng khi trống*/}
      {Data.length > 1 ? (
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.faltlist}
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
    </ContainerComponent>
  );
};

export default RevenueScreen;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: appColor.primary,
    padding: 13,
    width: '42%',
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
    minHeight: "30%",
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
    flexShrink: 0.3,
    flexGrow: 0.2,
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
  {label: 'Theo ngày', value: '1'},
  {label: 'Theo tuần', value: '2'},
  {label: 'Theo tháng', value: '3'},
  {label: 'Tuỳ chọn ngày', value: '4'},
];
