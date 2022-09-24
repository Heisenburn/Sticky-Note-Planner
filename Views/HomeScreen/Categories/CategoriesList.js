import CategoryItem from '../ListItem/CategoryItem'
import { FlatList, View, Text } from 'react-native'
import styles from '../HomeScreen.styles'
import { PREDEFINED_CATEGORIES } from '../../../Shared/constants'

const SEPARATOR_INDEX = '2'

const renderItem = (item, navigation) => {
    return (
        <CategoryItem
            item={item}
            keyExtractor={(item) => item.id}
            navigation={navigation}
        />
    )
}

const separator = (e) => {
    if (e.leadingItem.id === 0) {
        return (
            <View style={styles.separator}>
                <Text style={{ color: 'black' }}>Kategorie predefiniowane</Text>
            </View>
        )
    } else if (e.leadingItem.id === SEPARATOR_INDEX) {
        return (
            <View style={styles.separator}>
                <Text style={{ color: 'black' }}>Kategorie użytkownika</Text>
            </View>
        )
    } else {
        return null
    }
}

const CategoriesList = ({ navigation, categories }) => {
    return (
        <FlatList
            data={categories}
            renderItem={({ item }) => renderItem(item, navigation)}
            ItemSeparatorComponent={(e) => separator(e)}
            keyExtractor={(item, index) => item?.categoryId || index}
        />
    )
}

export default CategoriesList
