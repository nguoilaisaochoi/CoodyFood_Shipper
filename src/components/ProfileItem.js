import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent'
import { appColor } from '../constants/appColor'

const ProfileItem = ({ text, image, onpress }) => {
    return (
        <TouchableOpacity style={styles.btnItem} onPress={onpress}>
            <Image source={image} style={styles.imgItem} />
            <TextComponent text={text} fontsize={16} />
            <Image source={require('../assets/images/profile/right.png')} />
        </TouchableOpacity>
    )
}

export default ProfileItem

const styles = StyleSheet.create({
    imgItem:{
        width:25,
        height:25,
        resizeMode:'contain'
    },
    btnItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: appColor.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: appColor.gray,
        marginBottom: 20
    },
})