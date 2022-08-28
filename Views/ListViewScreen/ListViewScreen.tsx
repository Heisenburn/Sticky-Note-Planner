import { useState, useEffect, useRef, useCallback } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Platform,
    UIManager,
    Button,
} from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import SwipeableItem, {
    useSwipeableItemParams,
    OpenDirection,
} from 'react-native-swipeable-item'
import DraggableFlatList, {
    ScaleDecorator,
} from 'react-native-draggable-flatlist'
import getData from '../../LocalStorage/getData'
import styles from './ListViewScreen.style'
import withSaveAreaView from '../../shared/HoC/WithSaveAreaView'

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)
}

const OVERSWIPE_DIST = 20
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
        getData(category).then((response) => {
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
                    // onDragEnd={({ data }) => setData(data)}
                    activationDistance={20}
                />
            </View>
            <View style={styles.buttonCommonStyles}>
                <Button
                    title="Powrót"
                    onPress={() => navigation.navigate('HomeScreen')}
                />
            </View>
        </>
    )
}

const RowItem = ({ item, itemRefs, drag }) => {
    return (
        <ScaleDecorator>
            <SwipeableItem
                key={item.key}
                item={item}
                ref={(ref) => {
                    if (ref && !itemRefs.current.get(item.key)) {
                        itemRefs.current.set(item.key, ref)
                    }
                }}
                onChange={({ openDirection }) => {
                    if (openDirection !== OpenDirection.NONE) {
                        // Close all other open items
                        ;[...itemRefs.current.entries()].forEach(
                            ([key, ref]) => {
                                if (key !== item.key && ref) ref.close()
                            }
                        )
                    }
                }}
                overSwipe={OVERSWIPE_DIST}
                renderUnderlayLeft={() => <UnderlayLeft drag={drag} />}
                renderUnderlayRight={() => <UnderlayRight />}
                snapPointsLeft={[50, 150, 175]}
                snapPointsRight={[175]}
            >
                <View
                    style={[
                        styles.row,
                        {
                            backgroundColor: item.backgroundColor,
                            height: item.height,
                        },
                    ]}
                >
                    <TouchableOpacity onPressIn={drag}>
                        <Text style={styles.text}>{item.text}</Text>
                    </TouchableOpacity>
                </View>
            </SwipeableItem>
        </ScaleDecorator>
    )
}

const UnderlayLeft = ({ drag }) => {
    const { percentOpen } = useSwipeableItemParams()
    const animStyle = useAnimatedStyle(
        () => ({
            opacity: percentOpen.value,
        }),
        [percentOpen]
    )

    return (
        <Animated.View
            style={[styles.row, styles.underlayLeft, animStyle]} // Fade in on open
        >
            <TouchableOpacity onPressIn={drag}>
                <Text style={styles.text}>{`[drag]`}</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

const UnderlayRight = () => {
    const { close } = useSwipeableItemParams()
    return (
        <Animated.View style={[styles.row, styles.underlayRight]}>
            <TouchableOpacity onPressOut={close}>
                <Text style={styles.text}>CLOSE</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default ListViewScreenBase
