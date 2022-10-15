import FloatingButton from '../../Shared/FloatingButton/FloatingButton'
import { Alert, Dimensions } from 'react-native'
import React, {
    useState,
    useRef,
    useMemo,
    useCallback,
    useContext,
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

    const handleRemove = () => {
        const dataWithoutRemovedElement = data.filter((categoryItem) => {
            if (categoryItem.categoryId === categoryId) {
                categoryItem.details.items = categoryItem.details.items.filter(
                    (item) => item.id !== editedElement.current.id
                )
            }
            return categoryItem
        })

        updateData(dataWithoutRemovedElement)
    }

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
    }, [editedElement])

    const actionSheetOptions = getActionSheetOption()
    const closeActionSheetOptionsIndex = actionSheetOptions.length

    const MIN_HEIGHT = useMemo(() => Dimensions.get('window').height - 100, [])

    return (
        <View
            useSafeArea
            style={{
                minHeight: MIN_HEIGHT,
                marginTop: 10,
            }}
        >
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
