import { SafeAreaView } from 'react-native'
import CategoriesList from './Categories/CategoriesList'
import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
import styles from './HomeScreen.styles'
import { useIsFocused } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CATEGORY_KEY_PREFIX } from '../../Shared/constants'
import { getAllKeys } from '../../AsyncStorage/saveNoteOrCategory'
import { CategoriesWithNotesContext } from '../../Context/CategoriesWithNotesContext'

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
    const { getData } = useContext(CategoriesWithNotesContext)
    const data = getData()
    // const [categories, setCategories] = useState(getData())

    // run refresh list items each team view is visible
    // useEffect(() => {
    //     if (isFocused && data) {
    //         setCategories(getData())
    //     }
    // }, [isFocused, data])

    return (
        <SafeAreaView style={styles.container}>
            <FloatingButton navigation={navigation} />
            <CategoriesList navigation={navigation} categories={data} />
        </SafeAreaView>
    )
}
