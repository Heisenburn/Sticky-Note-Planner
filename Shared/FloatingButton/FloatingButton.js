import styles from './FloatingButton.styles'
import { FloatingAction } from 'react-native-floating-action'
import { View, Text } from 'react-native'
import { useRef } from 'react'

export const ACTIONS_NAME = {
    NOTE: 'note',
    CATEGORY: 'category',
    EDIT: 'edit',
}

const ACTIONS = [
    {
        text: ACTIONS_NAME.NOTE,
        // icon: require('./images/ic_accessibility_white.png'),
        name: ACTIONS_NAME.NOTE,
        position: 1,
    },
    {
        text: ACTIONS_NAME.CATEGORY,
        // icon: require('./images/ic_language_white.png'),
        name: ACTIONS_NAME.CATEGORY,
        position: 2,
    },
]

const FloatingButton = ({ navigation, clickedCategory = null }) => {
    const floatingButtonRef = useRef(null)

    return (
        <View style={styles.container}>
            <FloatingAction
                actions={ACTIONS}
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
                            clickedCategory,
                            action: ACTIONS_NAME.NOTE,
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
