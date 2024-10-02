import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import TextComponent from '../components/TextComponent'
import { fontFamilies } from '../constants/fontFamilies'
import SpaceComponent from '../components/SpaceComponent'
import { appColor } from '../constants/appColor'

const AlertModel = ({ title, description, visible, onRequestClose, fail }) => {
    return (
        <Modal visible={visible} transparent statusBarTranslucent onRequestClose={onRequestClose} animationType='fade'>
            <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={styles.container} >
                    <TouchableOpacity style={styles.body} activeOpacity={1}>
                        {
                            fail ?
                                <TextComponent text={'Thất bại'} fontsize={24} fontFamily={fontFamilies.bold} />
                                :
                                <TextComponent text={'Thành công'} fontsize={24} fontFamily={fontFamilies.bold} />
                        }
                        <SpaceComponent height={30} />
                        {
                            fail ?
                                <Image source={require('../assets/images/alert/fail.png')} />
                                :
                                <Image source={require('../assets/images/alert/success.png')} />
                        }
                        <SpaceComponent height={30} />
                        <TextComponent text={description} fontsize={20} fontFamily={fontFamilies.bold} />
                    </TouchableOpacity>
                </View>

            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default AlertModel

const styles = StyleSheet.create({
    body: {
        width: '80%',
        backgroundColor: appColor.white,
        paddingVertical: 40,
        alignItems: 'center',
        zIndex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})