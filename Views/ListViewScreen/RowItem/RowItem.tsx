import { ScaleDecorator } from 'react-native-draggable-flatlist'
import { Button, Pressable, Text, TouchableOpacity, View } from 'react-native'
import styles from '../ListViewScreen.style'
import SwipeableItem, {
    useSwipeableItemParams,
    OpenDirection,
} from 'react-native-swipeable-item'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { RowItemStyles } from './RowItem.style'

const OVERSWIPE_DIST = 20

const RowItem = ({
    item,
    itemRefs,
    drag,
    removeItem,
    navigation,
    category,
    listItems,
}) => {
    const handleEditClick = () => {
        navigation.navigate('AddScreen', {
            clickedCategory: category,
            editedItem: item,
            listItems,
        })
    }

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
                renderUnderlayLeft={() => (
                    <UnderlayLeft removeItem={removeItem} />
                )}
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
                            display: 'flex',
                            justifyContent: 'space-between',
                        },
                    ]}
                >
                    <TouchableOpacity>
                        <Text style={styles.text}>{item.text}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onLongPress={drag}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: 85,
                            }}
                        >
                            <Pressable onPress={handleEditClick}>
                                <Text style={RowItemStyles.editButton}>
                                    EDIT
                                </Text>
                            </Pressable>

                            <Text
                                style={[styles.text, RowItemStyles.dragButton]}
                            >
                                :::
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SwipeableItem>
        </ScaleDecorator>
    )
}

const UnderlayLeft = ({ removeItem }) => {
    const { percentOpen, item } = useSwipeableItemParams()
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
            <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Text style={styles.text}>DELETE</Text>
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

export default RowItem
