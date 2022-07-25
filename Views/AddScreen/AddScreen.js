import {
    Text,
    SafeAreaView,
    TextInput,
    View,
    Pressable,
    TouchableOpacity,
} from 'react-native'
import Toast from 'react-native-toast-message'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './AddScreen.styles'
import { PREDEFINED_CATEGORIES, USER_CATEGORIES } from '../../shared/constants'
//https://www.npmjs.com/package/react-native-autocomplete-input
import Autocomplete from 'react-native-autocomplete-input'

const storeData = async (value, category) => {
    try {
        await AsyncStorage.setItem('1', value)
    } catch (e) {
        // saving error
    }
}

//mozna tez obiekt zapisywac https://react-native-async-storage.github.io/async-storage/docs/usage

const AddScreen = ({ navigation }) => {
    const [noteInput, setNoteInput] = useState('')
    const [selectedValue, setSelectedValue] = useState({})
    const [filteredCategories, setFilteredCategories] = useState([])

    const handleSubmit = () => {
        Toast.show({
            type: 'success',
            text1: 'pomyślnie zapisano notatkę',
            text2: `o treści ${noteInput} 👋`,
        })
        // storeData(noteInput, categoryInput);
    }

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
                        JSON.stringify(selectedValue) === '{}'
                            ? ''
                            : selectedValue
                    }
                    autoCorrect={false}
                    onChangeText={(input) => findCategory(input)}
                    placeholder="Provide category..."
                    flatListProps={{
                        keyboardShouldPersistTaps: 'always',
                        keyExtractor: (_, idx) => idx,
                        renderItem: ({ item: { title } }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedValue(title)
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
                <Toast />
            </View>
        </SafeAreaView>
    )
}

export default AddScreen
