import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import TextComponent from '../../../components/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {appColor} from '../../../constants/appColor';
import {useNavigation} from '@react-navigation/native';

//../../assets/images/shipper/user.png
const ItemAccount = ({text, icon, screen}) => {

  const images = {
    user: require('../../../assets/images/shipper/user.png'),
    setting: require('../../../assets/images/shipper/settings.png'),
    padlock: require('../../../assets/images/shipper/padlock.png'),
    logout: require('../../../assets/images/shipper/logout.png'),
  };
  const getImageSource = icons => {
    if (icons === 'user') {
      return images.user;
    } else if (icons == 'setting') {
      return images.setting;
    } else if (icons == 'padlock') {
      return images.padlock;
    } else {
      return images.logout;
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.item}
      onPress={screen}>
      <Image style={[styles.img, {flex: 0.2}]} source={getImageSource(icon)} />
      <TextComponent
        text={text}
        fontsize={16}
        fontfamily={fontFamilies.semiBold}
        styles={{flex: 2, textAlign: 'center'}}
      />
      <Image
        style={[styles.img, {flex: 0.15}]}
        source={require('../../../assets/images/shipper/enter.png')}
      />
    </TouchableOpacity>
  );
};

export default ItemAccount;
const styles = StyleSheet.create({
  item: {
    flexShrink: 1,
    flexGrow: 0.01,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4%',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: appColor.input,
    gap: 10,
  },
  img: {
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
