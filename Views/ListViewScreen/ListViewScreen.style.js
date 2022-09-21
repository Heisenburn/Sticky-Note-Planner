import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        minHeight: 100,
        maxHeight: 100,
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 22,
        maxWidth: 200,
    },
    heading: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
        width: '80%',
    },
    underlayRight: {
        flex: 1,
        backgroundColor: 'teal',
        justifyContent: 'flex-start',
    },
    underlayLeft: {
        flex: 1,
        backgroundColor: 'tomato',
        justifyContent: 'flex-end',
    },
})

export default styles
