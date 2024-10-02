import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import SpaceComponent from './SpaceComponent'
import { fontFamilies } from '../constants/fontFamilies'
import { appColor } from '../constants/appColor'

const ReviewList = ({item}) => {
    const { name, rate, comment, images, avatar, day } = item
    return (
        <View style={styles.containerRate}>
            <Image source={avatar} style={styles.imgAvatar} />
            <View style={{ flex: 1 }}>
                <RowComponent justifyContent={'space-between'}>
                    <View>
                        <TextComponent text={name} fontsize={18} fontFamily={fontFamilies.bold} />
                        <SpaceComponent height={5} />
                        <TextComponent text={day} color={appColor.subText} fontsize={12} fontFamily={fontFamilies.regular} />
                    </View>
                    <Image source={require('../assets/images/productDetail/5start.png')} />
                </RowComponent>
                {comment && <TextComponent text={comment} fontsize={16} styles={{ marginTop: 15 }} />}

                {images && <RowComponent styles={{ marginTop: 15 }}>
                    {images.map((item, index) => (
                        <Image source={item} key={index} style={styles.imgRate} />
                    ))}
                </RowComponent>}

            </View>
        </View>
    )
}

export default ReviewList

const styles = StyleSheet.create({
    imgRate: {
        width: 100,
        height: 100,
        marginRight: 10
    },
    imgAvatar: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 15,
    },
    containerRate: {
        flexDirection: 'row',
        marginBottom: 30
    },
})