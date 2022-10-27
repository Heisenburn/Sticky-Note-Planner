import { FlatList, Pressable, Text } from 'react-native'
import { CATEGORY_KEY_PREFIX } from '../../../Shared/constants'
import { CategoryWithNotesType } from '../../../types/types'

const CategorySelect = ({
    setCategoryInput,
    categoryInput,
    categoryId: categoryOfItem,
    data,
}: {
    data: CategoryWithNotesType[]
}) => {
    const keysWithCategoryKeyword = data.filter((categoryItem) => {
        if (
            categoryItem.categoryId !== categoryOfItem &&
            categoryItem.categoryId.includes(CATEGORY_KEY_PREFIX)
        ) {
            return categoryItem
        }
    })

    const renderCategoryButton = (item: CategoryWithNotesType) => {
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
                    {item.categoryId}
                </Text>
            </Pressable>
        )
    }

    return (
        <FlatList
            style={{
                maxHeight: 200,
            }}
            data={keysWithCategoryKeyword}
            renderItem={({ item }) => renderCategoryButton(item)}
            keyExtractor={(item) => item.categoryId}
        />
    )
}

export default CategorySelect
