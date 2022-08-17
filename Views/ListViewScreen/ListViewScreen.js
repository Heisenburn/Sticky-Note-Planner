import { Button, SafeAreaView } from 'react-native'
import { View, Text } from 'react-native'
import styles from './ListViewScreen.style'
import getData from '../../LocalStorage/getData'
import { useEffect, useState } from 'react'
import SwipeableFlatList from 'react-native-swipeable-list'

const ListViewScreen = ({ route, navigation }) => {
    const [listItems, setListItems] = useState([])
    const { itemId: category } = route.params

    useEffect(() => {
        getData(category).then((response) => {
            if (response) {
                setListItems(response)
            }
        })
    }, [])

    const renderItem = ({ item }) => <Text key={item.id}>{item.text}</Text>

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Details Screen</Text>
                <Text>itemId: {category}</Text>
                {listItems.length !== 0 ? (
                    <SwipeableFlatList
                        data={listItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <Text>
                        Brak notatek w tej kategorii lub błąd z pobraniem
                    </Text>
                )}
                <Button
                    title="Powrót"
                    onPress={() => navigation.navigate('HomeScreen')}
                />
            </View>
        </SafeAreaView>
    )
}

export default ListViewScreen
