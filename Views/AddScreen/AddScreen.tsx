import {
    Text,
    SafeAreaView,
    TextInput,
    View,
    Alert,
    Button,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './AddScreen.styles'
import saveNoteToCategory from '../../LocalStorage/saveNoteToCategory'
import AutocompleteCategory from './AutocompleteCategory/AutocompleteCategory'
import setNotesInCategory from '../../LocalStorage/setNotesInCategory'
import getNotesForCategory from '../../LocalStorage/getNotesForCategory'
import { CommonActions } from '@react-navigation/native'

const AddScreenBase = ({ route, navigation }) => {
    const {
        clickedCategory,
        editedItem = null,
        listItems = null,
    } = route.params

    const [noteInput, setNoteInput] = useState<string>(editedItem?.text || '')
    const [categoryInput, setCategoryInput] = useState(null)

    const handleSubmit = async () => {
        const isNoteEmpty = !noteInput.trim().length

        if (isNoteEmpty) {
            Alert.alert('Notatka', 'Treść notatki nie może być pusta')
            return
        }
        const shouldSaveEditItem = editedItem && listItems
        const shouldUpdateCategory = categoryInput !== clickedCategory

        if (shouldSaveEditItem) {
            if (shouldUpdateCategory) {
                const originListWithRemovedElement = listItems.filter(
                    (item) => item.id !== editedItem.id
                )

                //1. remove element from origin list
                await setNotesInCategory(
                    clickedCategory,
                    originListWithRemovedElement
                )

                //2. add element to target list
                await getNotesForCategory(categoryInput).then(
                    async (response) => {
                        if (response) {
                            await setNotesInCategory(categoryInput, [
                                ...response,
                                editedItem,
                            ])
                        }
                    }
                )
            } else {
                //only note value was edited
                const originListWithEditedItem = listItems.map((item) => {
                    if (item.id === editedItem.id) {
                        return { ...item, text: noteInput }
                    } else {
                        return item
                    }
                })

                await setNotesInCategory(
                    categoryInput,
                    originListWithEditedItem
                )
            }
        } else {
            //Scenario: User enter AddScreen without EDIT option
            await saveNoteToCategory(
                noteInput,
                categoryInput || clickedCategory
            )
        }

        // navigation.navigate('ListViewScreen', {
        //     itemId: categoryInput,
        // })
        // navigation.goBack()

        navigation.navigate({
            name: 'ListViewScreen',
            params: { itemId: categoryInput, shouldRefetch: true },
            merge: true,
        })

        // navigation.navigate('HomeScreen')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={editedItem ? styles.editMode : styles.heading}>
                    {editedItem ? 'Tryb edycji notatki' : 'Dodaj notatke'}
                </Text>
                <TextInput
                    multiline={true}
                    placeholder="Treść notatki..."
                    onChangeText={(value) => setNoteInput(value)}
                    style={styles.noteInput}
                    value={noteInput}
                />

                <Text style={styles.heading}>Kategoria</Text>

                {editedItem ? (
                    <Text style={styles.categoryInfo}>
                        Wybierz inną kategorię aby przenieść notatke
                    </Text>
                ) : null}

                <AutocompleteCategory
                    categoryInput={categoryInput}
                    setCategoryInput={setCategoryInput}
                    clickedCategory={clickedCategory}
                />
                <View style={styles.buttonCommonStyles}>
                    <Button
                        title="Zapisz"
                        onPress={() => handleSubmit()}
                        color={'orange'}
                    />
                </View>
                <View style={styles.buttonCommonStyles}>
                    <Button
                        title="Powrót"
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddScreenBase
