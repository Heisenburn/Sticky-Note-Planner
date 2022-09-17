import {
    Text,
    SafeAreaView,
    TextInput,
    View,
    Alert,
    Button,
} from 'react-native'
import React, { useContext, useState } from 'react'
import styles from './AddScreen.styles'
import AutocompleteCategory from './AutocompleteCategory/AutocompleteCategory'
import setAsyncStorageValue from '../../AsyncStorage/setAsyncStorageValue'
import { CategoriesWithNotesContext } from '../../Context/CategoriesWithNotesContext'
import { ACTION_PHRASES, ACTIONS_NAME } from '../../Shared/constants'
import { getDataAfterAddingNoteOrCategory } from '../../AsyncStorage/getDataAfterAddingNoteOrCategory'

const AddScreenBase = ({ route, navigation }) => {
    const {
        clickedCategory = null,
        editedItem = null,
        listItems = null,
        action = null,
    } = route.params

    const [textFieldInput, setTextFieldInput] = useState<string>(
        editedItem?.text || ''
    )
    const [categoryInput, setCategoryInput] = useState(clickedCategory || '')
    const isAddingCategoryMode = action === ACTIONS_NAME.CATEGORY
    const { getData, updateData } = useContext(CategoriesWithNotesContext)
    const data = getData()

    const getHeading = () => {
        //TODO: tu moglby byc switch zwracajacy odpowiedni heading

        switch (action) {
            case ACTIONS_NAME.EDIT:
                return ACTION_PHRASES.EditingNote
            case ACTIONS_NAME.CATEGORY:
                return ACTION_PHRASES.AddingCategory
            case ACTIONS_NAME.NOTE:
                return `${ACTION_PHRASES.AddingNote} ${
                    clickedCategory ? 'w kategorii: ' + clickedCategory : ''
                }`
        }
    }

    const handleSubmit = async () => {
        const isNoteEmpty = !textFieldInput.trim().length

        if (isNoteEmpty) {
            Alert.alert('Notatka', 'Treść notatki nie może być pusta')
            return
        }
        const shouldSaveEditItem = editedItem && listItems
        const shouldUpdateCategory = categoryInput !== clickedCategory

        if (isAddingCategoryMode) {
            const filteredArray = await getDataAfterAddingNoteOrCategory({
                noteValue: null,
                categoryId: textFieldInput,
                existingData: data,
            })
            updateData(filteredArray)
            // return navigation.navigate('ListViewScreen', {
            //     categoryTitle: textFieldInput,
            //     categoryId: filteredArray.pop().categoryId,
            // })
            return navigation.navigate('HomeScreen')
        }

        if (shouldSaveEditItem) {
            if (shouldUpdateCategory) {
                const originListWithRemovedElement = listItems.filter(
                    (item) => item.id !== editedItem.id
                )

                //1. remove element from origin list
                await setAsyncStorageValue(
                    clickedCategory,
                    originListWithRemovedElement
                )

                //2. add element to target list
                response = await getDataAfterAddingNoteOrCategory({
                    noteValue: editedItem.text,
                    categoryValue: categoryInput,
                })
            } else {
                //only note value was edited
                const originListWithEditedItem = listItems.map((item) => {
                    if (item.id === editedItem.id) {
                        return { ...item, text: textFieldInput }
                    } else {
                        return item
                    }
                })

                // const filteredArray = await getDataAfterAddingNoteOrCategory({
                //     noteValue: textFieldInput,
                //     categoryId: clickedCategory,
                //     existingData: data,
                // })
                // updateData(filteredArray.final)

                navigation.navigate('ListViewScreen', {
                    itemId: categoryInput,
                })
            }
        } else {
            //Scenario: User enter AddScreen without EDIT option
            const filteredArray = await getDataAfterAddingNoteOrCategory({
                noteValue: textFieldInput,
                categoryId: clickedCategory,
                existingData: data,
            })
            updateData(filteredArray)
        }

        return navigation.navigate('ListViewScreen', {
            itemId: categoryInput || 'RANDOM',
        })
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
                    onChangeText={(value) => setTextFieldInput(value)}
                    style={styles.noteInput}
                    value={textFieldInput}
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
