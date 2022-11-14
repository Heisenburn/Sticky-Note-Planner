import { createContext, useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { CategoryWithNotesType } from '../types/types'
import { getKeysForExistingCategories } from '../AsyncStorage/getKeysForExistingCategories'
import { removeMultipleAsyncStorageElements } from '../AsyncStorage/removeMultipleAsyncStorageElements'
import { Alert } from 'react-native'
import { PREDEFINED_CATEGORIES_KEY_SUFFIX } from '../Shared/constants'
import { setPredefinedCategories } from './helpers'
import type { CategoryWithNotesContextProps } from './types'

export const CategoriesWithNotesContext =
    createContext<CategoryWithNotesContextProps>({
        updateData: () => undefined,
        getData: (): CategoryWithNotesType[] => undefined,
    })

export const CategoriesWithNotesContextProvider = ({
    children,
}: {
    children: JSX.Element
}) => {
    const [categoriesWithNotes, setCategoriesWithNotes] = useState<
        CategoryWithNotesType[] | null
    >(null)

    const updateData = useCallback((newData: CategoryWithNotesType[]): void => {
        setCategoriesWithNotes(newData)
    }, [])

    const getData = (): CategoryWithNotesType[] => categoriesWithNotes

    useEffect(() => {
        if (categoriesWithNotes?.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-extra-semi
            ;(async () => {
                //first remove old data
                const arrayOfCategories = await getKeysForExistingCategories()
                await removeMultipleAsyncStorageElements(arrayOfCategories)

                // then save new data
                if (categoriesWithNotes.length > 0) {
                    try {
                        await AsyncStorage.multiSet(
                            categoriesWithNotes.map((item) => [
                                item.categoryId,
                                JSON.stringify(item),
                            ])
                        )
                    } catch (error) {
                        Alert.alert(`error: ${error}`)
                        throw error
                    }
                }
            })()
        }
    }, [categoriesWithNotes])

    //get initial data
    useEffect(() => {
        //IIFE format to avoid adding async to useEffect
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(async () => {
            //add predefined categories
            const keysWithCategoryKeyword = await AsyncStorage.getAllKeys()
            const arePredefinedCategoriesAdded = keysWithCategoryKeyword.some(
                (item) => item.includes(PREDEFINED_CATEGORIES_KEY_SUFFIX)
            )

            if (!arePredefinedCategoriesAdded) {
                await setPredefinedCategories()
            }
            const data = await AsyncStorage.multiGet(keysWithCategoryKeyword)
            const mappedData = data.map((item) => JSON.parse(item[1]))

            //update state
            setCategoriesWithNotes(mappedData)
        })()
    }, [])

    return (
        <CategoriesWithNotesContext.Provider value={{ updateData, getData }}>
            {children}
        </CategoriesWithNotesContext.Provider>
    )
}
