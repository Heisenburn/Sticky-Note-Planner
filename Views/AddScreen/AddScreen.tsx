import { Alert, Button, SafeAreaView, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import styles from './AddScreen.styles'
import { CategoriesWithNotesContext } from '../../Context/CategoriesWithNotesContext'
import { ACTIONS } from '../../Shared/constants'
import CategorySelect from './Components/CategorySelect'
import { getHeading, updateAsyncLocalStorageData } from './helpers/helpers'
import { ExpandableSection, Text } from 'react-native-ui-lib'
import { Entypo } from '@expo/vector-icons'

const AddScreen = ({ route, navigation }) => {
    const { passedPropsFromPreviousScreen } = route.params
    const {
        category,
        noteToBeEdited,
        action = null,
        triggeredFromHomeScreen = false,
    } = passedPropsFromPreviousScreen

    const [textFieldInput, setTextFieldInput] = useState(
        noteToBeEdited?.note || ''
    )
    const [selectedCategory, setSelectedCategory] = useState(null)

    const { getData, updateData } = useContext(CategoriesWithNotesContext)
    const data = getData()

    const shouldDisplayCategorySelect =
        action == ACTIONS.EDIT_NOTE ||
        (triggeredFromHomeScreen && action === ACTIONS.ADD_NOTE)

    const [isCategorySelectionVisible, setIsCategorySelectionVisible] =
        useState(false)

    const handleSubmit = async () => {
        const isNoteEmpty = !textFieldInput.trim().length

        if (isNoteEmpty) {
            Alert.alert('Notatka', 'Treść notatki nie może być pusta')
            return
        }
        await updateAsyncLocalStorageData({
            action,
            updateData,
            textFieldInput,
            categoryInput: selectedCategory,
            categoryId: category?.categoryId,
            data,
            noteToBeEdited,
            shouldDisplayCategorySelect,
        })

        navigation.navigate('HomeScreen')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text
                    style={
                        noteToBeEdited?.note?.length > 0
                            ? styles.editMode
                            : styles.heading
                    }
                >
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
                    <>
                        {action === ACTIONS.ADD_NOTE ? (
                            <Text>
                                Jeśli nie wybierzesz kategorii - notatka będzie
                                przypisana do kategorii RANDOM
                            </Text>
                        ) : null}
                        <ExpandableSection
                            top={true}
                            expanded={isCategorySelectionVisible}
                            sectionHeader={
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text blue10 text60>
                                        Kategoria
                                    </Text>
                                    <Entypo
                                        name="chevron-down"
                                        size={24}
                                        color="black"
                                    />
                                </View>
                            }
                            onPress={() =>
                                setIsCategorySelectionVisible(
                                    (prevState) => !prevState
                                )
                            }
                        />
                    </>
                ) : null}

                {isCategorySelectionVisible ? (
                    <>
                        {action === ACTIONS.EDIT_NOTE ? (
                            <Text style={styles.categoryInfo}>
                                Wybierz inną kategorię aby przenieść notatke
                            </Text>
                        ) : null}

                        <CategorySelect
                            setCategoryInput={setSelectedCategory}
                            categoryInput={selectedCategory}
                            categoryId={category?.categoryId}
                        />
                    </>
                ) : null}

                <View style={styles.buttonCommonStyles}>
                    <Button
                        title="Zapisz"
                        onPress={() => handleSubmit()}
                        color={'#1457EB'}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddScreen
