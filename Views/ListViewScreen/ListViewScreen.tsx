import { useState, useEffect, useRef, useCallback } from 'react'
import { View, Platform, UIManager, Button, Text } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import getNotesForCategory from '../../LocalStorage/getNotesForCategory'
import styles from './ListViewScreen.style'
import RowItem from './RowItem/RowItem'
import setNotesInCategory from '../../LocalStorage/setNotesInCategory'
import FloatingButton from '../../shared/FloatingButton/FloatingButton'
import { getListWithoutElementById } from '../../shared/API/helpers/removeItemInCategory'

// if (Platform.OS === 'android') {
//     UIManager.setLayoutAnimationEnabledExperimental &&
//         UIManager.setLayoutAnimationEnabledExperimental(true)
// }

const NUM_ITEMS = 20

const getColor = (i) => {
    const multiplier = 255 / (NUM_ITEMS - 1)
    const colorVal = i * multiplier
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
}

const ListViewScreenBase = ({ route, navigation }) => {
    const [listItems, setListItems] = useState([])
    const { itemId: category } = route.params

    const removeItem = async (idToBeRemoved) => {
        const filteredItems = listItems.filter(
            (item) => item.id !== idToBeRemoved
        )

        await setNotesInCategory(category.toString(), filteredItems)
        setListItems(filteredItems)
    }

    const handleDragEnd = async (data) => {
        //save data with new order
        setListItems(data)
        await setNotesInCategory(category.toString(), data)
    }

    useEffect(() => {
        getNotesForCategory(category).then((response) => {
            if (response) {
                const mappedData = response.map(({ text, id }, index) => {
                    const backgroundColor = getColor(index)
                    return {
                        id,
                        text: text,
                        //TODO: key mozna zastapic id?
                        key: `key-${backgroundColor}`,
                        backgroundColor,
                        height: 100,
                    }
                })
                setListItems(mappedData)
            }
        })
    }, [])

    const itemRefs = useRef(new Map())

    const renderItem = (params) => {
        return (
            <RowItem
                {...params}
                itemRefs={itemRefs}
                removeItem={removeItem}
                navigation={navigation}
                category={category}
                listItems={listItems}
            />
        )
    }

    return (
        <>
            <View style={styles.container}>
                {listItems.length ? (
                    <DraggableFlatList
                        keyExtractor={(item) => item.key}
                        data={listItems}
                        renderItem={renderItem}
                        onDragEnd={({ data }) => handleDragEnd(data)}
                        activationDistance={20}
                    />
                ) : (
                    <Text>Brak notatek</Text>
                )}
            </View>
            <Button
                title="Powrót"
                onPress={() => navigation.navigate('HomeScreen')}
            />
            <FloatingButton
                navigation={navigation}
                clickedCategory={category}
            />
        </>
    )
}

export default ListViewScreenBase
