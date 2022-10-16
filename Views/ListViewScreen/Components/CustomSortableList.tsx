import { SortableList, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Item } from '../types'
import styles from '../ListViewScreen.style'
import { CustomCheckbox } from './Checkbox'
import { Entypo } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { CategoriesWithNotesContext } from '../../../Context/CategoriesWithNotesContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export const CustomSortableList = ({
    data,
    setIsListingItemOptionsModalVisible,
    editedElement,
    categoryId,
}) => {
    const [listItems, setListItems] = useState(data)

    const { getData, updateData } = useContext(CategoriesWithNotesContext)
    const rootData = getData()

    useEffect(() => {
        setListItems(data)
    }, [data])

    const renderItem = ({
        item,
        index: _index,
    }: {
        item: Item
        index: number
    }) => {
        return (
            <TouchableOpacity
                style={[styles.itemContainer]}
                centerV
                paddingH-10
            >
                <View flex row spread centerV>
                    <View flex row centerV>
                        <MaterialCommunityIcons
                            name="drag"
                            size={24}
                            color="gray"
                            style={{
                                marginRight: 10,
                            }}
                        />
                        <CustomCheckbox />
                        <Text center $textDefault style={{ maxWidth: 200 }}>
                            {item.note}
                        </Text>
                    </View>
                    <Entypo
                        name="dots-three-horizontal"
                        size={24}
                        color="black"
                        onPress={() => {
                            setIsListingItemOptionsModalVisible(true)
                            editedElement.current = item
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    const keyExtractor = useCallback((item: Item) => {
        return item.id
    }, [])

    const onOrderChange = useCallback(async (newData) => {
        const mappedData = rootData.map((item) => {
            if (item.categoryId === categoryId) {
                item.details.items = newData
            }
            return item
        })

        updateData(mappedData)

        await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
    }, [])

    return (
        <SortableList
            data={listItems}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onOrderChange={onOrderChange}
            scale={1.12}
        />
    )
}
