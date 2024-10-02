import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ContainerComponent from '../../components/ContainerComponent'
import ButtonComponent from '../../components/ButtonComponent'
import { globalStyle } from '../../styles/globalStyle'
import SpaceComponent from '../../components/SpaceComponent'
import TextComponent from '../../components/TextComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import { appColor } from '../../constants/appColor'
import RowComponent from '../../components/RowComponent'
import InputComponent from '../../components/InputComponent'
import { validatePhone } from '../../utils/Validators'
import { useDispatch } from 'react-redux'
import { loginWithSocial } from '../../Redux/API/UserAPI'

const AddPhoneScreen = ({ navigation, route }) => {
  const user = route.params.userInfo

  const [phone, setPhone] = useState('')
  const [errorPhone, setErrorPhone] = useState(null)
  const dispatch = useDispatch()
  const changePhone = (text) => {
    setPhone(text)
    setErrorPhone(null)
  }
  const handleSubmit = async () => {
    if (!phone) {
      setErrorPhone('Vui lòng nhập số điện thoại')
      return
    }
    if (!validatePhone(phone)) {
      setErrorPhone('Số điện thoại không hợp lệ')
      return
    }
    const userInfo = await { ...user, phone }
    console.log('userInfo:', userInfo);

    dispatch(loginWithSocial({ userInfo }))

  }
  return (
    <ContainerComponent styles={globalStyle.container}>
      <ButtonComponent image={require('../../assets/images/auth/login-regis/back.png')} type={'link'} onPress={() => navigation.goBack()} />
      <SpaceComponent height={20} />
      <Image source={require('../../assets/images/auth/login-regis/logo.png')} />
      <SpaceComponent height={20} />
      <RowComponent>
        <TextComponent text={'Thêm '} fontsize={28} fontFamily={fontFamilies.bold} />
        <TextComponent text={'số điện thoại'} fontsize={28} fontFamily={fontFamilies.bold} color={appColor.primary} />
      </RowComponent>
      <SpaceComponent height={10} />
      <TextComponent text={'Nhập số điện thoại của bạn để tiếp tục'} fontsize={16} color={appColor.subText} fontFamily={fontFamilies.bold} />
      <SpaceComponent height={30} />
      <InputComponent label={'Số điện thoại'} keyboardType={'number-pad'} value={phone} onChangeText={text => changePhone(text)} error={errorPhone} />
      {errorPhone && <TextComponent text={errorPhone} color={appColor.primary} fontsize={11} styles={{ marginTop: 5 }} />}
      <SpaceComponent height={30} />
      <ButtonComponent text={'Tiếp tục'} onPress={handleSubmit} color={appColor.white} />
    </ContainerComponent>
  )
}

export default AddPhoneScreen

const styles = StyleSheet.create({})