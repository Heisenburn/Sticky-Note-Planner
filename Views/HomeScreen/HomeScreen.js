import { SafeAreaView } from 'react-native'
import CategoriesList from './Categories/CategoriesList'
import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
import styles from './HomeScreen.styles'
import { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CategoriesWithNotesContext } from '../../Context/CategoriesWithNotesContext'
import { useIsFocused } from '@react-navigation/native'

const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // clear error
    }

    console.log('Done.')
}

export default function HomeScreen({ navigation }) {
    const { getData } = useContext(CategoriesWithNotesContext)
    const data = getData()

    return (
        <SafeAreaView style={styles.container}>
            <FloatingButton navigation={navigation} />
            <CategoriesList navigation={navigation} categories={data} />
        </SafeAreaView>
    )
}
