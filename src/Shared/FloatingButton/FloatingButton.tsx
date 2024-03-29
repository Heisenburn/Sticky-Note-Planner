import styles from './FloatingButton.styles'
import { FloatingAction } from 'react-native-floating-action'
import { View } from 'react-native'
import React, { useRef } from 'react'
import { ACTION_PHRASES, ACTIONS, FLOATING_BUTTON_HEIGHT } from '../constants'
import { AntDesign } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from '../../types/types'

interface Props {
    navigation: NativeStackNavigationProp<
        StackParamList,
        'ListViewScreen' | 'HomeScreen',
        undefined
    >
    categoryId?: string
    categoryTitle?: string
}

const FloatingButton = ({
    navigation,
    categoryId = null,
    categoryTitle = null,
}: Props) => {
    const floatingButtonRef = useRef(null)

    return (
        <View style={styles.container}>
            <FloatingAction
                actions={[
                    {
                        text: ACTION_PHRASES[ACTIONS.ADD_NOTE],
                        icon: (
                            <AntDesign name="addfile" size={16} color="white" />
                        ),
                        name: ACTIONS.ADD_NOTE,
                    },
                    {
                        text: ACTION_PHRASES[ACTIONS.ADD_CATEGORY],
                        icon: (
                            <AntDesign
                                name="addfolder"
                                size={16}
                                color="white"
                            />
                        ),
                        name: ACTIONS.ADD_CATEGORY,
                    },
                ]}
                ref={floatingButtonRef}
                showBackground={true}
                color={'#1457EB'}
                distanceToEdge={10}
                buttonSize={FLOATING_BUTTON_HEIGHT}
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
