import { SafeAreaView } from 'react-native'
import CategoriesList from './Categories/CategoriesList'
import FloatingButton from '../../shared/FloatingButton/FloatingButton'
import styles from './HomeScreen.styles'
import { useIsFocused } from '@react-navigation/native'
import getElementsForKey from '../../LocalStorage/getElementsForKey'
import { useEffect, useState } from 'react'
import { ALL_CATEGORIES_KEY } from '../../LocalStorage/setCategory'
import AsyncStorage from '@react-native-async-storage/async-storage'

// const clearAll = async () => {
//     try {
//         await AsyncStorage.clear()
//     } catch (e) {
//         // clear error
//     }
//
//     console.log('Done.')
// }
//
// await clearAll()

export default function HomeScreenBase({ navigation }) {
    const isFocused = useIsFocused()
    const [categories, setCategories] = useState([])

    //TODO: trzymanie PREDEFINED_CATEGORIES w AsyncStorage?

    const getMultiple = async (array) => {
        let values
        try {
            values = await AsyncStorage.multiGet(array)
            values = values.map((item) => {
                return {
                    title: item[0],
                    items: JSON.parse(item[1]),
                }
            })

            return values
        } catch (e) {
            throw e
        }
    }

    // run refresh list items each team view is visible
    useEffect(() => {
        if (isFocused) {
            //get all categories
            getElementsForKey(ALL_CATEGORIES_KEY).then(
                async (availableCategories) => {
                    if (availableCategories) {
                        //todo: powinnismy uzywac ID a nie title, bo mogą być dwie takie same kategorie typie xD

                        //get items for each category
                        const categoriesWithItems = await getMultiple(
                            availableCategories
                        )

                        setCategories(categoriesWithItems)
                    }
                }
            )
        }
    }, [isFocused])

    console.log({ categories })
    return (
        <SafeAreaView style={styles.container}>
            <FloatingButton navigation={navigation} />
            <CategoriesList navigation={navigation} categories={categories} />
        </SafeAreaView>
    )
}
