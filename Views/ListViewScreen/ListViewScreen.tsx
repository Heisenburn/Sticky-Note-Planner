import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
import { Dimensions } from 'react-native'
import React, {
    useState,
    useRef,
    useMemo,
    useCallback,
    useContext,
    useEffect,
} from 'react'
import { View, ActionSheet } from 'react-native-ui-lib'
import { ACTIONS } from '../../Shared/constants'
import type { Item } from './types'
import { CustomSortableList } from './Components/CustomSortableList'
import { CategoriesWithNotesContext } from '../../Context/CategoriesWithNotesContext'

const ListViewScreen = ({ navigation, route }) => {
    const { getData, updateData } = useContext(CategoriesWithNotesContext)
    const data = getData()

    const { passedPropsFromPreviousScreen } = route.params
    const { categoryId } = passedPropsFromPreviousScreen

    const categoryItem = data.find((item) => item.categoryId === categoryId)

    const categoryTitle =
        passedPropsFromPreviousScreen?.categoryTitle ||
        categoryItem.details.categoryTitle

    const details = categoryItem?.details

    const items = details?.items || []

    const [
        isListingItemOptionsModalVisible,
        setIsListingItemOptionsModalVisible,
    ] = useState(false)
    const editedElement = useRef<Item | null>(null)

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
            {
                label: 'Usuń',
                onPress: () => {
                    const dataWithoutRemovedElement = data.filter(
                        (categoryItem) => {
                            if (categoryItem.categoryId === categoryId) {
                                categoryItem.details.items =
                                    categoryItem.details.items.filter(
                                        (item) =>
                                            item.id !== editedElement.current.id
                                    )
                            }
                            return categoryItem
                        }
                    )

                    updateData(dataWithoutRemovedElement)
                },
            },
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
        <View
            useSafeArea
            style={{
                minHeight: MIN_HEIGHT,
                marginTop: 10,
            }}
        >
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
                data={items}
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
