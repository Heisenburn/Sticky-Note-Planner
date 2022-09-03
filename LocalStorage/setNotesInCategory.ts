import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const setNotesInCategory = async (category, array) => {
    try {
        await AsyncStorage.setItem(category, JSON.stringify(array))
    } catch (error) {
        Alert.alert(`error: ${error}`)
    }
}

export default setNotesInCategory
