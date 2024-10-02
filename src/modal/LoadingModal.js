import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appColor } from '../constants/appColor'

const LoadingModal = ({ visible }) => {
    return (
        <Modal visible={visible} transparent statusBarTranslucent>
            <View style={styles.container}>
                <ActivityIndicator color={appColor.white} size={32} />
            </View>
        </Modal>
    )
}

export default LoadingModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})