import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyle } from '../styles/globalStyle'

const ContainerComponent = ({ isScroll, children, styles }) => {
    return (
        isScroll ?
            <ScrollView style={styles} showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView> :
            <View style={styles}>
                {children}
            </View>
    )
}

export default ContainerComponent

const styles = StyleSheet.create({})