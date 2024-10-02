import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { forwardRef } from 'react'
import RowComponent from './RowComponent'
import { appColor } from '../constants/appColor'
import { fontFamilies } from '../constants/fontFamilies'

const SearchComponent = forwardRef(({ placeholder, value, onchangeText, styles, icon, onPress }, ref) => {
    return (
        <RowComponent styles={styless.container}>
            <Image source={require('../assets/images/home/search.png')} />
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={text => onchangeText(text)}
                placeholderTextColor={appColor.subText}
                style={styless.input}
                onPress={onPress}
                ref={ref}
            />

        </RowComponent>
    )
})

export default SearchComponent

const styless = StyleSheet.create({
    input: {
        fontSize: 16,
        fontFamily: fontFamilies.medium,
        color: appColor.text,
        paddingHorizontal: 10,
        width: '100%'
    },
    container: {
        height: 50,
        flex:1,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: appColor.gray,
        borderRadius: 10,
    }
})