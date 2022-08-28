import { useState, useEffect, useRef, useCallback } from 'react'
import { View, Platform, UIManager, Button } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import getLocalData from '../../LocalStorage/getNotesForCategory'
import styles from './ListViewScreen.style'
import RowItem from './RowItem'
import removeFromLocalCategory from '../../LocalStorage/removeFromLocalCategory'
import FloatingButton from '../HomeScreen/FloatingButton/FloatingButton'

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)
}

const NUM_ITEMS = 20

const getColor = (i) => {
    const multiplier = 255 / (NUM_ITEMS - 1)
    const colorVal = i * multiplier
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
}

const ListViewScreenBase = ({ route, navigation }) => {
    const [listItems, setListItems] = useState([])
    const { itemId: category } = route.params

    const removeItem = async (idToBeRemoved) => {
        const filteredItems = listItems.filter(
            (item) => item.id !== idToBeRemoved
        )
        await removeFromLocalCategory(category.toString(), filteredItems)
        setListItems(filteredItems)
    }

    useEffect(() => {
        getLocalData(category).then((response) => {
            if (response) {
                const mappedData = response.map(({ text, id }, index) => {
                    const backgroundColor = getColor(index)
                    return {
                        id,
                        text: text,
                        //TODO: key mozna zastapic id?
                        key: `key-${backgroundColor}`,
                        backgroundColor,
                        height: 100,
                    }
                })
                setListItems(mappedData)
            }
        })
    }, [])

    const itemRefs = useRef(new Map())

    const renderItem = useCallback((params) => {
        return (
            <RowItem {...params} itemRefs={itemRefs} removeItem={removeItem} />
        )
    }, [])

    return (
        <>
            <View style={styles.container}>
                <DraggableFlatList
                    keyExtractor={(item) => item.key}
                    data={listItems}
                    renderItem={renderItem}
                    //TODO: tutaj update kolejnosci
                    // onDragEnd={({ data }) => saveNoteToCategory(data)}
                    activationDistance={20}
                />
            </View>
            <Button
                title="Powrót"
                onPress={() => navigation.navigate('HomeScreen')}
            />
            <FloatingButton
                navigation={navigation}
                clickedCategory={category}
            />
        </>
    )
}

export default ListViewScreenBase