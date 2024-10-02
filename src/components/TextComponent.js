import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appColor } from '../constants/appColor'
import { fontFamilies } from '../constants/fontFamilies'

const TextComponent = ({ text, color, fontsize, fontFamily, styles, textAlign, numberOfLines, ellipsizeMode, width }) => {
    return (
        <Text style={[{
            color: color ?? appColor.text,
            fontSize: fontsize ?? 16,
            fontFamily: fontFamily ?? fontFamilies.medium,
            textAlign: textAlign ?? 'left',
            width: width ?? 'auto'

        }, styles]}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
        >
            {text}
        </Text>
    )
}

export default TextComponent

const styles = StyleSheet.create({})