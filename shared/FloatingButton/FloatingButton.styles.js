import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        backgroundColor: '#6638f0',
        borderColor: '#6638f0',
        width: 100,
        height: 100,
        zIndex: 300, // works on ios
        elevation: 300, // works on android
        position: 'absolute',
        right: 10,
        bottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 50,
    },
    boxShadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
})

export default styles
