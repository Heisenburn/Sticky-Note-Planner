import React, { useState, useRef, useEffect } from 'react'
import { View, Button, Text } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import getElementsForKey from '../../AsyncStorage/getElementsForKey'
import styles from './ListViewScreen.style'
import RowItem from './RowItem/RowItem'
import setNotesInCategory from '../../AsyncStorage/setNotesInCategory'
import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const NUM_ITEMS = 20

const getColor = (i) => {
    const multiplier = 255 / (NUM_ITEMS - 1)
    const colorVal = i * multiplier
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
}

const ListViewScreenBase = ({ route, navigation }) => {
    const [listItems, setListItems] = useState([])
    //TODO: tutaj też mogą być dwie kategorie o takiej samej nazwie, wiec musimy to robic w oparicu o ID
    const { itemId: category, categories } = route.params

    const removeItem = async (idToBeRemoved) => {
        const filteredItems = listItems.filter(
            (item) => item.id !== idToBeRemoved
        )

        await setNotesInCategory(category.toString(), filteredItems)
        setListItems(filteredItems)
    }

    const handleDragUpAndDown = async (data) => {
        //save data with new order
        setListItems(data)
        await setNotesInCategory(category.toString(), data)
    }

    const isFocused = useIsFocused()

    //run refresh list items each team view is visible
    useEffect(() => {
        if (isFocused) {
            getElementsForKey(category).then((response) => {
                if (response) {
                    const { items } = response

                    const mappedData = items.map((note, index) => {
                        const backgroundColor = getColor(index)
                        return {
                            id: index,
                            text: note,
                            //TODO: key mozna zastapic id?
                            key: `key-${backgroundColor}`,
                            backgroundColor,
                            height: 100,
                        }
                    })
                    setListItems(mappedData)
                }
            })
        }
    }, [isFocused])

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
            <Text style={styles.heading}>{category}</Text>
            <View style={styles.container}>
                {listItems?.length ? (
                    <DraggableFlatList
                        keyExtractor={(item) => item.key}
                        data={listItems}
                        renderItem={renderItem}
                        onDragEnd={({ data }) => handleDragUpAndDown(data)}
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
