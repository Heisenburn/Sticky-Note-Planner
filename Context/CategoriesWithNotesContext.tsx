import { createContext, useCallback, useEffect, useRef, useState } from 'react'
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

export const CategoriesWithNotesContextProvider = ({ children }) => {
    const [categoriesWithNotes, setCategoriesWithNotes] = useState<
        CategoryWithNotesType[] | null
    >(null)

    const updateData = useCallback((newData: CategoryWithNotesType[]): void => {
        setCategoriesWithNotes(newData)
    }, [])

    const getData = (): CategoryWithNotesType[] => categoriesWithNotes

    //prevent unnecessary rerenders
    const shouldRunUpdateUseEffect = useRef(false)

    useEffect(() => {
        if (
            categoriesWithNotes?.length > 0 &&
            shouldRunUpdateUseEffect.current
        ) {
            ;(async () => {
                console.log('odpala sie useEffect przy updatcie data')
                //first remove old data
                const arrayOfCategories = await getKeysForExistingCategories()
                await removeMultipleAsyncStorageElements(arrayOfCategories)

                // then save new data
                if (categoriesWithNotes.length > 0) {
                    //TODO: to wynieść do osobnej funkcji
                    try {
                        const mappedData = categoriesWithNotes.map((item) => {
                            return [item.categoryId, JSON.stringify(item)]
                        })
                        await AsyncStorage.multiSet(mappedData)
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
        ;(async () => {
            //add predefined categories
            const keysWithCategoryKeyword = await AsyncStorage.getAllKeys()
            const arePredefinedCategoriesAdded = keysWithCategoryKeyword.some(
                (item) => item.includes(PREDEFINED_CATEGORIES_KEY_SUFFIX)
            )

            //todo: wynieść do osobnej funkcji
            if (!arePredefinedCategoriesAdded) {
                await setPredefinedCategories()
            }
            const data = await AsyncStorage.multiGet(keysWithCategoryKeyword)
            const mappedData = data.map((item) => JSON.parse(item[1]))

            //update state
            setCategoriesWithNotes(mappedData)
            shouldRunUpdateUseEffect.current = true
        })()
    }, [])

    return (
        <CategoriesWithNotesContext.Provider value={{ updateData, getData }}>
            {children}
        </CategoriesWithNotesContext.Provider>
    )
}
