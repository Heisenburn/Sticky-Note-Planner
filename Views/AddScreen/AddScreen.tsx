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
        clickedCategory = null,
        editedItem = null,
        listItems = null,
    } = route.params

    const [noteInput, setNoteInput] = useState<string>(editedItem?.text || '')
    const [categoryInput, setCategoryInput] = useState(clickedCategory || '')

    const handleSubmit = async () => {
        const isNoteEmpty = !noteInput.trim().length
        let response = null

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
                response = await saveNoteToCategory(
                    editedItem.text,
                    categoryInput
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

                response = await setNotesInCategory(
                    categoryInput,
                    originListWithEditedItem
                )
                navigation.navigate('ListViewScreen', {
                    itemId: categoryInput,
                })
            }
        } else {
            console.log('zwykly add ')
            //Scenario: User enter AddScreen without EDIT option
            response = await saveNoteToCategory(
                noteInput,
                categoryInput || clickedCategory
            )
        }

        if (response) {
            navigation.navigate('ListViewScreen', {
                itemId: categoryInput || 'RANDOM',
            })
        }
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
