import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ContainerComponent from '../../components/ContainerComponent'
import SpaceComponent from '../../components/SpaceComponent'
import RowComponent from '../../components/RowComponent'
import TextComponent from '../../components/TextComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import { appColor } from '../../constants/appColor'
import { globalStyle } from '../../styles/globalStyle'
import ButtonComponent from '../../components/ButtonComponent'
import AxiosInstance from '../../helpers/AxiosInstance'
import LoadingModal from '../../modal/LoadingModal'

const VerifyScreen = ({ navigation, route }) => {
    const { email, code } = route.params

    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()

    const [codevalue, setCodeValue] = useState(['', '', '', ''])
    const [codeMain, setCodeMain] = useState('')
    const [codeCurrent, setCodeCurrent] = useState(code)
    const [time, setTime] = useState(120)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errorMess, setErrorMess] = useState('')
    console.log('codevalue', codevalue);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (ref1.current) {
                ref1.current.focus();
            }
        }, 100); // Delay to ensure the component is mounted
        return () => clearTimeout(timer);
    }, [])
    const handleChangeCode = (value, index) => {
        if (value.length > 0) {
            if (index === 0) {
                ref2.current.focus()
            }
            if (index === 1) {
                ref3.current.focus()
            }
            if (index === 2) {
                ref4.current.focus()
            }
            if (index === 3) {
                ref4.current.blur()
            }
        }
        const data = [...codevalue]

        data[index] = value
        console.log('data', data);
        setCodeValue(data)
    }
    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && codevalue[index] === '') {
            if (index === 1) {
                ref1.current.focus();
            }
            if (index === 2) {
                ref2.current.focus();
            }
            if (index === 3) {
                ref3.current.focus();
            }
        }
    };


    useEffect(() => {
        let item = ''
        codevalue.forEach(element => { item += element })
        setCodeMain(item)
    }, [codevalue])

    useEffect(() => {
        if (time > 0) {
            const interval = setInterval(() => {
                setTime(time => time - 1)
            }, 1000);
            return () => clearInterval(interval)
        }
    }, [time])

    const handleResetCode = async () => {
        try {
            setCodeValue(['', '', '', ''])
            setCodeMain('')
            setError('')
            setIsLoading(true)
            const response = await AxiosInstance().post('/users/verify', { email })
            if (response.status == true) {
                setIsLoading(false)
                setCodeCurrent(response.data)
                setTime(120)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }
    const handleVerify = async () => {
        setIsLoading(true)
        try {
            if (time > 0) {
                if (codeMain == codeCurrent) {
                    setIsLoading(false)
                    navigation.navigate('ResetPassword', { email })
                } else {
                    setIsLoading(false)
                    setError('Mã xác thực không chính xác')
                }
            } else {
                setIsLoading(false)
                setError('Mã xác thực đã hết hạn')
            }
        } catch (error) {
            console.log('verify error', error);
            setIsLoading(false)
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    return (
        <ContainerComponent styles={globalStyle.container}>
            <ButtonComponent image={require('../../assets/images/auth/login-regis/back.png')} type={'link'} onPress={() => navigation.goBack()} />
            <SpaceComponent height={20} />
            <Image source={require('../../assets/images/auth/login-regis/logo.png')} />
            <SpaceComponent height={30} />
            <RowComponent>
                <TextComponent text={'Nhập '} fontsize={28} fontFamily={fontFamilies.bold} />
                <TextComponent text={'mã xác thực'} fontsize={28} color={appColor.primary} fontFamily={fontFamilies.bold} />
            </RowComponent>
            <SpaceComponent height={10} />
            <TextComponent text={'Mã xác thực đã được gửi đến email'} color={appColor.subText} />
            <SpaceComponent height={40} />
            <RowComponent justifyContent={'space-between'}>
                <TextInput
                    style={styles.input}
                    maxLength={1}
                    keyboardType='number-pad'
                    ref={ref1}
                    value={codevalue[0]}
                    onChangeText={text => handleChangeCode(text, 0)}
                    onKeyPress={(e) => handleKeyPress(e, 0)}
                />
                <TextInput
                    style={styles.input}
                    maxLength={1}
                    keyboardType='number-pad'
                    ref={ref2}
                    value={codevalue[1]}
                    onChangeText={text => handleChangeCode(text, 1)}
                    onKeyPress={(e) => handleKeyPress(e, 1)}
                />
                <TextInput
                    style={styles.input}
                    maxLength={1}
                    keyboardType='number-pad'
                    ref={ref3}
                    value={codevalue[2]}
                    onChangeText={text => handleChangeCode(text, 2)}
                    onKeyPress={(e) => handleKeyPress(e, 2)}
                />
                <TextInput
                    style={styles.input}
                    maxLength={1}
                    keyboardType='number-pad'
                    ref={ref4}
                    value={codevalue[3]}
                    onChangeText={text => handleChangeCode(text, 3)}
                    onKeyPress={(e) => handleKeyPress(e, 3)}
                />
            </RowComponent>
            {error && <TextComponent text={error} color={appColor.primary} fontsize={14} styles={{ marginTop: 10 }} />}
            <SpaceComponent height={40} />
            <ButtonComponent text={'Next'} color={appColor.white} onPress={handleVerify} />
            <SpaceComponent height={20} />
            {time > 0 ? <RowComponent justifyContent={'center'}>
                <TextComponent text={'Bạn không nhận được mã?  '} fontsize={14} />
                <ButtonComponent type={'link'} text={`Gửi lại (${formatTime(time)})`} color={appColor.primary} fontsize={14} />
            </RowComponent> :
                <ButtonComponent type={'link'} text={'Gửi lại'} color={appColor.primary} onPress={handleResetCode} fontsize={14} textStyle={{ textAlign: 'center' }} />
            }
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    )
}

export default VerifyScreen

const styles = StyleSheet.create({
    input: {
        width: 58,
        height: 58,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: appColor.gray,
        color: appColor.text,
        textAlign: 'center',
        fontSize: 26,
        fontFamily: fontFamilies.bold
    },
})