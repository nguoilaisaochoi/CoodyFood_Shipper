import { Image, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import ContainerComponent from '../../components/ContainerComponent'
import SpaceComponent from '../../components/SpaceComponent'
import RowComponent from '../../components/RowComponent'
import TextComponent from '../../components/TextComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import { appColor } from '../../constants/appColor'
import InputComponent from '../../components/InputComponent'
import ButtonComponent from '../../components/ButtonComponent'
import { appInfor } from '../../constants/appInfor'
import { globalStyle } from '../../styles/globalStyle'
import { validateEmail, validatePass, validatePhone } from '../../utils/Validators'
import AxiosInstance from '../../helpers/AxiosInstance'
import LoadingModal from '../../modal/LoadingModal'

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [phone, setPhone] = useState('')
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPass, setErrorPass] = useState(null)
    const [errorRePass, setErrorRePass] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const changeEmail = (data) => {
        setEmail(data)
        setErrorEmail('')
    }

    const changePass = (data) => {
        setPassword(data)
        setErrorPass('')
    }

    const changePhone = (data) => {
        setPhone(data)
        setErrorPhone('')
    }

    const changeRePass = (data) => {
        setRePassword(data)
        setErrorRePass('')
    }

    const handleRegister = async () => {
        if (!email && !password && !name) {
            setErrorEmail('Email không được để trống')
            setErrorPass('Password không được để trống')
            setErrorPhone('Số điện thoại không được để trống')
            return
        }
        if (!email) {
            setErrorEmail('Email không được để trống')
            return
        }
        if (!password) {
            setErrorPass('Password không được để trống')
            return
        }
        if (!phone) {
            setErrorPhone('Name không được để trống')
            return
        }
        if (!validateEmail(email)) {
            setErrorEmail('Email không phù hợp')
            return
        }
        if (!validatePhone(phone)) {
            setErrorPhone('Số điện thoại không hợp lệ')
            return
        }
        if (!validatePass(password)) {
            setErrorPass('Password phải có trên 6 kí tự')
            return
        }
        if (password != rePassword) {
            setErrorRePass('Mật khẩu không khớp')
            setErrorPass('Mật khẩu không khớp')
            return
        }
        setIsLoading(true)
        try {
            const response = await AxiosInstance().post('/users/register', { email, password, phone })
            if (response.status == true) {
                ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT)
                setIsLoading(false)
                navigation.navigate('Login')
                return response.data
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }
    return (
        <ContainerComponent isScroll={true} styles={globalStyle.container}>
            <Image source={require('../../assets/images/auth/login-regis/logo.png')} />
            <SpaceComponent height={30} />
            <RowComponent >
                <TextComponent text={'Coody '} fontsize={28} fontFamily={fontFamilies.bold} color={appColor.primary} />
                <TextComponent text={'Xin Chào'} fontsize={28} fontFamily={fontFamilies.bold} />
            </RowComponent>
            <SpaceComponent height={10} />
            <TextComponent text={'Vui lòng nhập thông tin của bạn'} fontFamily={fontFamilies.bold} color={appColor.subText} />
            <SpaceComponent height={30} />
            <InputComponent label={'Email'} placeholder={'Nhập email'} value={email} onChangeText={text => changeEmail(text)} error={errorEmail} />
            {
                errorEmail && <View style={{ marginTop: 5 }}><TextComponent text={errorEmail} color={'red'} fontsize={11} /></View>
            }
            <SpaceComponent height={20} />
            <InputComponent label={'Số điện thoại'} placeholder={'Nhập số điện thoại'} value={phone} onChangeText={text => changePhone(text)} error={errorPhone} />
            {
                errorPhone && <View style={{ marginTop: 5 }}><TextComponent text={errorPhone} color={'red'} fontsize={11} /></View>
            }
            <SpaceComponent height={20} />
            <InputComponent label={'Mật khẩu'} placeholder={'Nhập mật khẩu'} value={password} onChangeText={text => changePass(text)} error={errorPass} isPassword />
            {
                errorPass && <View style={{ marginTop: 5 }}><TextComponent text={errorPass} color={'red'} fontsize={11} /></View>
            }
            <SpaceComponent height={20} />
            <InputComponent label={'Xác nhận mật khẩu'} placeholder={'Nhập lại mật khẩu'} value={rePassword} error={errorRePass} onChangeText={text => changeRePass(text)} isPassword />
            {
                errorRePass && <View style={{ marginTop: 5 }}><TextComponent text={errorRePass} color={'red'} fontsize={11} /></View>
            }
            <SpaceComponent height={30} />
            <ButtonComponent text={'Đăng ký'} color={appColor.white} onPress={handleRegister} />
            <SpaceComponent height={20} />
            <ButtonComponent text={'Đăng nhập'} color={appColor.primary} backgroundColor={appColor.white} onPress={() => navigation.navigate('Login')} />
            <SpaceComponent height={30} />
            <TextComponent text={'Hoặc đăng nhập bằng'} color={appColor.subText} textAlign='center' />
            <SpaceComponent height={30} />
            <RowComponent justifyContent='space-between'>
                <ButtonComponent
                    width={appInfor.sizes.width * 0.37}
                    height={51}
                    icon={<Image source={require('../../assets/images/auth/login-regis/gg.png')} />}
                    text={'Google'}
                    backgroundColor={appColor.white}
                    borderColor={appColor.subText}
                />
                <ButtonComponent
                    width={appInfor.sizes.width * 0.37}
                    height={51}
                    icon={<Image source={require('../../assets/images/auth/login-regis/fb.png')} />}
                    text={'Facebook'}
                    backgroundColor={appColor.white}
                    borderColor={appColor.subText}
                />
            </RowComponent>
            <SpaceComponent height={50} />
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    a: {
        paddingBottom: 50
    }
})