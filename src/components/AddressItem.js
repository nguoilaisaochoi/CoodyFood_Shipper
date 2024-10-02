import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import SpaceComponent from './SpaceComponent'
import LineComponent from './LineComponent'
import TextComponent from './TextComponent'
import ButtonComponent from './ButtonComponent'
import { appColor } from '../constants/appColor'
import { globalStyle } from '../styles/globalStyle'

const AddressItem = ({ title, address, name, phone, save }) => {
    return (
        <View style={[styles.viewAddress, globalStyle.shawdow]}>
            <RowComponent justifyContent={'space-between'}>
                <TextComponent text={title} />
                {save && <ButtonComponent text={'Chỉnh sửa'} type={'link'} color={appColor.primary} fontsize={12} />}
            </RowComponent>
            <SpaceComponent height={10} />
            <LineComponent />
            <SpaceComponent height={10} />
            <TextComponent text={address} fontsize={14} />
            <SpaceComponent height={15} />
            <RowComponent justifyContent={'space-between'}>
                <TextComponent text={`${name} | ${phone}`} fontsize={14} />
                {save &&
                    <ButtonComponent text={'Chọn'} color={appColor.white} fontsize={12} width={74} height={25} borderRadius={6} />
                }
            </RowComponent>
        </View>
    )
}

export default AddressItem

const styles = StyleSheet.create({
    viewAddress: {
        padding: 20,
        borderRadius: 20,
        backgroundColor: appColor.white,
        marginBottom: 10
    }
})