import CategoryItem from '../CategoryItem/CategoryItem'
import { FlatList } from 'react-native'
import type {
    CategoryNotesItemsType,
    CategoryWithNotesType,
} from '../../../../types/types'

interface Props {
    navigation: any
    categories: CategoryWithNotesType[]
}

const CategoriesList = ({ navigation, categories }: Props) => {
    const renderCategoryItem = ({ item }) => {
        return <CategoryItem item={item} navigation={navigation} />
    }

    return (
        <FlatList
            style={{ display: 'flex' }}
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item: CategoryWithNotesType) => item.categoryId}
        />
    )
}

export default CategoriesList
