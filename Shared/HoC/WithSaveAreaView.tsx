import { SafeAreaView } from 'react-native-safe-area-context'
import { ComponentType } from 'react'

const withSaveAreaView = (Component: ComponentType) => (props) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'space-between',
            }}
        >
            <Component {...props} />
        </SafeAreaView>
    )
}

export default withSaveAreaView
