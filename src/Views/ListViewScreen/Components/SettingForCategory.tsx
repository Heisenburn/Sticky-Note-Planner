import { PREDEFINED_CATEGORIES_KEY_SUFFIX } from '../../../Shared/constants'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { ListViewScreenProps } from '../../../types/types'

export const SettingForCategory = ({
    route,
    navigation,
}: ListViewScreenProps) => {
    const { passedPropsFromPreviousScreen } = route.params
    const { categoryTitle, categoryId } = passedPropsFromPreviousScreen

    const shouldNotDisplayCategoryOptions = categoryId.includes(
        PREDEFINED_CATEGORIES_KEY_SUFFIX
    )

    if (shouldNotDisplayCategoryOptions) {
        return null
    }
    return (
        <MaterialIcons
            name="settings"
            size={24}
            color="black"
            onPress={() => {
                navigation.navigate('SettingsScreen', {
                    passedPropsFromPreviousScreen: {
                        category: {
                            categoryTitle,
                            categoryId,
                        },
                    },
                })
            }}
        />
    )
}
