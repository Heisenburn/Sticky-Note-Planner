import { Pressable, Text } from 'react-native'
import styles from './FloatingButton.styles'

const FloatingButton = ({
    navigation,
    clickedCategory = null,
    setShouldFetch,
}) => {
    return (
        <Pressable
            style={[styles.container, styles.boxShadow]}
            onPress={() => {
                navigation.navigate('AddScreen', {
                    clickedCategory,
                })
            }}
        >
            <Text style={styles.text}>+</Text>
        </Pressable>
    )
}

export default FloatingButton
