import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

//Ogolne klucze wartosci to kategoria i notatki do niej przypisane :
// { Kategoria: 'tydzien' : [notatki...] }
// { Kategoria: 'random' : [notatki...] }
// { ... }

// Notatka

// {
//     id: 1
//     text: 'lorem ipsum'
// }

const setLocalData = async (noteValue, categoryValue) => {
    try {
        const category = categoryValue || 'RANDOM'

        //append if there are existing notes for this category
        AsyncStorage.getItem(category).then((notesInCategory) => {
            const arrayOfNotes = notesInCategory
                ? JSON.parse(notesInCategory)
                : []

            arrayOfNotes.push({
                text: noteValue,
                id: arrayOfNotes.length > 0 ? arrayOfNotes.at(-1).id + 1 : 1,
            })

            AsyncStorage.setItem(category, JSON.stringify(arrayOfNotes))
        })

        Alert.alert('Notatka', 'Zapisano! ✅')
    } catch (error) {
        Alert.alert(`error: ${error}`)
    }
}

export default setLocalData
