import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ContainerComponent from '../../components/ContainerComponent'
import SpaceComponent from '../../components/SpaceComponent'
import InputComponent from '../../components/InputComponent'
import { validatePass } from '../../utils/Validators'
import ButtonComponent from '../../components/ButtonComponent'
import RowComponent from '../../components/RowComponent'
import TextComponent from '../../components/TextComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import { appColor } from '../../constants/appColor'
import { globalStyle } from '../../styles/globalStyle'
import AxiosInstance from '../../helpers/AxiosInstance'
import LoadingModal from '../../modal/LoadingModal'

const ResetPasswordScreen = ({ navigation, route }) => {
    const { email } = route.params

    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const changedPassword = (text) => {
        setPassword(text)
        setErrorPassword(null)
    }
    const changeConfirmPassword = (text) => {
        setConfirmPassword(text)
        setErrorConfirmPassword(null)
    }
    const handleSubmit = async () => {
        if (!password) {
            setErrorPassword('Vui lòng nhập mật khẩu')
            return
        }
        if (!validatePass(password)) {
            setErrorPassword('Mật khẩu phải chứa ít nhất 6 ký tự')
            return
        }
        if (!confirmPassword) {
            setErrorConfirmPassword('Vui lòng nhập mật khẩu')
            return
        }
        if (confirmPassword !== password) {
            setErrorConfirmPassword('Mật khẩu không khớp')
            return
        }
        setIsLoading(true)
        try {
            const response = await AxiosInstance().post('/users/reset-password', { email, password })
            if (response.status == true) {
                setIsLoading(false)
                navigation.navigate('Login')
            }
        } catch (error) {
            console.log('error', error);
        }
    }
    return (
        <ContainerComponent styles={globalStyle.container}>
            <ButtonComponent image={require('../../assets/images/auth/login-regis/back.png')} type={'link'} onPress={() => navigation.goBack()} />
            <SpaceComponent height={20} />
            <Image source={require('../../assets/images/auth/login-regis/logo.png')} />
            <SpaceComponent height={20} />
            <RowComponent>
                <TextComponent text={'Đổi '} fontsize={28} fontFamily={fontFamilies.bold} />
                <TextComponent text={'mật khẩu'} fontsize={28} fontFamily={fontFamilies.bold} color={appColor.primary} />
            </RowComponent>
            <SpaceComponent height={10} />
            <TextComponent text={'Vui lòng diền mật khẩu bạn muốn thay đổi'} fontsize={16} color={appColor.subText} fontFamily={fontFamilies.bold} />
            <SpaceComponent height={30} />
            <InputComponent label={'Mật khẩu'} placeholder={'Nhập mật khẩu mới'} value={password} isPassword onChangeText={text => changedPassword(text)} error={errorPassword} />
            {errorPassword && <TextComponent text={errorPassword} color={appColor.primary} fontsize={11} styles={{ marginTop: 5 }} />}
            <SpaceComponent height={30} />
            <InputComponent label={'Nhập lại mật khẩu'} isPassword placeholder={'Nhập lại mật khẩu mới'} value={confirmPassword} onChangeText={text => changeConfirmPassword(text)} error={errorConfirmPassword} />
            {errorConfirmPassword && <TextComponent text={errorConfirmPassword} color={appColor.primary} fontsize={11} styles={{ marginTop: 5 }} />}
            <SpaceComponent height={30} />
            <ButtonComponent text={'Xác nhận'} onPress={handleSubmit} color={appColor.white} />
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({})