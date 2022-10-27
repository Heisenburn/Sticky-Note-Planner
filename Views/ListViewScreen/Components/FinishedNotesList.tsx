import { FlatList } from 'react-native'
import { ItemInCategoryType } from '../../../types/types'
import React, { useState } from 'react'
import {
    Button,
    ExpandableSection,
    Text,
    TouchableOpacity,
    View,
} from 'react-native-ui-lib'
import { Entypo } from '@expo/vector-icons'

export const FinishedNotesList = ({ data }: { data: ItemInCategoryType[] }) => {
    const [isFinishedNotesListingVisible, setIsFinishedNotesListingVisible] =
        useState(false)

    const renderItem = ({ item }: { item: ItemInCategoryType }) => (
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
                        <Button>
                            <Text>Przywróc</Text>
                        </Button>
                        <Button
                            style={{
                                backgroundColor: 'red',
                            }}
                        >
                            <Text>Usuń</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )

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
