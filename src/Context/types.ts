import type { CategoryWithNotesType } from "../types/types"

export interface CategoryWithNotesContextProps {
    updateData: (newState: CategoryWithNotesType[]) => void
    getData: () => CategoryWithNotesType[]
}