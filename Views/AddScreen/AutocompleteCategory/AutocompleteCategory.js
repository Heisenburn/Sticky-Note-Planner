import {
    PREDEFINED_CATEGORIES,
    USER_CATEGORIES,
} from '../../../shared/constants'
import Autocomplete from 'react-native-autocomplete-input'
import { Text, TouchableOpacity } from 'react-native'
import { useState } from 'react'

const AutocompleteCategory = ({
    categoryInput,
    setCategoryInput,
    clickedCategory,
}) => {
    const [filteredCategories, setFilteredCategories] = useState([])

    const findCategory = (input) => {
        const data = [...PREDEFINED_CATEGORIES, ...USER_CATEGORIES]

        setFilteredCategories(
            input.length
                ? data.filter(({ title }) =>
                      title
                          .toLowerCase()
                          .normalize('NFD')
                          .replace(/[\u0300-\u036f]/g, '')
                          .includes(input)
                  )
                : data
        )
    }

    return (
        <Autocomplete
            autoCapitalize="none"
            data={filteredCategories}
            defaultValue={
                JSON.stringify(categoryInput) === '{}'
                    ? ''
                    : categoryInput || clickedCategory
            }
            autoCorrect={false}
            onChangeText={(input) => findCategory(input)}
            placeholder="Kategoria..."
            flatListProps={{
                keyboardShouldPersistTaps: 'always',
                keyExtractor: (_, idx) => idx,
                renderItem: ({ item: { title } }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setCategoryInput(title)
                            setFilteredCategories([])
                        }}
                    >
                        <Text>{title}</Text>
                    </TouchableOpacity>
                ),
            }}
        />
    )
}

export default AutocompleteCategory
