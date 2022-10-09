import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
import { Dimensions } from 'react-native'
import React, { useState, useRef, useMemo, useCallback } from 'react'
import { View, ActionSheet } from 'react-native-ui-lib'
import { ACTIONS } from '../../Shared/constants'
import type { Item } from './types'
import { CustomSortableList } from './Components/CustomSortableList'

const ListViewScreen = ({ route, navigation }) => {
    const { passedPropsFromPreviousScreen } = route.params
    const { categoryItem } = passedPropsFromPreviousScreen
    const { categoryId, details } = categoryItem
    const { items: data, categoryTitle } = details || []

    const [
        isListingItemOptionsModalVisible,
        setIsListingItemOptionsModalVisible,
    ] = useState(false)
    const editedElement = useRef<Item | null>(null)

    console.log({ data })

    const getActionSheetOption = useCallback(() => {
        return [
            {
                label: 'Edytuj',
                onPress: () => {
                    navigation.navigate('AddScreen', {
                        passedPropsFromPreviousScreen: {
                            category: {
                                categoryId,
                                categoryTitle,
                            },
                            noteToBeEdited: editedElement.current,
                            action: ACTIONS.EDIT_NOTE,
                        },
                    })
                },
            },
            { label: 'Usuń', onPress: () => {} },
            { label: 'Wyjdź', onPress: () => console.log('cancel') },
        ]
    }, [editedElement])

    const actionSheetOptions = getActionSheetOption()
    const closeActionSheetOptionsIndex = actionSheetOptions.length

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

    const MIN_HEIGHT = useMemo(() => Dimensions.get('window').height - 100, [])

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
            <CustomSortableList
                data={data}
                setIsListingItemOptionsModalVisible={
                    setIsListingItemOptionsModalVisible
                }
                editedElement={editedElement}
                categoryId={categoryId}
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
