import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appInfor } from '../constants/appInfor'
import { appColor } from '../constants/appColor'

const SplashScreen = () => {
    return (
        <ImageBackground style={styles.container} source={require('../assets/images/auth/Splash/background.png')}>
            <Image style={styles.logo} source={require('../assets/images/auth/Splash/logo.png')} />
        </ImageBackground>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:appColor.white
    },
    logo: {
        width: appInfor.sizes.width * 0.26,
        resizeMode: 'contain',
    },
})