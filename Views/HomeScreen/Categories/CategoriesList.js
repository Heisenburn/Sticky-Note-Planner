import ListItem from '../ListItem/ListItem'
import { FlatList, View, Text } from 'react-native'
import styles from '../HomeScreen.styles'
import { PREDEFINED_CATEGORIES } from '../../../shared/constants'

const SEPARATOR_INDEX = '2'

const renderItem = (item, navigation) => {
    return (
        <ListItem
            item={item}
            keyExtractor={(item) => item.id}
            navigation={navigation}
        />
    )
}

const separator = (e) => {
    return e.leadingItem.id === SEPARATOR_INDEX ? (
        <View style={styles.separator}>
            <Text style={{ color: 'white' }}>Kategorie użytkownika</Text>
        </View>
    ) : null
}

const CategoriesList = ({ navigation, categories: USER_CATEGORIES }) => {
    console.log({ USER_CATEGORIES })
    return (
        <FlatList
            data={[...PREDEFINED_CATEGORIES, ...USER_CATEGORIES]}
            renderItem={({ item }) => renderItem(item, navigation)}
            ItemSeparatorComponent={(e) => separator(e)}
            keyExtractor={(item) => item.id}
        />
    )
}

export default CategoriesList
