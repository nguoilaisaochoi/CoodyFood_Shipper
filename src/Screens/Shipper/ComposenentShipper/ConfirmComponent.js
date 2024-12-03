import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import ButtonComponent from '../../../components/ButtonComponent';
import TextComponent from '../../../components/TextComponent';
import {appColor} from '../../../constants/appColor';
import {fontFamilies} from '../../../constants/fontFamilies';

const ConfirmComponent = ({titile, setModalVisible, Presscancel, Pressok}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <TouchableOpacity
        style={styles.modalview}
        activeOpacity={1}
        onPress={() => setModalVisible(false)}>
        <View style={styles.modalcontent}>
          <TextComponent
            text={titile}
            fontFamily={fontFamilies.bold}
            fontsize={25}
          />
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
              text={'Xác nhận'}
              width={'40%'}
              color={appColor.white}
              fontsize={15}
              textStyle={{fontFamily: fontFamilies.bold}}
              onPress={Pressok}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmComponent;
const styles = StyleSheet.create({
  modalview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(217.81,217.81, 217.81, 0.5)',
  },
  modalcontent: {
    width: '77%',
    minHeight: '25%',
    backgroundColor: appColor.white,
    borderRadius: 20,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3%',
    gap: 30,
  },
  viewbutton: {
    flexDirection: 'row',
    width: '100%',
    gap: 20,
    justifyContent: 'center',
  },
});
