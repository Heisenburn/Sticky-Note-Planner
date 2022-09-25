// import React, { useState, useEffect } from 'react'
// import { View, Button, Text } from 'react-native'
// import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
// import { MaterialIcons } from '@expo/vector-icons'
// import {
//     Colors,
//     Drawer,
//     View as RNUIView,
//     Text as RNUIText,
//     SortableList,
// } from 'react-native-ui-lib'
//
// const NUM_ITEMS = 20
//
// export type DraggableFlatListStructure = {
//     id: number
//     text: string
//     key: string
//     backgroundColor: string
// }
//
// //TODO: może użyć tego?
// const getColor = (i) => {
//     const multiplier = 255 / (NUM_ITEMS - 1)
//     const colorVal = i * multiplier
//     return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
// }
//
// const ListViewScreen = ({ route, navigation }) => {
//     const { passedPropsFromPreviousScreen } = route.params
//     const { categoryItem } = passedPropsFromPreviousScreen
//
//     const [listItems, setListItems] = useState<DraggableFlatListStructure[]>([])
//
//     const { categoryId } = categoryItem
//     const { items } = categoryItem?.details || []
//     const categoryTitle = categoryItem?.details?.categoryTitle
//
//     const removeItem = async (idToBeRemoved) => {
//         // const filteredItems = items.filter(
//         //     (item, index) => index !== idToBeRemoved
//         // )
//         //
//         // const dataWithRemovedElement = data.filter((item) => {
//         //     if (item.categoryId === categoryId) {
//         //         item.details.items = filteredItems
//         //     }
//         //     return item
//         // })
//         //
//         // updateData(dataWithRemovedElement)
//         // setListItems(filteredItems)
//     }
//
//     const handleDragUpAndDown = async (listItemsAfterDrag) => {
//         // //save data with new order
//         // const dataWithNewOrder = data.filter((item) => {
//         //     if (item.categoryId === categoryId) {
//         //         item.details.items = listItemsAfterDrag.map((item) => item.text)
//         //     }
//         //     return item
//         // })
//         //
//         // updateData(dataWithNewOrder)
//     }
//
//     useEffect(() => {
//         //structure of data expected by DraggableFlatList library
//         // if (!items) return setListItems([])
//         // const mappedData = items.map((note, index) => {
//         //     const backgroundColor = getColor(index)
//         //     return {
//         //         id: index,
//         //         text: note,
//         //         key: `key-${backgroundColor}`,
//         //         backgroundColor,
//         //     }
//         // })
//         //
//         // setListItems(mappedData)
//     }, [])
//
//     const handleSettingsClick = () => {
//         navigation.navigate('SettingsScreen', {
//             passedPropsFromPreviousScreen: {
//                 category: {
//                     categoryTitle,
//                     categoryId,
//                 },
//             },
//         })
//     }
//
//     return (
//         <>
//             <View
//                 style={{
//                     padding: 20,
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                 }}
//             >
//                 <Text style={styles.heading}>
//                     Kategoria:{' '}
//                     <Text style={{ color: 'blue' }}>{categoryTitle}</Text>
//                 </Text>
//                 <MaterialIcons
//                     name="settings"
//                     size={40}
//                     color="black"
//                     onPress={handleSettingsClick}
//                 />
//             </View>
//             <View style={styles.container}>
//                 <SortableList
//                     data={data}
//                     onOrderChange={onOrderChange}
//                     renderItem={renderItem}
//                     keyExtractor={keyExtractor}
//                 />
//                 {items.map((item, index) => {
//                     return (
//                         <Drawer
//                             key={index}
//                             rightItems={[
//                                 {
//                                     text: 'Delete',
//                                     background: Colors.red30,
//                                     onPress: (item) => console.log({ item }),
//                                 },
//                             ]}
//                             leftItem={{
//                                 text: 'Read',
//                                 background: Colors.green30,
//                                 onPress: () => console.log('read pressed'),
//                             }}
//                             style={{
//                                 marginBottom: 10,
//                             }}
//                             bounciness={15}
//                         >
//                             <RNUIView
//                                 centerV
//                                 padding-s4
//                                 bg-white
//                                 style={{ height: 60 }}
//                             >
//                                 <RNUIText text70>{item}</RNUIText>
//                             </RNUIView>
//                         </Drawer>
//                     )
//                 })}
//             </View>
//             <Button
//                 title="Powrót"
//                 onPress={() => navigation.navigate('HomeScreen')}
//             />
//             <FloatingButton
//                 navigation={navigation}
//                 categoryId={categoryId}
//                 categoryTitle={categoryTitle}
//             />
//         </>
//     )
// }
//
// export default ListViewScreen

import _ from 'lodash'
import React, { useCallback, useState, useRef } from 'react'
import {
    SortableList,
    View,
    TouchableOpacity,
    Text,
    Icon,
    Assets,
    Colors,
} from 'react-native-ui-lib'
import styles from './ListViewScreen.style'
import * as Haptics from 'expo-haptics'

interface Item {
    originalIndex: number
    id: string
}

const data = _.times(30, (index) => {
    return {
        originalIndex: index,
        id: `${index}`,
    }
})

const ListViewScreen = ({ route }) => {
    const { passedPropsFromPreviousScreen } = route.params

    console.log({ passedPropsFromPreviousScreen })
    const [items, setItems] = useState<Item[]>(data)
    const orderedItems = useRef<Item[]>(data)

    const keyExtractor = useCallback((item: Item) => {
        return `${item.id}`
    }, [])

    const onOrderChange = useCallback(async (newData: Item[]) => {
        console.log('New order:', newData)
        orderedItems.current = newData
        await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
    }, [])

    const renderItem = useCallback(
        ({ item, index: _index }: { item: Item; index: number }) => {
            return (
                <TouchableOpacity
                    style={[styles.itemContainer]}
                    // onPress={() => toggleItemSelection(item)}
                    centerV
                    paddingH-page
                >
                    <View flex row spread centerV>
                        <Icon
                            source={Assets.icons.demo.drag}
                            tintColor={Colors.$iconDisabled}
                        />
                        <Text center $textDefault>
                            {item.originalIndex}
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
        <View useSafeArea>
            <Text h1>Kategoria</Text>
            <SortableList
                data={items}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onOrderChange={onOrderChange}
                scale={1.12}
                enableHaptic={true}
            />
        </View>
    )
}

export default ListViewScreen
