import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export const getAllCategories = async () => {
    try {
        return await AsyncStorage.getAllKeys()
    } catch (error) {
        Alert.alert(`error: ${error}`)
        throw error
    }
}
