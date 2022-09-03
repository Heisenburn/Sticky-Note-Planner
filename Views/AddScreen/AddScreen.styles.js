import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'stretch',
        height: Dimensions.get('window').height,
    },
    innerContainer: {
        marginHorizontal: 30,
    },
    heading: {
        color: 'black',
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    editMode: {
        color: 'red',
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 20,
    },
    categoryInfo: {
        color: 'gray',
        marginBottom: 10,
    },
    buttonCommonStyles: {
        marginTop: 10,
    },
    noteInput: {
        marginTop: 10,
        marginBottom: 10,
        height: 300,
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        backgroundColor: '#ffffff',
    },
    categoryInput: {
        color: 'white',
        backgroundColor: '#662EC9',
        height: 40,
        margin: 20,
        borderWidth: 1,
        padding: 10,
    },
})

export default styles
