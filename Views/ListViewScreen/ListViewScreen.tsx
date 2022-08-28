import { useState, useEffect, useRef, useCallback } from 'react'
import { View, Platform, UIManager, Button } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import getLocalData from '../../LocalStorage/getLocalData'
import styles from './ListViewScreen.style'
import RowItem from './RowItem'

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

    useEffect(() => {
        getLocalData(category).then((response) => {
            if (response) {
                const mappedData = response.map(({ text }, index) => {
                    const backgroundColor = getColor(index)
                    return {
                        text: text,
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
        return <RowItem {...params} itemRefs={itemRefs} />
    }, [])

    return (
        <>
            <View style={styles.container}>
                <DraggableFlatList
                    keyExtractor={(item) => item.key}
                    data={listItems}
                    renderItem={renderItem}
                    //TODO: tutaj update kolejnosci
                    // onDragEnd={({ data }) => setLocalData(data)}
                    activationDistance={20}
                />
            </View>
            <Button
                title="Powrót"
                onPress={() => navigation.navigate('HomeScreen')}
            />
        </>
    )
}

export default ListViewScreenBase
