import { SafeAreaView } from 'react-native'
import CategoriesList from './Categories/CategoriesList'
import FloatingButton from '../../shared/FloatingButton/FloatingButton'
import styles from './HomeScreen.styles'

export default function HomeScreenBase({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <FloatingButton navigation={navigation} />
            <CategoriesList navigation={navigation} />
        </SafeAreaView>
    )
}
