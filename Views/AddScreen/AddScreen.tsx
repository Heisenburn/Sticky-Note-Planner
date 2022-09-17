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
import { ACTION_PHRASES, ACTIONS } from '../../Shared/constants'
import { getDataAfterAddingNoteOrCategory } from '../../AsyncStorage/getDataAfterAddingNoteOrCategory'
import { updateDataAndGoToScreen } from './helpers/updateDataAndGoToScreen'

const getHeading = (action, clickedCategory) => {
    switch (action) {
        case ACTIONS.EDIT_NOTE:
            return ACTION_PHRASES[ACTIONS.EDIT_NOTE]
        case ACTIONS.ADD_CATEGORY:
            return ACTION_PHRASES[ACTIONS.ADD_CATEGORY]
        case ACTIONS.ADD_NOTE:
            return `${ACTION_PHRASES[ACTIONS.ADD_NOTE]} ${
                clickedCategory ? 'w kategorii: ' + clickedCategory : ''
            }`
    }
}

const AddScreenBase = ({ route, navigation }) => {
    const { passedPropsFromPreviousScreen } = route.params
    const {
        clickedCategory = null,
        editedItem = null,
        listItems = null,
        action = null,
    } = passedPropsFromPreviousScreen

    const [textFieldInput, setTextFieldInput] = useState<string>(
        editedItem?.text || ''
    )
    const [categoryInput, setCategoryInput] = useState(clickedCategory || '')

    const { getData, updateData } = useContext(CategoriesWithNotesContext)
    const data = getData()

    const handleSubmit = async () => {
        const isNoteEmpty = !textFieldInput.trim().length
        if (isNoteEmpty) {
            Alert.alert('Notatka', 'Treść notatki nie może być pusta')
            return
        }
        await updateDataAndGoToScreen(
            action,
            updateData,
            navigation,
            textFieldInput,
            categoryInput,
            clickedCategory,
            data,
            listItems,
            editedItem
        )
    }

    const shouldDisplayCategoryInput =
        (!clickedCategory || editedItem) && action !== ACTIONS.ADD_CATEGORY

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={editedItem ? styles.editMode : styles.heading}>
                    {getHeading(action, clickedCategory)}
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

                {action == ACTIONS.EDIT_NOTE ? (
                    <Text style={styles.categoryInfo}>
                        Wybierz inną kategorię aby przenieść notatke
                    </Text>
                ) : null}

                {shouldDisplayCategoryInput ? (
                    <AutocompleteCategory
                        setCategoryInput={setCategoryInput}
                        categoryInput={categoryInput}
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
