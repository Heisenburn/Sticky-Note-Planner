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
        color: 'white',
    },
    noteInput: {
        marginTop: 10,
        backgroundColor: 'white',
        height: 300,
        borderRadius: 10,
        padding: 20,
    },
    buttonCommonStyles: {
        marginTop: 10,
        padding: 20,
        borderRadius: 10,
    },
    saveButton: {
        backgroundColor: 'orange',
    },
    optionsButton: {
        backgroundColor: '#662EC9',
    },
    categoryInput: {
        color: 'white',
        backgroundColor: '#662EC9',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    backButton: {
        backgroundColor: 'gray',
    },
})

export default styles
