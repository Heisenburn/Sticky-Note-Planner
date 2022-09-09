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

    // run refresh list items each team view is visible
    useEffect(() => {
        if (isFocused) {
            getElementsForKey(ALL_CATEGORIES_KEY).then((response) => {
                if (response) {
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
