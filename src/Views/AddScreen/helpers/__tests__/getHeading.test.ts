import { getHeading } from '../helpers'
import { ACTION_PHRASES, ACTIONS } from '../../../../Shared/constants'

describe('getHeading function', () => {
    describe('should build properely a heading for', () => {
        it('adding category', () => {
            const expectedPhrase = ACTION_PHRASES[ACTIONS.ADD_CATEGORY]
            const buildPhrase = getHeading(ACTIONS.ADD_CATEGORY)

            expect(buildPhrase).toBe(expectedPhrase)
        })
        it('adding note', () => {
            const categoryTitle = 'MojeNotatki'
            const expectedPhrase = `${
                ACTION_PHRASES[ACTIONS.ADD_NOTE]
            } w kategorii: ${categoryTitle}`
            const buildPhrase = getHeading(ACTIONS.ADD_NOTE, categoryTitle)

            expect(buildPhrase).toBe(expectedPhrase)
        })
        it('editing note', () => {
            const expectedPhrase = ACTION_PHRASES[ACTIONS.EDIT_NOTE]
            const buildPhrase = getHeading(ACTIONS.EDIT_NOTE)

            expect(buildPhrase).toBe(expectedPhrase)
        })
    })
})
