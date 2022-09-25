import styles from './FloatingButton.styles'
import { FloatingAction, IActionProps } from 'react-native-floating-action'
import { View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { ACTION_PHRASES, ACTIONS } from '../constants'
import {
    Assets,
    Colors,
    Icon,
    Text,
    TouchableOpacity,
} from 'react-native-ui-lib'

const FLOATING_BUTTON_ACTIONS: IActionProps[] = [
    {
        text: ACTION_PHRASES[ACTIONS.ADD_NOTE],
        // icon: require('./images/ic_accessibility_white.png'),
        name: ACTIONS.ADD_NOTE,
    },
    {
        text: ACTION_PHRASES[ACTIONS.ADD_CATEGORY],
        // icon: require('./images/ic_language_white.png'),
        name: ACTIONS.ADD_CATEGORY,
    },
]

const FloatingButton = ({
    navigation,
    categoryId = null,
    categoryTitle = null,
}) => {
    const floatingButtonRef = useRef(null)

    return (
        <View style={styles.container}>
            <FloatingAction
                actions={FLOATING_BUTTON_ACTIONS}
                ref={floatingButtonRef}
                showBackground={true}
                color={'#6638f0'}
                distanceToEdge={10}
                buttonSize={100}
                //triggered from within ListViewScreen
                onOpen={() => {
                    if (categoryId) {
                        floatingButtonRef.current.reset()
                        navigation.navigate('AddScreen', {
                            passedPropsFromPreviousScreen: {
                                category: {
                                    categoryId,
                                    categoryTitle,
                                },
                                action: ACTIONS.ADD_NOTE,
                            },
                        })
                    }
                }}
                //triggered from within HomeScreen
                onPressItem={(pressedAction) => {
                    console.log({ pressedAction })
                    navigation.navigate('AddScreen', {
                        passedPropsFromPreviousScreen: {
                            action: pressedAction,
                            triggeredFromHomeScreen: true,
                        },
                    })
                }}
            />
        </View>
    )
}

export default FloatingButton

// const renderItem = useCallback(
//     ({ item, index: _index }: { item: Item; index: number }) => {
//         return (
//             <TouchableOpacity
//                 style={[styles.itemContainer]}
//                 // overriding the BG color to anything other than white will cause Android's elevation to fail
//                 // backgroundColor={Colors.red30}
//                 centerV
//                 paddingH-page
//             >
//                 <View flex row spread centerV>
//                     <Icon
//                         source={Assets.icons.demo.drag}
//                         tintColor={Colors.$iconDisabled}
//                     />
//                     <Text center $textDefault>
//                         {item.item}
//                     </Text>
//                     <Icon
//                         source={Assets.icons.demo.chevronRight}
//                         tintColor={Colors.$iconDefault}
//                     />
//                 </View>
//             </TouchableOpacity>
//         )
//     },
//     []
// )
