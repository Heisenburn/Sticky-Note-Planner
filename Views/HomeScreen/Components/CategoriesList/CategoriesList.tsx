import CategoryItem from '../CategoryItem/CategoryItem'
import { FlatList } from 'react-native'
import type { CategoryWithNotesType } from '../../../../types/types'

interface Props {
    navigation: any
    categories: CategoryWithNotesType[]
}

const CategoriesList = ({ navigation, categories }: Props) => {
    return (
        <FlatList
            data={categories}
            renderItem={({ item }: { item: CategoryWithNotesType }) => {
                return (
                    <CategoryItem
                        item={item}
                        keyExtractor={(item) => item.id}
                        navigation={navigation}
                    />
                )
            }}
            keyExtractor={(item, index) => item?.categoryId}
        />
    )
}

export default CategoriesList
