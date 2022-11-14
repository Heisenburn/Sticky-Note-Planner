import { Pressable, Text } from 'react-native'
import type {
    CategoryWithNotesType,
    StackParamList,
} from '../../../../types/types'
import styles from '../../HomeScreen.styles'
import { View } from 'react-native-ui-lib'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const CategoryItem = ({
    item,
    navigation,
}: {
    item: CategoryWithNotesType
    navigation: NativeStackNavigationProp<
        StackParamList,
        'HomeScreen',
        undefined
    >
}) => {
    const { categoryTitle, items } = item.details

    return (
        <Pressable
            style={[styles.categoryButton]}
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
            <View
                style={{
                    borderRadius: 20,
                    backgroundColor: '#eba814',
                    height: 30,
                    width: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={[styles.numberOfElements]}>{items.length}</Text>
            </View>
        </Pressable>
    )
}

export default CategoryItem
