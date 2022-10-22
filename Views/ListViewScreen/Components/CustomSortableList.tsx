import { SortableList, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from '../ListViewScreen.style'
import { CustomCheckbox } from './Checkbox'
import { Entypo } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { CategoriesWithNotesContext } from '../../../Context/CategoriesWithNotesContext'
import { ItemInCategoryType } from '../../../types/types'

interface Props {
    data: ItemInCategoryType[]
    setIsListingItemOptionsModalVisible: React.Dispatch<
        React.SetStateAction<boolean>
    >
    editedElement: React.MutableRefObject<any>
    categoryId: string
}

export const CustomSortableList = ({
    data,
    setIsListingItemOptionsModalVisible,
    editedElement,
    categoryId,
}: Props) => {
    const sortedByCheckedState = data.sort((item) => (item.checked ? 1 : -1))
    const [listItems] = useState(sortedByCheckedState)

    const { getData, updateData } = useContext(CategoriesWithNotesContext)
    const allData = getData()

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
                                textDecorationLine: item.checked
                                    ? 'line-through'
                                    : 'none',
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
                            setIsListingItemOptionsModalVisible(true)
                            editedElement.current = item
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
        async (newData) => {
            const mappedData = allData.map((item) => {
                if (item.categoryId === categoryId) {
                    item.details.items = newData
                }
                return item
            })

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
            enableHaptic={true}
        />
    )
}
