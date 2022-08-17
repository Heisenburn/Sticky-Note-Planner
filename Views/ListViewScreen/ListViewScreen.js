import { Button, SafeAreaView } from 'react-native'
import { View, Text } from 'react-native'
import styles from './ListViewScreen.style'
import getData from '../../LocalStorage/getData'
import { useEffect, useState } from 'react'
import TableviewListView from 'react-native-tableview-list'

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
                <TableviewListView
                    sections={[{ title: 'title', key: 1, data: [1] }]}
                    rowHeight={50}
                    renderItem={renderItem}
                />
                <Button
                    title="Powrót"
                    onPress={() => navigation.navigate('HomeScreen')}
                />
            </View>
        </SafeAreaView>
    )
}

export default ListViewScreen
