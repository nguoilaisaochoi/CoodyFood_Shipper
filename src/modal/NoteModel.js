import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import RowComponent from '../components/RowComponent'
import TextComponent from '../components/TextComponent'
import { appColor } from '../constants/appColor'
import ButtonComponent from '../components/ButtonComponent'
import SpaceComponent from '../components/SpaceComponent'
import ShopAndProductComponent from '../components/ShopAndProductComponent'
import LineComponent from '../components/LineComponent'
import InputComponent from '../components/InputComponent'
import { appInfor } from '../constants/appInfor'

const NoteModel = ({ visible, product, onpress, item, title, value, onchangeText, onClose }) => {
    const [note, setNote] = useState('')
    // const { _id, name, image, sold, price, } = item
    console.log('item', item);

    return (
        <Modal visible={visible} transparent statusBarTranslucent onRequestClose={onClose} style={styles.container} animationType='fade'>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.body} activeOpacity={1}>
                        <RowComponent justifyContent={'space-between'} styles={styles.containerHeader}>
                            <ButtonComponent type={'link'} text={'Hủy'} color={appColor.white} onPress={onClose} />
                            <TextComponent text={title} color={appColor.white} />
                            <ButtonComponent type={'link'} text={'Xong'} color={appColor.white} onPress={onpress} />
                        </RowComponent>
                        <View style={{ paddingHorizontal: 15 }}>
                            <SpaceComponent height={20} />
                            {
                                product &&
                                <View>
                                    <ShopAndProductComponent quantity item={item} />
                                    <LineComponent />
                                    <SpaceComponent height={20} />
                                </View>
                            }
                            <TextComponent text={'Thêm ghi chú:'} />
                            <SpaceComponent height={12} />
                            <TextInput placeholder={'Nhập ghi chú...'}
                                placeholderTextColor={appColor.subText} style={styles.inputNote}
                                value={value} onChangeText={text => onchangeText(text)}
                            />
                            <SpaceComponent height={appInfor.sizes.height * 0.3} />

                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default NoteModel

const styles = StyleSheet.create({
    body: {
        backgroundColor: appColor.white,
        // paddingHorizontal: 20,
        borderTopEndRadius: 10,
        // borderTopRightRadius: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        borderTopEndRadius: 10,
        borderColor: appColor.primary,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    inputNote: {
        width: '100%',
        height: 120,
        backgroundColor: appColor.note,
        color: appColor.text,
        padding: 10,
        borderRadius: 10
    },
    containerHeader: {
        padding: 12,
        backgroundColor: appColor.primary,
    },
})