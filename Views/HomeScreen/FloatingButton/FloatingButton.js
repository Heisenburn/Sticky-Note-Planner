import { View, Pressable, Text } from 'react-native'
import styles from './FloatingButton.styles'

const FloatingButton = ({ navigation, clickedCategory }) => {
    return (
        <View style={[styles.container, styles.boxShadow]}>
            <Pressable
                style={styles.button}
                onPress={() => {
                    navigation.navigate('AddScreen', {
                        clickedCategory: clickedCategory,
                    })
                }}
            >
                <Text style={styles.numberOfElements}>+</Text>
            </Pressable>
        </View>
    )
}

export default FloatingButton
