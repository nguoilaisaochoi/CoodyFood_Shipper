import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ContainerComponent from '../../components/ContainerComponent'
import SpaceComponent from '../../components/SpaceComponent'
import TextComponent from '../../components/TextComponent'
import RowComponent from '../../components/RowComponent'
import { appColor } from '../../constants/appColor'
import InputComponent from '../../components/InputComponent'
import ButtonComponent from '../../components/ButtonComponent'
import { globalStyle } from '../../styles/globalStyle'
import { fontFamilies } from '../../constants/fontFamilies'
import { validateEmail } from '../../utils/Validators'
import AxiosInstance from '../../helpers/AxiosInstance'
import LoadingModal from '../../modal/LoadingModal'

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const changeEmail = (text) => {
        setEmail(text)
        setErrorEmail(null)
    }
    const handleSubmit = async () => {
        if (!email) {
            setErrorEmail('Vui lòng nhập email')
            return
        }
        if (!validateEmail(email)) {
            setErrorEmail('Email không hợp lệ')
            return
        }
        setIsLoading(true)
        try {
            const response = await AxiosInstance().post('/users/verify', { email })
            if (response.status == true) {
                setIsLoading(false)
                navigation.navigate('Verify', { email, code: response.data })
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }

    }
    return (
        <ContainerComponent styles={globalStyle.container}>
            <ButtonComponent image={require('../../assets/images/auth/login-regis/back.png')} type={'link'} onPress={() => navigation.goBack()} />
            <SpaceComponent height={20} />
            <Image source={require('../../assets/images/auth/login-regis/logo.png')} />
            <SpaceComponent height={30} />
            <RowComponent >
                <TextComponent text={'Quên '} fontsize={36} fontFamily={fontFamilies.bold} />
                <TextComponent text={'mật khẩu'} fontsize={36} color={appColor.primary} fontFamily={fontFamilies.bold} />
            </RowComponent>
            <SpaceComponent height={20} />
            <TextComponent text={'Nhập email của bạn để chúng tôi gửi mã OTP để xác minh.'} fontsize={18} fontFamily={fontFamilies.bold} color={appColor.subText} />
            <SpaceComponent height={20} />
            <InputComponent label={'Email'} placeholder={'Nhập email'} value={email} onChangeText={text => changeEmail(text)} error={errorEmail} />
            {errorEmail && <TextComponent text={errorEmail} color={appColor.primary} fontsize={11} styles={{ marginTop: 5 }} />}
            <SpaceComponent height={30} />
            <ButtonComponent text={'Gửi mã OTP'} color={appColor.white} onPress={handleSubmit} />
            <LoadingModal visible={isLoading}/>
        </ContainerComponent>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({})