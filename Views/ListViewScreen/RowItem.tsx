import { ScaleDecorator } from 'react-native-draggable-flatlist'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './ListViewScreen.style'
import SwipeableItem, {
    useSwipeableItemParams,
    OpenDirection,
} from 'react-native-swipeable-item'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

const OVERSWIPE_DIST = 20

const RowItem = ({ item, itemRefs, drag, removeItem }) => {
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
                        <Text
                            style={[
                                styles.text,
                                {
                                    fontSize: 30,
                                },
                            ]}
                        >
                            :::
                        </Text>
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
