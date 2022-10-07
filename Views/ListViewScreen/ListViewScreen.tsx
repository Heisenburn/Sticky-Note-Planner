// //TODO: może użyć tego?
// // const getColor = (i) => {
// //     const multiplier = 255 / (NUM_ITEMS - 1)
// //     const colorVal = i * multiplier
// //     return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
// // }

// import { MaterialIcons } from '@expo/vector-icons'
import styles from './ListViewScreen.style'
import * as Haptics from 'expo-haptics'
import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
import { Dimensions } from 'react-native'
import React, {useCallback, useState, useContext, useRef, useEffect, useMemo} from 'react'
import {
    SortableList,
    View,
    TouchableOpacity,
    Text,
    ActionSheet,
} from 'react-native-ui-lib'

import { CategoriesWithNotesContext } from '../../Context/CategoriesWithNotesContext'
import { Entypo } from '@expo/vector-icons'
import { CustomCheckbox } from './Checkbox'
import { ACTIONS } from '../../Shared/constants'

interface Item {
    note: string
    id: string
}

const MIN_HEIGHT = Dimensions.get('window').height - 100

const ListViewScreen = ({ route, navigation }) => {
    const { passedPropsFromPreviousScreen } = route.params
    const { categoryItem } = passedPropsFromPreviousScreen
    const { categoryId, details } = categoryItem
    const { items: data, categoryTitle } = details || []

    const [listItems] = useState( data)



    const { getData, updateData } = useContext(CategoriesWithNotesContext)
    const rootData = getData();


    const editedElement = useRef<Item | null>(null)

    const actionSheetOptions = [
        {
            label: 'Edytuj',
            onPress: () => {
                navigation.navigate('AddScreen', {
                    passedPropsFromPreviousScreen: {
                        category: {
                            categoryId,
                            categoryTitle,
                        },
                        noteValueToBeEdited: editedElement.current.note,
                        action: ACTIONS.EDIT_NOTE,
                    },
                })
            },
        },
        { label: 'Usuń', onPress: () => {} },
        { label: 'Wyjdź', onPress: () => console.log('cancel') },
    ]
    const closeActionSheetOptionsIndex = actionSheetOptions.length

    const [
        isListingItemOptionsModalVisible,
        setIsListingItemOptionsModalVisible,
    ] = useState(false)

    const keyExtractor = useCallback((item: Item) => {
        return `${categoryId}-${item.note}`
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

    // const handleSettingsClick = useCallback(() => {
    //     navigation.navigate('SettingsScreen', {
    //         passedPropsFromPreviousScreen: {
    //             category: {
    //                 categoryTitle,
    //                 categoryId,
    //             },
    //         },
    //     })
    // }, [])

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
                paddingH-page
            >
                <View flex row spread centerV>
                    <View flex row centerV>
                        <CustomCheckbox />
                        <Text center $textDefault style={{ maxWidth: 200 }}>
                            {item.note}
                        </Text>
                    </View>
                    <Entypo
                        name="dots-three-horizontal"
                        size={34}
                        color="black"
                        onPress={() => {
                            setIsListingItemOptionsModalVisible(true)
                            //TODO: tutaj przekazywac ID?
                            editedElement.current = item
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }


    console.log({data})

    return (
        <View useSafeArea style={{ minHeight: MIN_HEIGHT, marginTop: 10 }}>
            {/*<View spread row padding-15 centerV>*/}
            {/*    <View bottom row padding>*/}
            {/*        <Text h1 blue20>*/}
            {/*            {categoryTitle}*/}
            {/*        </Text>*/}
            {/*    </View>*/}
            {/*    <MaterialIcons*/}
            {/*        name="settings"*/}
            {/*        size={40}*/}
            {/*        color="black"*/}
            {/*        onPress={handleSettingsClick}*/}
            {/*    />*/}
            {/*</View>*/}
            <SortableList
                data={listItems}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onOrderChange={onOrderChange}
                scale={1.12}
            />
            <ActionSheet
                title={'Opcje'}
                message={'Wybierz właściwą akcje'}
                cancelButtonIndex={closeActionSheetOptionsIndex}
                destructiveButtonIndex={closeActionSheetOptionsIndex - 1}
                options={actionSheetOptions}
                visible={isListingItemOptionsModalVisible}
                useNativeIOS={true}
                onDismiss={() => setIsListingItemOptionsModalVisible(false)}
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
