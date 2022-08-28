import { View, Pressable, Text } from 'react-native'
import styles from './FloatingButton.styles'

const FloatingButton = ({ navigation, clickedCategory }) => {
    return (
        <Pressable
            style={[styles.container, styles.boxShadow]}
            onPress={() => {
                navigation.navigate('AddScreen', {
                    clickedCategory: clickedCategory,
                })
            }}
        >
            <Text style={styles.text}>+</Text>
        </Pressable>
    )
}

export default FloatingButton
