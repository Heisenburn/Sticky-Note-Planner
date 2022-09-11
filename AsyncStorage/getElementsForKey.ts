import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const getElementsForKey = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : []
    } catch (error) {
        Alert.alert(`error: ${error}`)
        throw error
    }
}
export default getElementsForKey
