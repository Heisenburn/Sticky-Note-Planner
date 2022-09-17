import { Pressable, Text } from 'react-native'
import styles from '../HomeScreen.styles'
import { ACTIONS } from '../../../Shared/constants'

const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    return `#${randomColor}`
}

const CategoryItem = ({ item, navigation }) => {
    const { categoryTitle, items } = item.details

    return (
        <Pressable
            style={[
                styles.categoryButton,
                styles.boxShadow,
                { backgroundColor: generateColor() },
            ]}
            onPress={() => {
                navigation.navigate('ListViewScreen', {
                    passedPropsFromPreviousScreen: {
                        categoryTitle,
                        categoryId: item.categoryId,
                    },
                })
            }}
        >
            <Text style={styles.heading}>{categoryTitle}</Text>
            <Text style={[styles.numberOfElements, styles.boxShadow]}>
                {items?.length}
            </Text>
        </Pressable>
    )
}

export default CategoryItem
