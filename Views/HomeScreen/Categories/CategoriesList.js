import CategoryItem from '../ListItem/CategoryItem'
import { FlatList } from 'react-native'


const CategoriesList = ({ navigation, categories }) => {
    return (
        <FlatList
            data={categories}
            renderItem={({ item }) => {
                return(
                    <CategoryItem
                        item={item}
                        keyExtractor={(item) => item.id}
                        navigation={navigation}
                    />
                )
            }}
            keyExtractor={(item, index) => item?.categoryId || index}
        />
    )
}

export default CategoriesList
