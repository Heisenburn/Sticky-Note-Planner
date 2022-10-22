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
