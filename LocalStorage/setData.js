import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const setData = async (noteValue, categoryValue) => {
    try {
        const jsonValue = JSON.stringify(noteValue)
        const category = categoryValue || 'RANDOM'

        // const shouldMerge -> tutaj zapytanie Getem
        await AsyncStorage.setItem(`${category}`, jsonValue)
        Alert.alert('Notatka', 'Zapisano! ✅')
    } catch (error) {
        Alert.alert(`error: ${error}`)
    }
}

export default setData
