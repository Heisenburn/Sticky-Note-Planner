export type CategoryNotesItemsType = {
    note: string
    id: string
}

export type CategoryWithNotesType = {
    categoryId: string
    details: {
        categoryTitle: string
        items: CategoryNotesItemsType[]
    }
}
