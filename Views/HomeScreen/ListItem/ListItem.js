import { View, Pressable, Text } from 'react-native'
import styles from '../HomeScreen.styles'
import { useEffect, useState } from 'react'
import getNotesForCategory from '../../../LocalStorage/getNotesForCategory'
import { useIsFocused } from '@react-navigation/native'

const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    return `#${randomColor}`
}

const ListItem = ({ title, navigation }) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={[
                    styles.categoryButton,
                    styles.boxShadow,
                    { backgroundColor: generateColor() },
                ]}
                onPress={() => {
                    navigation.navigate('ListViewScreen', {
                        itemId: title,
                    })
                }}
            >
                <Text style={styles.heading}>{title}</Text>
                <Text style={[styles.numberOfElements, styles.boxShadow]}>
                    {10}
                </Text>
            </Pressable>
        </View>
    )
}

export default ListItem
