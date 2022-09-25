import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-ui-lib'

const styles = StyleSheet.create({
    itemContainer: {
        height: 52,
        borderColor: Colors.$outlineDefault,
        borderBottomWidth: 1,
    },
    selectedItemContainer: {
        borderLeftColor: Colors.$outlinePrimary,
        borderLeftWidth: 5,
    },
})

export default styles
