import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { fontFamilies } from '../constants/fontFamilies'
import { appColor } from '../constants/appColor'
import { globalStyle } from '../styles/globalStyle'

const ShopRecomendList = ({ item, onpress, type, index, list }) => {
  const { id, name, location, time, rate, image } = item
  return (
    type == 'large' ?
      <TouchableOpacity style={[styles.containerRecomend, globalStyle.shawdow, index == list.length - 1 && styles.itemLast]} onPress={onpress}>
        <Image style={styles.imgRecomend} source={image} />
        <RowComponent justifyContent={'space-between'} styles={styles.viewInfo}>
          <View>
            <TextComponent text={name} fontsize={14} numberOfLines={1} ellipsizeMode={'tail'} width={170} />
            <TextComponent text={`${location}.0 km | ${time} phút`} fontsize={12} color={appColor.subText} />
          </View>
          <RowComponent styles={styles.viewRate}>
            <TextComponent text={rate} fontsize={14} fontFamily={fontFamilies.bold} color={appColor.white} />
            <Image source={require('../assets/images/home/startWhite.png')} style={{ marginLeft: 5 }} />
          </RowComponent>
        </RowComponent>
      </TouchableOpacity>
      :
      <TouchableOpacity style={[styles.containerRecomendSmall, globalStyle.shawdow, index == list.length - 1 && styles.itemLast]} onPress={onpress}>
        <Image style={styles.imgRecomendSmall} source={image} />
        <RowComponent justifyContent={'space-between'} styles={styles.viewInfo}>
          <View>
            <TextComponent text={name} fontsize={12} styles={{ width: 80 }} numberOfLines={1} ellipsizeMode={'tail'} />
            <TextComponent text={`${location}.0 km | ${time} phút`} fontsize={10} color={appColor.subText} />
          </View>
          <RowComponent styles={styles.viewRateSmall}>
            <TextComponent text={rate} fontsize={12} fontFamily={fontFamilies.bold} color={appColor.white} />
            <Image source={require('../assets/images/home/startWhite.png')} style={styles.imgStarSmall} />
          </RowComponent>
        </RowComponent>
      </TouchableOpacity>
  )
}

export default ShopRecomendList

const styles = StyleSheet.create({
  imgStarSmall: {
    width: 12,
    height: 12,
    marginLeft: 3
  },
  viewRateSmall: {
    width: 45,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: appColor.green
  },
  imgRecomendSmall: {
    width: 143,
    height: 116,
    borderRadius: 15
  },
  containerRecomendSmall: {
    padding: 7,
    borderWidth: 1,
    borderColor: appColor.gray,
    borderRadius: 15,
    marginRight: 20,
    backgroundColor: appColor.white,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    elevation: 4,
    marginBottom: 10
  },
  itemLast: {
    marginRight: 0
  },
  viewRate: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: appColor.green
  },
  viewInfo: {
    paddingVertical: 10
  },
  imgRecomend: {
    width: 230,
    height: 156,
    borderRadius: 15
  },
  containerRecomend: {
    padding: 10,
    borderWidth: 1,
    borderColor: appColor.gray,
    borderRadius: 15,
    marginRight: 40,
    backgroundColor: appColor.white,
    marginBottom: 10
  },
})