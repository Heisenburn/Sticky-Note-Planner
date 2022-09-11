import { View, Pressable, Text } from 'react-native'
import styles from '../HomeScreen.styles'
import { useEffect, useState } from 'react'
import getElementsForKey from '../../../AsyncStorage/getElementsForKey'
import { useIsFocused } from '@react-navigation/native'

const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    return `#${randomColor}`
}

const CategoryItem = ({ item, navigation }) => {
    const { categoryId, details } = item
    const { categoryTitle, items } = details

    return (
        <Pressable
            style={[
                styles.categoryButton,
                styles.boxShadow,
                { backgroundColor: generateColor() },
            ]}
            onPress={() => {
                navigation.navigate('ListViewScreen', {
                    categoryId,
                    categoryTitle,
                })
            }}
        >
            <Text style={styles.heading}>{categoryTitle}</Text>
            <Text style={[styles.numberOfElements, styles.boxShadow]}>
                {items?.length}
            </Text>
        </Pressable>
    )
}

export default CategoryItem
