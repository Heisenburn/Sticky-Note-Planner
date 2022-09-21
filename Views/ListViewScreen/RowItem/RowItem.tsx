import { ScaleDecorator } from 'react-native-draggable-flatlist'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import styles from '../ListViewScreen.style'
import SwipeableItem, {
    OpenDirection,
    useSwipeableItemParams,
} from 'react-native-swipeable-item'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { RowItemStyles } from './RowItem.style'
import { ACTIONS } from '../../../Shared/constants'

const OVERSWIPE_DIST = 20

const RowItem = ({
    item,
    itemRefs,
    drag,
    removeItem,
    navigation,
    categoryId,
}) => {
    const handleEditClick = () => {
        navigation.navigate('AddScreen', {
            passedPropsFromPreviousScreen: {
                category: {
                    categoryId,
                },
                editedItem: item,
                action: ACTIONS.EDIT_NOTE,
            },
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
                onChange={({ openDirection, snapPoint }) => {
                    if (openDirection !== OpenDirection.NONE) {
                        // Close all other open items
                        ;[...itemRefs.current.entries()].forEach(
                            ([key, ref]) => {
                                if (key !== item.key && ref) ref.close()
                            }
                        )
                    }
                    const shouldRemoveElement =
                        openDirection === OpenDirection.LEFT &&
                        snapPoint === 175
                    if (shouldRemoveElement) {
                        removeItem(item.id)
                    }
                }}
                overSwipe={OVERSWIPE_DIST}
                renderUnderlayLeft={() => <UnderlayLeft />}
                renderUnderlayRight={() => <UnderlayRight />}
                snapPointsLeft={[50, 150, 175]}
                snapPointsRight={[175]}
            >
                <View
                    style={[
                        styles.row,
                        {
                            backgroundColor: item.backgroundColor,
                            display: 'flex',
                            justifyContent: 'space-between',
                        },
                    ]}
                >
                    <TouchableOpacity>
                        <Text style={styles.text} numberOfLines={2}>
                            {item.text}
                        </Text>
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

const UnderlayLeft = () => {
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
            <TouchableOpacity>
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
