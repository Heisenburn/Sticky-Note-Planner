import {
    Text,
    SafeAreaView,
    TextInput,
    View,
    Pressable,
    TouchableOpacity,
    Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './AddScreen.styles'
import { PREDEFINED_CATEGORIES, USER_CATEGORIES } from '../../shared/constants'
//https://www.npmjs.com/package/react-native-autocomplete-input
import Autocomplete from 'react-native-autocomplete-input'
import setData from '../../LocalStorage/setData'

//struktura danych:

//Ogólny store:
//[
// { Kategoria: 'nazwa', [notatki...] }
// ]

//1. Kategoria

// Klucz: Kategoria
// Wartosc: [wszystkie obiekty tu]

//2. Notatka
//klucz: ID elemetu
//wartosc: obiekt : { kategoria: 'ksiazki', wartosc: 'hamlet' }

const AddScreen = ({ navigation }) => {
    const [noteInput, setNoteInput] = useState('')
    const [categoryInput, setCategoryInput] = useState(null)
    const [filteredCategories, setFilteredCategories] = useState([])

    const handleSubmit = async () => {
        const isNoteEmpty = !noteInput.trim().length

        if (isNoteEmpty) {
            Alert.alert('Notatka', 'treść notatki nie może być pusta')
            return
        }

        await setData(noteInput, categoryInput)

        navigation.navigate('HomeScreen')
    }

    //TODO: to przeniesc do miejsca trzymajacego autocomplete
    const findCategory = (input) => {
        const data = [...PREDEFINED_CATEGORIES, ...USER_CATEGORIES]

        setFilteredCategories(
            input.length
                ? data.filter(({ title }) =>
                      title
                          .toLowerCase()
                          .normalize('NFD')
                          .replace(/[\u0300-\u036f]/g, '')
                          .includes(input)
                  )
                : data
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.heading}>Dodawanie notatki</Text>
                <TextInput
                    multiline={true}
                    placeholder="Treść notatki..."
                    onChangeText={(value) => setNoteInput(value)}
                    style={styles.noteInput}
                />
                <Pressable
                    title="Submit"
                    onPress={handleSubmit}
                    style={[styles.buttonCommonStyles, styles.saveButton]}
                >
                    <Text>Zapisz</Text>
                </Pressable>
                <Autocomplete
                    autoCapitalize="none"
                    data={filteredCategories}
                    defaultValue={
                        JSON.stringify(categoryInput) === '{}'
                            ? ''
                            : categoryInput
                    }
                    autoCorrect={false}
                    onChangeText={(input) => findCategory(input)}
                    placeholder="Kategoria..."
                    flatListProps={{
                        keyboardShouldPersistTaps: 'always',
                        keyExtractor: (_, idx) => idx,
                        renderItem: ({ item: { title } }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setCategoryInput(title)
                                    setFilteredCategories([])
                                }}
                            >
                                <Text>{title}</Text>
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Pressable
                    title="back"
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={[styles.buttonCommonStyles, styles.backButton]}
                >
                    <Text>Powrót</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default AddScreen
