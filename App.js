import { NavigationContainer } from '@react-navigation/native'
import AddScreen from './Views/AddScreen/AddScreen'
import HomeScreen from './Views/HomeScreen/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListViewScreen from './Views/ListViewScreen/ListViewScreen'
import { CategoriesWithNotesContextProvider } from './Context/CategoriesWithNotesContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import SettingsScreen from './Views/SettingsScreen/SettingsScreen'
import { loadDemoConfigurations } from './configuration'

loadDemoConfigurations()
const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <CategoriesWithNotesContextProvider>
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
            >
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen
                            name="HomeScreen"
                            component={HomeScreen}
                        />
                        <Stack.Screen name="AddScreen" component={AddScreen} />
                        <Stack.Screen
                            name="ListViewScreen"
                            component={ListViewScreen}
                        />
                        <Stack.Screen
                            name="SettingsScreen"
                            component={SettingsScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </CategoriesWithNotesContextProvider>
    )
}
