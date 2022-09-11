import React, { useState, useRef, useEffect, useContext } from 'react'
import { View, Button, Text } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import getElementsForKey from '../../AsyncStorage/getElementsForKey'
import styles from './ListViewScreen.style'
import RowItem from './RowItem/RowItem'
import setNotesInCategory from '../../AsyncStorage/setNotesInCategory'
import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CategoriesWithNotesContext } from '../../Context/CategoriesWithNotesContext'

const NUM_ITEMS = 20

const getColor = (i) => {
    const multiplier = 255 / (NUM_ITEMS - 1)
    const colorVal = i * multiplier
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
}

const ListViewScreenBase = ({ route, navigation }) => {
    const [listItems, setListItems] = useState([])
    const { categoryId, categoryTitle } = route.params
    const { getData, updateData } = useContext(CategoriesWithNotesContext)

    const data = getData()
    const categoryItem = data.find((item) => item.categoryId === categoryId)
    const { items } = categoryItem.details

    const removeItem = async (idToBeRemoved) => {
        const filteredItems = categoryItem.details.items.filter(
            (item, index) => index !== idToBeRemoved
        )

        const dataWithRemovedElement = data.filter((item) => {
            if (item.categoryId === categoryId) {
                item.details.items = filteredItems
            }
            return item
        })

        updateData(dataWithRemovedElement)
        setListItems(filteredItems)
    }

    const handleDragUpAndDown = async (data) => {
        //save data with new order
        setListItems(data)
        await setNotesInCategory(categoryId.toString(), data)
    }

    const isFocused = useIsFocused()

    //run refresh list items each team view is visible
    useEffect(() => {
        if (isFocused) {
            //structure of data expected by DraggableFlatList library
            const mappedData = items.map((note, index) => {
                const backgroundColor = getColor(index)
                return {
                    id: index,
                    text: note,
                    key: `key-${backgroundColor}`,
                    backgroundColor,
                    height: 100,
                }
            })

            setListItems(mappedData)
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
                category={categoryTitle}
                listItems={listItems}
            />
        )
    }

    return (
        <>
            <Text style={styles.heading}>{categoryTitle}</Text>
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
                clickedCategory={categoryId}
            />
        </>
    )
}

export default ListViewScreenBase
