import React, {useEffect, useRef} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {appColor} from '../../../constants/appColor';
import {onImageLibrary, onOpenCamera} from './ImagePicker';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ButtonComponent from '../../../components/ButtonComponent';

const SelectImage = ({setImagePath, setIsSheetOpen}) => {
  const sheetRef = useRef(null); //để snap index bottomsheet

  // Mở Bottom Sheet
  const openSheet = () => {
    sheetRef.current.snapToIndex(0);
  };
  
  // Đóng Bottom Sheet
  const closeSheet = () => {
    sheetRef.current.close();
    setTimeout(() => {
      setIsSheetOpen(false);
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      openSheet();
    }, 100);
  }, []);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.bg}
      onPress={() => {
        closeSheet();
      }}>
      <BottomSheet
        ref={sheetRef}
        handleComponent={null}
        snapPoints={['18%']}
        index={-1}
        containerStyle={{flex: 1, zIndex: 10}}>
        <BottomSheetView style={styles.optionavatar}>
          <ButtonComponent
            text={'Chụp ảnh'}
            width={'40%'}
            color={appColor.white}
            height={51}
            onPress={() => {
              onOpenCamera(setImagePath);
              closeSheet();
            }}
          />
          <ButtonComponent
            text={'Thư viện'}
            width={'40%'}
            color={appColor.white}
            height={51}
            onPress={() => {
              onImageLibrary(setImagePath);
              closeSheet();
            }}
          />
        </BottomSheetView>
      </BottomSheet>
    </TouchableOpacity>
  );
};

export default SelectImage;
const styles = StyleSheet.create({
  optionavatar: {
    flex: 1,
    zIndex: 2,
    backgroundColor: appColor.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bg: {
    backgroundColor: 'rgba(217.81, 217.81, 217.81, 0.50)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
