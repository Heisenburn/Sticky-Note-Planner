import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import saveNoteOrCategory, {
    getAllKeys,
} from '../AsyncStorage/saveNoteOrCategory'
import { CATEGORY_KEY_PREFIX } from '../Shared/constants'
import setNotesInCategory from '../AsyncStorage/setNotesInCategory'

type CategoriesWithNotesType = {
    categoryId: string
    items: {
        categoryTitle: string
        items: string[]
    }
}

interface Props {
    updateData: (newState: CategoriesWithNotesType[]) => void
    getData: () => CategoriesWithNotesType[]
}

export const CategoriesWithNotesContext = createContext<Props>({
    updateData: () => undefined,
    getData: (): CategoriesWithNotesType[] => undefined,
})

export const CategoriesWithNotesContextProvider = ({ children }) => {
    const [categoriesWithNotes, setCategoriesWithNotes] = useState<
        CategoriesWithNotesType[] | null
    >(null)

    const updateData = (newData: CategoriesWithNotesType[]): void => {
        setCategoriesWithNotes(newData)
    }

    const getData = (): CategoriesWithNotesType[] => categoriesWithNotes

    //each time data change
    useEffect(() => {
        // const { noteValue, categoryValue } = categoriesWithNotes
        //IIFE format - run func immediately
        // ;(async () => {
        //     await saveNoteOrCategory({
        //         noteValue,
        //         categoryValue,
        //     })
        // })()
    }, [categoriesWithNotes])

    useEffect(() => {
        //IIFE format - run func immediately
        ;(async () => {
            //get all available keys in AsyncStorage
            const availableKeys = await AsyncStorage.getAllKeys()
            //get only keys with category prefix
            const keysWithCategoryKeyword = availableKeys.filter((item) =>
                item.includes(CATEGORY_KEY_PREFIX)
            )
            //get values of the category keys
            const data = await AsyncStorage.multiGet(keysWithCategoryKeyword)
            const mappedData = data.map((item) => {
                return {
                    categoryTitle: item[0],
                    items: JSON.parse(item[1]),
                }
            })
            console.log(mappedData)
            //update state
            // setCategoriesWithNotes(data)
        })()
    }, [])

    return (
        <CategoriesWithNotesContext.Provider value={{ updateData, getData }}>
            {children}
        </CategoriesWithNotesContext.Provider>
    )
}
