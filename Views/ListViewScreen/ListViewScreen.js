import { SafeAreaView } from 'react-native'
import { View, Text } from 'react-native'
import styles from './ListViewScreen.style'
import getData from '../../LocalStorage/getData'
import { useEffect, useState } from 'react'

export default function ListViewScreen({ route }) {
    const [listItems, setListItems] = useState([])
    const { itemId: category } = route.params

    useEffect(() => {
        getData(category).then((value) => {
            if (!value.length) {
                setListItems([value])
            }
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Details Screen</Text>
                <Text>itemId: {category}</Text>
                {listItems.length > 0 ? (
                    listItems.map((item) => {
                        return <Text>* {item}</Text>
                    })
                ) : (
                    <Text>
                        Brak notatek w tej kategorii lub błąd z pobraniem
                    </Text>
                )}
            </View>
        </SafeAreaView>
    )
}
