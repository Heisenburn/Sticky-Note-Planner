import styles from './FloatingButton.styles'
import { FloatingAction } from 'react-native-floating-action'
import { View } from 'react-native'
import { useRef } from 'react'
import { ACTION_PHRASES, ACTIONS } from '../constants'

const FLOATING_BUTTON_ACTIONS = [
    {
        text: ACTION_PHRASES[ACTIONS.ADD_NOTE],
        // icon: require('./images/ic_accessibility_white.png'),
        name: ACTIONS.ADD_NOTE,
        position: 1,
    },
    {
        text: ACTION_PHRASES[ACTIONS.ADD_CATEGORY],
        // icon: require('./images/ic_language_white.png'),
        name: ACTIONS.ADD_CATEGORY,
        position: 2,
    },
]

const FloatingButton = ({ navigation, categoryId = null }) => {
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
                iconSize={100}
                onOpen={() => {
                    if (clickedCategory) {
                        floatingButtonRef.current.reset()
                        navigation.navigate('AddScreen', {
                            passedPropsFromPreviousScreen: {
                                categoryId: categoryId,
                                action: ACTIONS.ADD_NOTE,
                            },
                        })
                    }
                }}
                onPressItem={(name) => {
                    navigation.navigate('AddScreen', {
                        action: name,
                    })
                }}
            />
        </View>
    )
}

export default FloatingButton
