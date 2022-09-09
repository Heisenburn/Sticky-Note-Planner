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
import { ACTIONS_NAME } from '../../shared/FloatingButton/FloatingButton'

const AddScreenBase = ({ route, navigation }) => {
    const {
        clickedCategory = null,
        editedItem = null,
        listItems = null,
        action = null,
    } = route.params

    const [noteInput, setNoteInput] = useState<string>(editedItem?.text || '')
    const [categoryInput, setCategoryInput] = useState(clickedCategory || '')

    const PHRASES = {
        AddingCategory: 'Dodawanie kategorii',
        AddingNote: 'Dodawanie notatki',
        EditingNote: 'Edytowanie notatki',
    }

    const getHeading = () => {
        //TODO: tu moglby byc switch zwracajacy odpowiedni heading

        switch (action) {
            case ACTIONS_NAME.EDIT:
                return PHRASES.EditingNote
            case ACTIONS_NAME.CATEGORY:
                return PHRASES.AddingCategory
            case ACTIONS_NAME.NOTE:
                return `${PHRASES.AddingNote} ${
                    clickedCategory ? 'w kategorii: ' + clickedCategory : ''
                }`
        }
    }

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

    const shouldDisplayCategoryInput =
        (!clickedCategory || editedItem) && action !== ACTIONS_NAME.CATEGORY

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={editedItem ? styles.editMode : styles.heading}>
                    {getHeading()}
                </Text>
                <TextInput
                    multiline={true}
                    placeholder="Treść notatki..."
                    onChangeText={(value) => setNoteInput(value)}
                    style={styles.noteInput}
                    value={noteInput}
                />

                {shouldDisplayCategoryInput ? (
                    <Text style={styles.heading}>Kategoria</Text>
                ) : null}

                {action == ACTIONS_NAME.EDIT ? (
                    <Text style={styles.categoryInfo}>
                        Wybierz inną kategorię aby przenieść notatke
                    </Text>
                ) : null}

                {shouldDisplayCategoryInput ? (
                    <AutocompleteCategory
                        categoryInput={categoryInput}
                        setCategoryInput={setCategoryInput}
                        clickedCategory={clickedCategory}
                    />
                ) : null}

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
