import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const removeFromLocalCategory = async (category, arrayWithoutRemovedItem) => {
    try {
        await AsyncStorage.setItem(
            category,
            JSON.stringify(arrayWithoutRemovedItem)
        )

        Alert.alert('Notatka', 'Usunięto! ✅')
    } catch (error) {
        Alert.alert(`error: ${error}`)
    }
}

export default removeFromLocalCategory
