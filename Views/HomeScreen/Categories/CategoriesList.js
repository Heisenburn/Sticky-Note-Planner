import ListItem from '../ListItem/ListItem'
import { FlatList, View, Text } from 'react-native'
import styles from '../HomeScreen.styles'
import {
    PREDEFINED_CATEGORIES,
    USER_CATEGORIES,
} from '../../../shared/constants'

const SEPARATOR_INDEX = '2'

const renderItem = (item, navigation) => {
    return (
        <ListItem
            title={item.title}
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

const CategoriesList = ({ navigation }) => {
    return (
        <FlatList
            data={[...PREDEFINED_CATEGORIES, ...USER_CATEGORIES]}
            renderItem={({ item }) => renderItem(item, navigation)}
            ItemSeparatorComponent={(e) => separator(e)}
        />
    )
}

export default CategoriesList
