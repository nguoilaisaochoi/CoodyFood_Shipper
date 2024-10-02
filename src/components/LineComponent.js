import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appColor } from '../constants/appColor'

const LineComponent = () => {
    return (
        <View style={styles.container} />

    )
}

export default LineComponent

const styles = StyleSheet.create({
    container: {
        height: 2,
        backgroundColor: appColor.gray,
        width: '100%',
    }
})