import {SortableList, Text, TouchableOpacity, View} from "react-native-ui-lib";
import React, {useState} from "react";
import {Item} from "../types";
import styles from "../ListViewScreen.style";
import {CustomCheckbox} from "./Checkbox";
import {Entypo} from "@expo/vector-icons";

export const CustomSortableList = ({data}) => {
    const [listItems] = useState(data)

    const renderItem = ({
                            item,
                            index: _index,
                        }: {
        item: Item
        index: number
    }) => {
        return (
            <TouchableOpacity
                style={[styles.itemContainer]}
                centerV
                paddingH-page
            >
                <View flex row spread centerV>
                    <View flex row centerV>
                        <CustomCheckbox />
                        <Text center $textDefault style={{ maxWidth: 200 }}>
                            {item.note}
                        </Text>
                    </View>
                    <Entypo
                        name="dots-three-horizontal"
                        size={34}
                        color="black"
                        onPress={() => {
                            setIsListingItemOptionsModalVisible(true)
                            //TODO: tutaj przekazywac ID?
                            editedElement.current = item
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <SortableList
            data={listItems}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onOrderChange={onOrderChange}
            scale={1.12}
        />
    )

}