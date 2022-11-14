import { FlatList, Pressable, Text } from 'react-native'
import { CATEGORY_KEY_PREFIX } from '../../../Shared/constants'
import { CategoryWithNotesType } from '../../../types/types'

interface Props {
    setSelectedCategory: React.Dispatch<
        React.SetStateAction<CategoryWithNotesType>
    >
    categoryInput: CategoryWithNotesType | null
    categoryId: string
    data: CategoryWithNotesType[]
}

const CategorySelect = ({
    setSelectedCategory,
    categoryInput,
    categoryId: categoryOfItem,
    data,
}: Props) => {
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
                key={item.categoryId}
                onPress={() => setSelectedCategory(item)}
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
