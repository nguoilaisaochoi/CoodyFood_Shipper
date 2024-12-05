import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonComponent from '../../../components/ButtonComponent';
import TextComponent from '../../../components/TextComponent';
import {appColor} from '../../../constants/appColor';
import {fontFamilies} from '../../../constants/fontFamilies';
import DateTimePicker from '@react-native-community/datetimepicker';

const Customday = ({
  Presscancel,
  Pressok,
  fromday,
  today,
  setfromday,
  settoday,
}) => {
  const [timeType, setTimeType] = useState(null); //phân biệt thời gian mở và đóng để setState
  const [showPicker, setshowPicker] = useState(false); //bật/tắt DateTimePicker
  const [correct, setCorrect] = useState(false);
  //hàm xử lí khi DateTimePicker đc bật
  const handleDateChange = (event, selectedTime) => {
    if (event.type == 'set') {
      if (timeType == 'fromday') {
        setfromday(selectedTime);
      } else {
        settoday(selectedTime);
      }
      setshowPicker(false);
    }
  };
  useEffect(() => {
    if (fromday && today) {
      const date1 = new Date(fromday);
      const date2 = new Date(today);
      setCorrect(date1 < date2 ? true : false);
    }
  }, [today, fromday]);
  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <TouchableOpacity
        style={styles.modalview}
        activeOpacity={1}
        onPress={Presscancel}>
        <View style={styles.modalcontent}>
          <TextComponent text={'Từ ngày'} fontFamily={fontFamilies.semiBold} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setshowPicker(true);
              setTimeType('fromday');
            }}>
            <TextComponent
              text={fromday ? fromday.toLocaleDateString() : 'Trống'}
            />
          </TouchableOpacity>
          <TextComponent text={'Đến ngày'} fontFamily={fontFamilies.semiBold} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setshowPicker(true);
              setTimeType('today');
            }}>
            <TextComponent
              text={today ? today.toLocaleDateString() : 'Trống'}
            />
          </TouchableOpacity>
          <View style={styles.viewbutton}>
            <ButtonComponent
              text={'Huỷ'}
              width={'40%'}
              color={appColor.text}
              backgroundColor={appColor.white}
              borderColor={appColor.white}
              textStyle={{fontFamily: fontFamilies.bold}}
              onPress={Presscancel}
            />
            <ButtonComponent
              text={'Chọn'}
              width={'40%'}
              color={appColor.white}
              fontsize={15}
              textStyle={{fontFamily: fontFamilies.bold}}
              styles={{opacity: correct ? 1 : 0.5}}
              onPress={correct ? Pressok : null}
            />
          </View>
        </View>
        {showPicker && (
          <DateTimePicker
            mode={'date'}
            value={new Date()}
            onChange={handleDateChange}
          />
        )}
      </TouchableOpacity>
    </Modal>
  );
};

export default Customday;
const styles = StyleSheet.create({
  modalview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(217.81,217.81, 217.81, 0.5)',
  },
  modalcontent: {
    width: '77%',
    minHeight: '23%',
    backgroundColor: appColor.white,
    borderRadius: 20,
    elevation: 10,
    padding: '4%',
    gap: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    height: 58,
    borderColor: appColor.input,
    justifyContent: 'center',
    paddingLeft: '5%',
  },
  viewbutton: {
    flexDirection: 'row',
    width: '100%',
    gap: 20,
    justifyContent: 'center',
  },
});
