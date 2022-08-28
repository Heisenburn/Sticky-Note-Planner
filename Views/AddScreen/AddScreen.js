import {
    Text,
    SafeAreaView,
    TextInput,
    View,
    Alert,
    Button,
} from 'react-native'
import React, { useState } from 'react'
import styles from './AddScreen.styles'
import setData from '../../LocalStorage/setData'
import AutocompleteCategory from './AutocompleteCategory/AutocompleteCategory'

const AddScreenBase = ({ navigation }) => {
    const [noteInput, setNoteInput] = useState('')
    const [categoryInput, setCategoryInput] = useState(null)

    const handleSubmit = async () => {
        const isNoteEmpty = !noteInput.trim().length

        if (isNoteEmpty) {
            Alert.alert('Notatka', 'Treść notatki nie może być pusta')
            return
        }

        await setData(noteInput, categoryInput)

        navigation.navigate('HomeScreen')
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

                <AutocompleteCategory
                    categoryInput={categoryInput}
                    setCategoryInput={setCategoryInput}
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
                        onPress={() => navigation.navigate('HomeScreen')}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddScreenBase
