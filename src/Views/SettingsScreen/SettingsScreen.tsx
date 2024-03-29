import { Alert, Button, Pressable, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import styles from '../AddScreen/AddScreen.styles'
import { CategoriesWithNotesContext } from '../../Context/CategoriesWithNotesContext'
import { SettingsScreenProps } from '../../types/types'

const SettingsScreen = ({ route, navigation }: SettingsScreenProps) => {
    const { passedPropsFromPreviousScreen } = route.params
    const { category } = passedPropsFromPreviousScreen
    const { categoryId, categoryTitle } = category

    const [categoryNameInput, setCategoryNameInput] = useState(categoryTitle)

    const { getData, updateData } = useContext(CategoriesWithNotesContext)
    const data = getData()

    const showConfirmDialog = () => {
        return Alert.alert(
            'Usunięcie kategorii',
            `Czy chcesz usunać tą kategorie?`,
            [
                // The "Yes" button
                {
                    text: 'Tak',
                    onPress: () => handleRemove(),
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: 'Nie',
                },
            ]
        )
    }

    const handleSubmit = () => {
        const dataWithChangedCategoryName = data.map((categoryItem) => {
            if (categoryItem.categoryId === categoryId) {
                return {
                    ...categoryItem,
                    details: {
                        ...categoryItem.details,
                        categoryTitle: categoryNameInput,
                    },
                }
            }
            return categoryItem
        })
        updateData(dataWithChangedCategoryName)
        navigation.navigate('HomeScreen')
    }
    const handleRemove = () => {
        const dataWithoutCategory = data.filter(
            (item) => item.categoryId !== categoryId
        )
        updateData(dataWithoutCategory)
        navigation.navigate('HomeScreen')
    }
    return (
        <View
            style={{
                marginTop: 10,
            }}
        >
            <Text
                style={{
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                }}
            >
                Edytuj nazwę kategorii
            </Text>
            <TextInput
                onChangeText={(value) => setCategoryNameInput(value)}
                value={categoryNameInput}
                style={{
                    fontSize: 20,
                    borderWidth: 0.7,
                    borderRadius: 5,
                    padding: 10,
                    margin: 10,
                }}
            />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        height: '50%',
                    }}
                >
                    <View style={styles.buttonCommonStyles}>
                        <Button
                            title="Zapisz"
                            onPress={() => handleSubmit()}
                            color={'#1457EB'}
                        />
                    </View>
                </View>
                <View
                    style={{
                        height: '50%',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            marginLeft: 20,
                        }}
                    >
                        Danger zone:
                    </Text>
                    <Pressable
                        onPress={() => showConfirmDialog()}
                        style={{
                            backgroundColor: 'red',
                            borderRadius: 20,
                            padding: 20,
                            margin: 20,
                        }}
                    >
                        <Text>Usuń</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
export default SettingsScreen
