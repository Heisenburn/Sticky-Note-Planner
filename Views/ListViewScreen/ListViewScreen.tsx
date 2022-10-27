import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
import { Alert } from 'react-native'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { ActionSheet, View } from 'react-native-ui-lib'
import { ACTIONS } from '../../Shared/constants'
import { CustomSortableList } from './Components/CustomSortableList'
import { CategoriesWithNotesContext } from '../../Context/CategoriesWithNotesContext'
import { ItemInCategoryType } from '../../types/types'
import { FinishedNotesList } from './Components/FinishedNotesList'

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

    const editedElement = useRef<ItemInCategoryType | null>(null)

    const handleRemove = useCallback(() => {
        const dataWithoutRemovedElement = data.filter((categoryItem) => {
            if (categoryItem.categoryId === categoryId) {
                return {
                    ...categoryItem,
                    details: {
                        ...categoryItem.details.items,
                        items: categoryItem.details.items.filter(
                            (item) => item.id !== editedElement.current.id
                        ),
                    },
                }
            }
            return categoryItem
        })

        updateData(dataWithoutRemovedElement)
    }, [categoryId, data, updateData])

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
                    Alert.alert(
                        'Usunięcie notatki',
                        `Czy na pewno chcesz usunąć tę notatkę?`,
                        [
                            {
                                text: 'Tak',
                                onPress: () => {
                                    handleRemove()
                                },
                            },
                            {
                                text: 'Nie',
                            },
                        ]
                    )
                },
            },
            {
                label: 'Zamknij',
            },
        ]
    }, [categoryId, categoryTitle, handleRemove, navigation])

    const actionSheetOptions = getActionSheetOption()
    const closeActionSheetOptionsIndex = actionSheetOptions.length

    const notFinishedItems = items.filter((item) => item.checked === false)
    const finishedItems = items.filter((item) => item.checked === true)

    return (
        <View
            style={{
                minHeight: '100%',
            }}
        >
            <CustomSortableList
                data={notFinishedItems}
                setIsListingItemOptionsModalVisible={
                    setIsListingItemOptionsModalVisible
                }
                editedElement={editedElement}
                categoryId={categoryId}
            />
            <FinishedNotesList data={finishedItems} />
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
