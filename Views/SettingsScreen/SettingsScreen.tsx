import { Alert, Button, Pressable, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import styles from '../AddScreen/AddScreen.styles'
import { CategoriesWithNotesContext } from '../../Context/CategoriesWithNotesContext'
import { PREDEFINED_CATEGORIES_KEY_SUFFIX } from '../../Shared/constants'

const SettingsScreen = ({ route, navigation }) => {
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
                    onPress: () => {
                        if (
                            categoryId.includes(
                                PREDEFINED_CATEGORIES_KEY_SUFFIX
                            )
                        ) {
                            Alert.alert(
                                'Predefined categories are not possible to be removed'
                            )
                        } else {
                            handleRemove()
                        }
                    },
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
        const dataWithChangedCategoryName = data.map((CategoryItem) => {
            if (CategoryItem.categoryId === categoryId) {
                return {
                    ...CategoryItem,
                    details: {
                        categoryTitle: categoryNameInput,
                    },
                }
            }
            return categoryId
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
            {/*TODO: to wynieść do osobnego komponentu*/}
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    testID={'basicButtons'}
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
                    testID={'dangerZone'}
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
