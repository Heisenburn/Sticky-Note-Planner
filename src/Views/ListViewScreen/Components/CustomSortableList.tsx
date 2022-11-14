import { SortableList, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from '../ListViewScreen.style'
import { CustomCheckbox } from './Checkbox'
import { Entypo } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { CategoriesWithNotesContext } from '../../../Context/CategoriesWithNotesContext'
import { CategoryWithNotesType, ItemInCategoryType } from '../../../types/types'

interface Props {
    data: ItemInCategoryType[]
    setIsListingItemOptionsModalVisible: React.Dispatch<
        React.SetStateAction<boolean>
    >
    editedElement: React.MutableRefObject<ItemInCategoryType>
    categoryId: string
}

export const CustomSortableList = ({
    data,
    setIsListingItemOptionsModalVisible,
    editedElement,
    categoryId,
}: Props) => {
    const [listItems, setListItems] = useState(data)

    const { getData, updateData } = useContext(CategoriesWithNotesContext)
    const allData = getData()

    useEffect(() => {
        setListItems(data)
    }, [data])

    const renderItem = ({
        item,
        index: _index,
    }: {
        item: ItemInCategoryType
        index: number
    }) => {
        return (
            <TouchableOpacity
                style={{
                    ...styles.itemContainer,
                }}
                centerV
                paddingH-10
            >
                <View flex row spread centerV>
                    <View flex row centerV>
                        <CustomCheckbox
                            item={item}
                            updateData={updateData}
                            rootData={allData}
                            categoryId={categoryId}
                        />
                        <Text
                            center
                            $textDefault
                            style={{
                                maxWidth: 200,
                            }}
                        >
                            {item.note}
                        </Text>
                    </View>
                    <Entypo
                        name="dots-three-horizontal"
                        size={24}
                        color="black"
                        onPress={() => {
                            editedElement.current = item
                            setIsListingItemOptionsModalVisible(true)
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    const keyExtractor = useCallback((item: ItemInCategoryType) => {
        return item.id
    }, [])

    const onOrderChange = useCallback(
        async (dataAfterOrderChange) => {
            const mappedData = allData.map(
                (categoryItem: CategoryWithNotesType) => {
                    if (categoryItem.categoryId === categoryId) {
                        return {
                            ...categoryItem,
                            details: {
                                ...categoryItem.details,
                                items: dataAfterOrderChange,
                            },
                        }
                    }
                    return categoryItem
                }
            )

            updateData(mappedData)

            await Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            )
        },
        [categoryId, allData, updateData]
    )

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
