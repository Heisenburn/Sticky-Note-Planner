import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const getData = async (category) => {
    try {
        const jsonValue = await AsyncStorage.getItem(category)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
        Alert.alert(`error: ${error}`)
    }
}
export default getData
