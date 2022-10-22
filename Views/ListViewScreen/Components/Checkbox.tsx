import React, { useState } from 'react'
import { Checkbox } from 'react-native-ui-lib'
import type {
    CategoryWithNotesType,
    ItemInCategoryType,
} from '../../../types/types'

interface Props {
    item: ItemInCategoryType
    updateData: (newState: CategoryWithNotesType[]) => void
    rootData: CategoryWithNotesType[]
    categoryId: string
}

export const CustomCheckbox = ({
    item,
    updateData,
    rootData,
    categoryId,
}: Props) => {
    const [isChecked, setIsChecked] = useState(item.checked || false)

    const handleCheckboxClick = (checkboxState) => {
        setIsChecked(checkboxState)

        //move checked element at the end of list
        const sortedData = rootData.map((categoryItem) => {
            if (categoryItem.categoryId === categoryId) {
                const arrayOfItemsWithoutCheckedElement =
                    categoryItem.details.items.filter(
                        (iteratedItem) => iteratedItem !== item
                    )

                categoryItem.details.items = [
                    ...arrayOfItemsWithoutCheckedElement,
                    {
                        ...item,
                        checked: checkboxState,
                    },
                ]
            }
            return categoryItem
        })

        updateData(sortedData)
    }

    return (
        <Checkbox
            style={{
                marginRight: 20,
            }}
            color={'#eba814'}
            value={isChecked}
            onValueChange={(checkboxState) =>
                handleCheckboxClick(checkboxState)
            }
        />
    )
}
