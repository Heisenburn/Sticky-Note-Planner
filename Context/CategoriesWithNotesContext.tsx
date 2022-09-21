import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CategoryWithNotesType } from '../types/types'
import { getKeysForExistingCategories } from '../AsyncStorage/getKeysForExistingCategories'
import { removeMultipleAsyncStorageElements } from '../AsyncStorage/removeMultipleAsyncStorageElements'
import { Alert } from 'react-native'
import {
    CATEGORY_KEY_PREFIX,
    PREDEFINED_CATEGORIES,
    PREDEFINED_CATEGORIES_KEY_SUFFIX,
} from '../Shared/constants'

const setPredefinedCategories = async () => {
    try {
        const predefinedCategoriesArray = PREDEFINED_CATEGORIES.map(
            ({ categoryTitle }) => {
                const categoryId = `${PREDEFINED_CATEGORIES_KEY_SUFFIX}-${categoryTitle}`
                const defaultCategoriesWithNotes = {
                    categoryId,
                    details: {
                        categoryTitle,
                        items: [],
                    },
                }
                return [categoryId, JSON.stringify(defaultCategoriesWithNotes)]
            }
        )

        await AsyncStorage.multiSet(predefinedCategoriesArray)
    } catch (error) {
        Alert.alert(`error: ${error}`)
        throw error
    }
}

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

    //this hook runs only at the startup of app
    //get initial data
    useEffect(() => {
        //IIFE format to avoid adding async to useEffect
        ;(async () => {
            //add predefined categories
            const keysWithCategoryKeyword = await getKeysForExistingCategories()

            console.log({ keysWithCategoryKeyword })
            const arePredefinedCategoriesAdded = keysWithCategoryKeyword.some(
                (item) => item.includes(PREDEFINED_CATEGORIES_KEY_SUFFIX)
            )

            //todo: wynieść do osobnej funkcji
            if (arePredefinedCategoriesAdded === false) {
                await setPredefinedCategories()
            }
            const data = await AsyncStorage.multiGet(keysWithCategoryKeyword)
            const mappedData = data.map((item) => JSON.parse(item[1]))

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
