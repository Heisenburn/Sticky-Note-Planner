import { FlatList, Pressable, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { getAllKeys } from '../../../AsyncStorage/getDataAfterAddingNoteOrCategory'
import { CATEGORY_KEY_PREFIX } from '../../../Shared/constants'

const AutocompleteCategory = ({ setCategoryInput, categoryInput }) => {
    const [categories, setCategories] = useState([])

    useEffect(async () => {
        const availableKeys = await getAllKeys()
        const keysWithCategoryKeyword = availableKeys.filter((item) => {
            if (item !== categoryInput && item.includes(CATEGORY_KEY_PREFIX)) {
                return item
            }
        })
        setCategories(keysWithCategoryKeyword)
    }, [])

    const renderCategoryButton = (item) => {
        return (
            <Pressable
                key={item}
                onPress={() => setCategoryInput(item)}
                style={{
                    backgroundColor: item === categoryInput ? 'black' : 'blue',
                    borderRadius: 20,
                    padding: 20,
                    margin: 10,
                }}
            >
                <Text
                    style={{
                        color: 'white',
                    }}
                >
                    {item}
                </Text>
            </Pressable>
        )
    }

    return (
        <FlatList
            style={{
                maxHeight: 100,
            }}
            data={categories}
            renderItem={({ item }) => renderCategoryButton(item)}
            keyExtractor={(item) => item}
        />
    )
}

export default AutocompleteCategory
