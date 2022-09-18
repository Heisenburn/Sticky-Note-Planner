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
import { CategoriesWithNotesContext } from '../../Context/CategoriesWithNotesContext'
import { ACTION_PHRASES, ACTIONS } from '../../Shared/constants'
import { updateDataAndGoToScreen } from './helpers/updateDataAndGoToScreen'
import CategorySelect from './CategorySelect/CategorySelect'

const getHeading = (action, categoryTitle) => {
    switch (action) {
        case ACTIONS.EDIT_NOTE:
            return ACTION_PHRASES[ACTIONS.EDIT_NOTE]
        case ACTIONS.ADD_CATEGORY:
            return ACTION_PHRASES[ACTIONS.ADD_CATEGORY]
        case ACTIONS.ADD_NOTE:
            return `${ACTION_PHRASES[ACTIONS.ADD_NOTE]} ${
                categoryTitle ? 'w kategorii: ' + categoryTitle : ''
            }`
    }
}

const AddScreen = ({ route, navigation }) => {
    const { passedPropsFromPreviousScreen } = route.params
    const {
        category,
        editedItem = null,
        action = null,
        triggeredFromHomeScreen = false,
    } = passedPropsFromPreviousScreen

    const [textFieldInput, setTextFieldInput] = useState<string>(
        editedItem?.text || ''
    )
    const [categoryInput, setCategoryInput] = useState(
        category?.categoryTitle || ''
    )

    const { getData, updateData } = useContext(CategoriesWithNotesContext)
    const data = getData()

    const shouldDisplayCategorySelect =
        action == ACTIONS.EDIT_NOTE ||
        (triggeredFromHomeScreen && action === ACTIONS.ADD_NOTE)

    const handleSubmit = async () => {
        const isNoteEmpty = !textFieldInput.trim().length
        if (isNoteEmpty) {
            Alert.alert('Notatka', 'Treść notatki nie może być pusta')
            return
        }
        await updateDataAndGoToScreen({
            action,
            updateData,
            navigation,
            textFieldInput,
            categoryInput,
            categoryId: category?.categoryId,
            data,
            editedItem,
            shouldDisplayCategorySelect,
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={editedItem ? styles.editMode : styles.heading}>
                    {getHeading(action, category?.categoryTitle)}
                </Text>
                <TextInput
                    multiline={true}
                    placeholder="Treść notatki..."
                    onChangeText={(value) => setTextFieldInput(value)}
                    style={styles.noteInput}
                    value={textFieldInput}
                />

                {shouldDisplayCategorySelect ? (
                    <Text style={styles.heading}>Kategoria</Text>
                ) : null}

                {action == ACTIONS.EDIT_NOTE ? (
                    <Text style={styles.categoryInfo}>
                        Wybierz inną kategorię aby przenieść notatke
                    </Text>
                ) : null}

                {shouldDisplayCategorySelect ? (
                    <>
                        {action === ACTIONS.ADD_NOTE ? (
                            <Text>
                                Jeśli nie wybierzesz kategorii - notatka będzie
                                przypisana do kategorii RANDOM
                            </Text>
                        ) : null}

                        <CategorySelect
                            setCategoryInput={setCategoryInput}
                            categoryInput={categoryInput}
                        />
                    </>
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

export default AddScreen
