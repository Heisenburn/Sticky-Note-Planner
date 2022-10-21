import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
        minHeight: '100%',
    },
    heading: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        maxWidth: 200,
    },

    numberOfElements: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryButton: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#F4F5F7',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 15,
        borderColor: 'black',
        marginVertical: 10,
        height: 70,
        width: '90%',
        paddingHorizontal: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 1.22,

        elevation: 3,
    },
})

export default styles
