import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CategoryWithNotesType } from '../types/types'
import { getKeysForExistingCategories } from './helpers/getKeysForExistingCategories'
import { removeMultipleAsyncStorageElements } from '../AsyncStorage/removeMultipleAsyncStorageElements'
import setAsyncStorageValue from '../AsyncStorage/setAsyncStorageValue'
import { Alert } from 'react-native'

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

    //each time data change
    useEffect(() => {
        if (categoriesWithNotes) {
            ;(async () => {
                //first remove old data
                const keysWithCategoryKeyword =
                    await getKeysForExistingCategories()

                await removeMultipleAsyncStorageElements(
                    keysWithCategoryKeyword
                )
                //then save new data

                const mappedData = categoriesWithNotes.map((item) => {
                    return [item.categoryId, JSON.stringify(item)]
                })

                console.log({ mappedData })
                // if (mappedData.length > 0) {
                //     //TODO: to wynieść do osobnej funkcji
                //     try {
                //         await AsyncStorage.multiSet(mappedData)
                //     } catch (error) {
                //         Alert.alert(`error: ${error}`)
                //         throw error
                //     }
                // }
            })()
        }
    }, [categoriesWithNotes])

    //get initial data
    useEffect(() => {
        //TODO: dodać refa, który mówiłby o tym czy ma się odpalić

        //TODO: tutaj można byłoby odpalać dodawać PREDEFINED_CATEGORIES
        //IIFE format to avoid adding async to useEffect
        ;(async () => {
            const keysWithCategoryKeyword = await getKeysForExistingCategories()
            //get values of the category keys
            const data = await AsyncStorage.multiGet(keysWithCategoryKeyword)
            const mappedData = data.map((item) => {
                return {
                    categoryId: item[0],
                    details: JSON.parse(item[1]),
                }
            })
            console.log({ mappedData })
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
