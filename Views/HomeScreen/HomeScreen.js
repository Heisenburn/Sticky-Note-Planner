import { SafeAreaView } from 'react-native'
import CategoriesList from './Categories/CategoriesList'
import FloatingButton from '../../shared/FloatingButton/FloatingButton'
import styles from './HomeScreen.styles'
import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CATEGORY_KEY_PREFIX } from '../../shared/constants'
import { getAllKeys } from '../../LocalStorage/saveNoteToCategory'

// Do wyciągania wszystkiego
// const keys = await AsyncStorage.getAllKeys()
// const stores = await AsyncStorage.multiGet(keys)
//
// console.log(stores)

const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // clear error
    }

    console.log('Done.')
}

export default function HomeScreenBase({ navigation }) {
    const isFocused = useIsFocused()
    const [categories, setCategories] = useState([])

    //TODO: trzymanie PREDEFINED_CATEGORIES w AsyncStorage?

    const getItemsForCategories = async (array) => {
        let values
        try {
            values = await AsyncStorage.multiGet(array)
            return values
        } catch (e) {
            throw e
        }
    }

    // run refresh list items each team view is visible
    useEffect(async () => {
        if (isFocused) {
            // get available categories and their items
            const availableKeys = await getAllKeys()
            const keysWithCategoryKeyword = availableKeys.filter((item) =>
                item.includes(CATEGORY_KEY_PREFIX)
            )

            getItemsForCategories(keysWithCategoryKeyword).then((response) => {
                if (response) {
                    // console.log({ response })
                    setCategories(response)
                }
            })
        }
    }, [isFocused])

    return (
        <SafeAreaView style={styles.container}>
            <FloatingButton navigation={navigation} />
            <CategoriesList navigation={navigation} categories={categories} />
        </SafeAreaView>
    )
}
