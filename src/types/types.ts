import { ACTIONS } from '../Shared/constants'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type ItemInCategoryType = {
    note: string
    id: string
    checked: boolean
}

export type CategoryWithNotesType = {
    categoryId: string
    details: {
        categoryTitle: string
        items: ItemInCategoryType[]
    }
}

export type StackParamList = {
    HomeScreen: undefined
    AddScreen: {
        passedPropsFromPreviousScreen: {
            category?: {
                categoryId: string
                categoryTitle: string
            }
            noteToBeEdited?: ItemInCategoryType
            action: keyof typeof ACTIONS
            triggeredFromHomeScreen?: boolean
        }
    }
    ListViewScreen: {
        passedPropsFromPreviousScreen: {
            categoryId: string
            categoryTitle: string
        }
    }
    SettingsScreen: {
        passedPropsFromPreviousScreen: {
            category: {
                categoryId: string
                categoryTitle: string
            }
        }
    }
}

export type HomeScreenProps = NativeStackScreenProps<
    StackParamList,
    'HomeScreen'
>
export type AddScreenProps = NativeStackScreenProps<StackParamList, 'AddScreen'>
export type ListViewScreenProps = NativeStackScreenProps<
    StackParamList,
    'ListViewScreen'
>
export type SettingsScreenProps = NativeStackScreenProps<
    StackParamList,
    'SettingsScreen'
>
