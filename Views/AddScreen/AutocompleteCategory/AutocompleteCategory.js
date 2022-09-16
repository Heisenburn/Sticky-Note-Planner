import Autocomplete from 'react-native-autocomplete-input'
import { Button, Pressable, Text, TouchableOpacity } from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import { getAllKeys } from '../../../AsyncStorage/getDataAfterAddingNoteOrCategory'
import { CATEGORY_KEY_PREFIX } from '../../../Shared/constants'

const AutocompleteCategory = ({
    categoryInput,
    setCategoryInput,
    clickedCategory,
}) => {
    const [categories, setCategories] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([])

    useMemo(async () => {
        const availableKeys = await getAllKeys()
        const keysWithCategoryKeyword = availableKeys.filter((item) =>
            item.includes(CATEGORY_KEY_PREFIX)
        )
        setCategories(keysWithCategoryKeyword)
    }, [])

    // const findCategory = (input) => {
    //     setFilteredCategories(
    //         input.length ? categories.filter((item) => item) : data
    //     )
    // }

    // return (
    //     <Autocomplete
    //         autoCapitalize="none"
    //         data={filteredCategories}
    //         //TODO: Refactor ponizszego
    //         defaultValue={
    //             JSON.stringify(categoryInput) === '{}'
    //                 ? ''
    //                 : categoryInput || clickedCategory
    //         }
    //         autoCorrect={false}
    //         onChangeText={(input) => findCategory(input)}
    //         placeholder="Default category: RANDOM"
    //         flatListProps={{
    //             keyboardShouldPersistTaps: 'always',
    //             keyExtractor: (_, idx) => idx,
    //             renderItem: ({ item: { title } }) => (
    //                 <TouchableOpacity
    //                     onPress={() => {
    //                         setCategoryInput(title)
    //                         setFilteredCategories([])
    //                     }}
    //                 >
    //                     <Text>{title}</Text>
    //                 </TouchableOpacity>
    //             ),
    //         }}
    //     />
    // )

    return categories.map((item) => {
        return (
            <Pressable
                onPress={(item) => setCategoryInput(item)}
                style={({ pressed }) => [
                    { backgroundColor: pressed ? 'black' : 'white' },
                ]}
            >
                {({ pressed }) => (
                    <Text style={[{ color: pressed ? 'white' : 'black' }]}>
                        {item}
                    </Text>
                )}
            </Pressable>
        )
    })
}

export default AutocompleteCategory
