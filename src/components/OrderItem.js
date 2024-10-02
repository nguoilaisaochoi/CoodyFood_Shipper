import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import RowComponent from './RowComponent'
import SpaceComponent from './SpaceComponent'
import TextComponent from './TextComponent'
import { appColor } from '../constants/appColor'
import { fontFamilies } from '../constants/fontFamilies'
import { globalStyle } from '../styles/globalStyle'
import NoteModel from '../modal/NoteModel'

const OrderItem = ({ item, onpress, noTouch }) => {
    const { _id, name, price, quantity, image, note } = item
    const [visible, setVisible] = useState(false)
    const [noteItem, setNoteItem] = useState(note)
    return (
        <RowComponent styles={[styles.containerProduct, globalStyle.shawdow]}>
            <Image source={image} style={styles.imgProduct} />
            <SpaceComponent width={20} />
            <View style={{ flex: 1 }}>
                <RowComponent justifyContent={'space-between'}>
                    <TextComponent text={name} width={140} fontsize={16} numberOfLines={1} ellipsizeMode={'tail'} />
                    <TextComponent text={`${price}.000 đ`} fontsize={14} fontFamily={fontFamilies.bold} />
                </RowComponent>
                <SpaceComponent height={8} />
                <TextComponent text={`Số lượng: ${quantity}`} fontsize={14} color={appColor.subText} />
                <SpaceComponent height={8} />
                {noTouch ? <View style={styles.btnNote}>
                    <Image source={require('../assets/images/checkout/note.png')} />
                    <SpaceComponent width={8} />
                    <TextComponent text={'Ghi chú'} fontsize={10} />
                </View> :
                    <TouchableOpacity style={styles.btnNote} onPress={() => setVisible(true)}>
                        <Image source={require('../assets/images/checkout/note.png')} />
                        <SpaceComponent width={8} />
                        <TextComponent text={'Ghi chú'} fontsize={10} />
                    </TouchableOpacity>

                }
            </View>
            <NoteModel visible={visible} product={true} item={item} title={'Ghi chú'}
                value={noteItem} onchangeText={text => setNoteItem(text)} onClose={()=>setVisible(false)} />
        </RowComponent>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    imgProduct: {
        width: 65,
        height: 65,
        borderRadius: 10
    },
    btnNote: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerProduct: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: appColor.opacity,
        borderRadius: 10,
        marginBottom: 20
    },
})