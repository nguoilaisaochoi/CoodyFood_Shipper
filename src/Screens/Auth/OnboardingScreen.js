import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Swiper from 'react-native-swiper'
import { appColor } from '../../constants/appColor'
import TextComponent from '../../components/TextComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import ButtonComponent from '../../components/ButtonComponent'

const OnboardingScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0)
    console.log('index', index);

    const handleFinish = () => {
        navigation.navigate('Login')

    }
    return (
        <View style={styles.container}>
            <Swiper
                loop={false}
                showsPagination={false}
                buttonWrapperStyle={styles.viewBtn}
                showsButtons
                prevButton={<Text style={{ display: 'none' }}></Text>}
                nextButton={<View style={styles.btnNext}><Image source={require('../../assets/images/auth/onboarding/next.png')} /></View>}
                index={index}
                onIndexChanged={num => setIndex(num)}
            >
                <Image style={styles.img} source={require('../../assets/images/auth/onboarding/1.png')} />
                <Image style={styles.img} source={require('../../assets/images/auth/onboarding/2.png')} />
                <Image style={styles.img} source={require('../../assets/images/auth/onboarding/3.png')} />
            </Swiper>
            {index == 2 && <View style={{ position: 'absolute', bottom: 50 }}>
                <TouchableOpacity onPress={handleFinish} style={styles.btnNext}>
                    <Image source={require('../../assets/images/auth/onboarding/next.png')} />
                </TouchableOpacity>
            </View>}
            <ButtonComponent type={'link'} text={'Skip'} styles={styles.skip} onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    skip: {
        position: 'absolute',
        top: 50,
        right: 24,
    },
    btnNext: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        backgroundColor: appColor.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    viewBtn: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'absolute',
        paddingBottom: 50,
        zIndex: 1

    },
    img: {
        width: '100%',
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

})