import React, { useState, useRef, useEffect, useContext } from 'react'
import { View, Button, Text } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import styles from './ListViewScreen.style'
import RowItem from './RowItem/RowItem'
import setAsyncStorageValue from '../../AsyncStorage/setAsyncStorageValue'
import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
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
    const { items } = categoryItem?.details || []

    const removeItem = async (idToBeRemoved) => {
        const filteredItems = items.filter(
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

    const handleDragUpAndDown = async (listItemsAfterDrag) => {
        //save data with new order
        const dataWithNewOrder = data.filter((item) => {
            if (item.categoryId === categoryId) {
                item.details.items = listItemsAfterDrag.map((item) => item.text)
            }
            return item
        })

        updateData(dataWithNewOrder)
    }

    useEffect(() => {
        //structure of data expected by DraggableFlatList library
        if (!items) return setListItems([])
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
    }, [data])

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
