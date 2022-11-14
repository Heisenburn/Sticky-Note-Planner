import CategoryItem from '../CategoryItem/CategoryItem'
import { FlatList } from 'react-native'
import type {
    CategoryWithNotesType,
    StackParamList,
} from '../../../../types/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface Props {
    navigation: NativeStackNavigationProp<
        StackParamList,
        'HomeScreen',
        undefined
    >
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
