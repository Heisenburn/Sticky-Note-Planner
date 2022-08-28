import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const setNotesInCategory = async (category, arrayWithoutRemovedItem) => {
    try {
        await AsyncStorage.setItem(
            category,
            JSON.stringify(arrayWithoutRemovedItem)
        )
    } catch (error) {
        Alert.alert(`error: ${error}`)
    }
}

export default setNotesInCategory
