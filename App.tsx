import { NavigationContainer } from '@react-navigation/native'
import AddScreen from './Views/AddScreen/AddScreen'
import HomeScreen from './Views/HomeScreen/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListViewScreen from './Views/ListViewScreen/ListViewScreen'
import { CategoriesWithNotesContextProvider } from './Context/CategoriesWithNotesContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import SettingsScreen from './Views/SettingsScreen/SettingsScreen'
import { loadDemoConfigurations } from './configuration'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useEffect, useState } from 'react'

const cacheFonts = (
    fonts: { [x: string]: any }[] | (string | Record<string, Font.FontSource>)[]
) => {
    return fonts.map((font: string | Record<string, Font.FontSource>) =>
        Font.loadAsync(font)
    )
}

loadDemoConfigurations()
const Stack = createNativeStackNavigator()

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false)

    // Load any resources or data that you need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await SplashScreen.preventAutoHideAsync()
                cacheFonts([FontAwesome.font])
            } catch (e) {
                // You might want to provide this error information to an error reporting service
                console.warn(e)
            } finally {
                setAppIsReady(true)
                await SplashScreen.hideAsync()
            }
        }

        ;(async () => {
            await loadResourcesAndDataAsync()
        })()
    }, [])

    return appIsReady ? (
        <CategoriesWithNotesContextProvider>
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
            >
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="HomeScreen"
                            component={HomeScreen}
                            options={{ title: 'Kategorie' }}
                        />
                        <Stack.Screen
                            name="AddScreen"
                            component={AddScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ListViewScreen"
                            component={ListViewScreen}
                            options={({ route }) => ({
                                title:
                                    route.params.passedPropsFromPreviousScreen
                                        .categoryTitle || '',
                            })}
                        />
                        <Stack.Screen
                            name="SettingsScreen"
                            component={SettingsScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </CategoriesWithNotesContextProvider>
    ) : null
}
