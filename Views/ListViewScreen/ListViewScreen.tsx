// //TODO: może użyć tego?
// // const getColor = (i) => {
// //     const multiplier = 255 / (NUM_ITEMS - 1)
// //     const colorVal = i * multiplier
// //     return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
// // }

import { MaterialIcons } from '@expo/vector-icons'
import styles from './ListViewScreen.style'
import * as Haptics from 'expo-haptics'
import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
import { Dimensions } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import {
    SortableList,
    View,
    TouchableOpacity,
    Text,
    Icon,
    Assets,
    Colors,
} from 'react-native-ui-lib'
import { CategoryWithNotesType } from '../../types/types'

interface Item {
    item: CategoryWithNotesType['details']['items']
    id: string
}

const MIN_HEIGHT = Dimensions.get('window').height

const ListViewScreen = ({ route, navigation }) => {
    const { passedPropsFromPreviousScreen } = route.params

    const { categoryItem } = passedPropsFromPreviousScreen
    const { categoryId, details } = categoryItem
    const { items: data, categoryTitle } = details || []

    const [items, setItems] = useState<Item[] | []>([])

    useEffect(() => {
        const mappedData = data.map((item, index) => {
            return {
                item,
                id: `${item}-${index}`,
            }
        })
        setItems(mappedData)
    }, [])

    const keyExtractor = useCallback((item: Item) => {
        return `${categoryId}-${item.item}`
    }, [])

    const onOrderChange = useCallback(async (newData) => {
        console.log('New order:', newData)
        await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
    }, [])

    const handleSettingsClick = useCallback(() => {
        navigation.navigate('SettingsScreen', {
            passedPropsFromPreviousScreen: {
                category: {
                    categoryTitle,
                    categoryId,
                },
            },
        })
    }, [])

    const renderItem = useCallback(
        ({ item, index: _index }: { item: Item; index: number }) => {
            return (
                <TouchableOpacity
                    style={[styles.itemContainer]}
                    centerV
                    paddingH-page
                >
                    <View flex row spread centerV>
                        <Icon
                            source={Assets.icons.demo.drag}
                            tintColor={Colors.$iconDisabled}
                        />
                        <Text center $textDefault>
                            {item.item}
                        </Text>
                        <Icon
                            source={Assets.icons.demo.chevronRight}
                            tintColor={Colors.$iconDefault}
                        />
                    </View>
                </TouchableOpacity>
            )
        },
        []
    )

    return (
        <View useSafeArea style={{ minHeight: MIN_HEIGHT }}>
            <View spread row padding-15 centerV>
                <View bottom row padding>
                    <Text h1 blue20>
                        {categoryTitle}
                    </Text>
                </View>
                <MaterialIcons
                    name="settings"
                    size={40}
                    color="black"
                    onPress={handleSettingsClick}
                />
            </View>
            <SortableList
                data={items}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onOrderChange={onOrderChange}
                scale={1.12}
            />

            <FloatingButton
                navigation={navigation}
                categoryId={categoryId}
                categoryTitle={categoryTitle}
            />
        </View>
    )
}

export default ListViewScreen
