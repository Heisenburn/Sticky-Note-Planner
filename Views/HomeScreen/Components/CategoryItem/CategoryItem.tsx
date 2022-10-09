import { Pressable, Text } from 'react-native'
import { CategoryWithNotesType } from '../../../../types/types'
import styles from '../../HomeScreen.styles'

const CategoryItem = ({
    item,
    navigation,
}: {
    item: CategoryWithNotesType
    navigation: any
}) => {
    const { categoryTitle, items } = item.details

    return (
        <Pressable
            style={[
                styles.categoryButton,
                styles.boxShadow,
                { backgroundColor: 'orange' },
            ]}
            onPress={() => {
                navigation.navigate('ListViewScreen', {
                    passedPropsFromPreviousScreen: {
                        categoryId: item.categoryId,
                        categoryTitle,
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
