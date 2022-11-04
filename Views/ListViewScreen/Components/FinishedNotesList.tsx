import { FlatList } from 'react-native'
import { ItemInCategoryType } from '../../../types/types'
import React, { useContext, useState } from 'react'
import {
    Button,
    ExpandableSection,
    Text,
    TouchableOpacity,
    View,
} from 'react-native-ui-lib'
import { Entypo } from '@expo/vector-icons'
import { CategoriesWithNotesContext } from '../../../Context/CategoriesWithNotesContext'

export const FinishedNotesList = ({ data }: { data: ItemInCategoryType[] }) => {
    const [isFinishedNotesListingVisible, setIsFinishedNotesListingVisible] =
        useState(false)

    const { getData, updateData } = useContext(CategoriesWithNotesContext)
    const rootData = getData()

    const renderItem = ({ item }: { item: ItemInCategoryType }) => {
        const handleRestoringNote = () => {
            const dataWithRestoredElement = rootData.map((categoryItem) => {
                if (categoryItem.details.items.includes(item)) {
                    const itemsWithChangedCheckbox =
                        categoryItem.details.items.map((note) => {
                            if (note.id === item.id) {
                                return {
                                    ...note,
                                    checked: false,
                                }
                            }
                            return note
                        })

                    return {
                        ...categoryItem,
                        details: {
                            ...categoryItem.details,
                            items: itemsWithChangedCheckbox,
                        },
                    }
                }

                return categoryItem
            })

            updateData(dataWithRestoredElement)
        }

        const handleRemoveNote = () => {
            const dataWithoutElement = rootData.map((categoryItem) => {
                if (categoryItem.details.items.includes(item)) {
                    const itemsWithoutElement =
                        categoryItem.details.items.filter(
                            (note) => note.id !== item.id
                        )

                    return {
                        ...categoryItem,
                        details: {
                            ...categoryItem.details,
                            items: itemsWithoutElement,
                        },
                    }
                }
                return categoryItem
            })

            updateData(dataWithoutElement)
        }

        return (
            <TouchableOpacity
                style={{
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderColor: '#d4d4d4bf',
                    minHeight: 60,
                }}
                centerV
                paddingH-10
            >
                <View flex row spread centerV>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Text
                            center
                            $textDefault
                            style={{
                                maxWidth: 200,
                                textDecorationLine: 'line-through',
                            }}
                        >
                            {item.note}
                        </Text>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignSelf: 'flex-end',
                            }}
                        >
                            <Button onPress={() => handleRestoringNote()}>
                                <Text>Przywróc</Text>
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: 'red',
                                }}
                                onPress={() => handleRemoveNote()}
                            >
                                <Text>Usuń</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <ExpandableSection
                top={true}
                expanded={isFinishedNotesListingVisible}
                sectionHeader={
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                    >
                        <Text blue10 text60>
                            {isFinishedNotesListingVisible
                                ? 'Ukryj'
                                : 'Zobacz ukończone'}
                        </Text>
                        <Entypo name="chevron-down" size={24} color="black" />
                    </View>
                }
                onPress={() =>
                    setIsFinishedNotesListingVisible((prevState) => !prevState)
                }
            />
            {isFinishedNotesListingVisible ? (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            ) : null}
        </>
    )
}
