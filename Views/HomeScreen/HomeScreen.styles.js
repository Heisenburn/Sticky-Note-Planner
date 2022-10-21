import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
        minHeight: '100%',
    },
    heading: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        maxWidth: 200,
    },

    boxShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    numberOfElements: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    categoryButton: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: 'orange',
        borderRadius: 25,
        marginVertical: 10,
        height: 110,
        width: '90%',
        paddingHorizontal: 20,
    },
})

export default styles
