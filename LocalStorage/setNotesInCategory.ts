import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const setNotesInCategory = async (category, array) => {
    try {
        return await AsyncStorage.setItem(category, JSON.stringify(array))
    } catch (error) {
        Alert.alert(`error: ${error}`)
        throw error
    }
}

export default setNotesInCategory
