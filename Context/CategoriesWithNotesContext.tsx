import { createContext, useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CategoryWithNotesType } from '../types/types'
import { getKeysForExistingCategories } from './helpers/getKeysForExistingCategories'
import { removeMultipleAsyncStorageElements } from '../AsyncStorage/removeMultipleAsyncStorageElements'
import { Alert } from 'react-native'
import setAsyncStorageValue from '../AsyncStorage/setAsyncStorageValue'

interface Props {
    updateData: (newState: CategoryWithNotesType[]) => void
    getData: () => CategoryWithNotesType[]
}

export const CategoriesWithNotesContext = createContext<Props>({
    updateData: () => undefined,
    getData: (): CategoryWithNotesType[] => undefined,
})

export const CategoriesWithNotesContextProvider = ({ children }) => {
    const [categoriesWithNotes, setCategoriesWithNotes] = useState<
        CategoryWithNotesType[] | null
    >(null)

    const updateData = (newData: CategoryWithNotesType[]): void => {
        setCategoriesWithNotes(newData)
    }

    const getData = (): CategoryWithNotesType[] => categoriesWithNotes

    useEffect(() => {
        if (categoriesWithNotes) {
            ;(async () => {
                //first remove old data
                // const arrayOfCategories = await getKeysForExistingCategories()
                //
                // await removeMultipleAsyncStorageElements(arrayOfCategories)

                // then save new data
                const mappedData = categoriesWithNotes.map((item) => {
                    return [item.categoryId, JSON.stringify(item)]
                })

                // const test = categoriesWithNotes.map((item) => {
                //     return [item.categoryId, item]
                // })
                //
                console.log({ categoriesWithNotes })

                if (categoriesWithNotes.length > 0) {
                    // for (const item of categoriesWithNotes) {
                    //     const key = item.categoryId
                    //     const value = item
                    //     await setAsyncStorageValue(key, value)
                    // }

                    try {
                        await AsyncStorage.multiSet(mappedData)
                    } catch (e) {
                        //save error
                    }
                }
            })()
        }
    }, [categoriesWithNotes])

    //get initial data
    useEffect(() => {
        //TODO: tutaj można byłoby odpalać dodawać PREDEFINED_CATEGORIES
        //IIFE format to avoid adding async to useEffect
        ;(async () => {
            const keysWithCategoryKeyword = await getKeysForExistingCategories()
            //get values of the category keys
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
