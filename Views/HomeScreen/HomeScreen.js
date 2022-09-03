import { SafeAreaView } from 'react-native'
import CategoriesList from './Categories/CategoriesList'
import FloatingButton from '../../shared/FloatingButton/FloatingButton'
import styles from './HomeScreen.styles'
import { useIsFocused } from '@react-navigation/native'
import getNotesForCategory from '../../LocalStorage/getNotesForCategory'
import { useEffect, useState } from 'react'

export default function HomeScreenBase({ navigation }) {
    const isFocused = useIsFocused()

    //AsyncStorage: jedyne zrodło prawdy o kategoriach (COUNT)

    useEffect(() => {
        //TODO: title nie jest unikalne!
        // getNotesForCategory(title).then((response) => {
        //     if (response) {
        //         setNumberOfElementsForCategory({
        //             nameOfCategory: title,
        //             numberOfElements: response.length,
        //         })
        //     }
        // })
        // console.log({ isFocused })
    }, [isFocused])

    return (
        <SafeAreaView style={styles.container}>
            <FloatingButton navigation={navigation} />
            <CategoriesList navigation={navigation} />
        </SafeAreaView>
    )
}
