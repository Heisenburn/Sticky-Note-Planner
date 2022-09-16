import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const setAsyncStorageValue = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        Alert.alert(`error: ${error}`)
        throw error
    }
}

export default setAsyncStorageValue
