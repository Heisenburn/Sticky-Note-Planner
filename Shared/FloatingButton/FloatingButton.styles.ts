import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        zIndex: 300, // works on ios
        elevation: 300, // works on android
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
})

export default styles
