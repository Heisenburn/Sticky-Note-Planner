import { NavigationContainer } from '@react-navigation/native'
import AddScreen from './Views/AddScreen/AddScreen'
import HomeScreen from './Views/HomeScreen/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListViewScreen from './Views/ListViewScreen/ListViewScreen'
import { CategoriesWithNotesContextProvider } from './Context/CategoriesWithNotesContext'
import { SafeAreaView } from 'react-native'
import SettingsScreen from './Views/SettingsScreen/SettingsScreen'
import { loadDemoConfigurations } from './configuration'
import * as SplashScreen from 'expo-splash-screen'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import { cacheFonts } from './Shared/helpers'
import type { StackParamList } from './types/types'
import { SettingForCategory } from './Views/ListViewScreen/Components/SettingForCategory'

loadDemoConfigurations()
const Stack = createNativeStackNavigator<StackParamList>()

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

        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(async () => {
            await loadResourcesAndDataAsync()
        })()
    }, [])

    return appIsReady ? (
        <CategoriesWithNotesContextProvider>
            <NavigationContainer>
                <SafeAreaView
                    style={{
                        flex: 1,
                    }}
                >
                    <Stack.Navigator>
                        <Stack.Screen
                            name="HomeScreen"
                            component={HomeScreen}
                            options={{
                                // title: 'Kategorie',
                                // headerSearchBarOptions: {
                                //     placeholder:
                                //         'Wpisz nazwe kategorii lub treść notatki',
                                // },
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="AddScreen"
                            component={AddScreen}
                            options={{ title: '' }}
                        />
                        <Stack.Screen
                            name="ListViewScreen"
                            component={ListViewScreen}
                            options={({ route, navigation }) => {
                                const { passedPropsFromPreviousScreen } =
                                    route.params
                                const { categoryTitle } =
                                    passedPropsFromPreviousScreen

                                return {
                                    title: categoryTitle,
                                    // headerSearchBarOptions: {
                                    //     placeholder: 'Wpisz treść notatki',
                                    // },
                                    headerRight: () => (
                                        <SettingForCategory
                                            route={route}
                                            navigation={navigation}
                                        />
                                    ),
                                }
                            }}
                        />
                        <Stack.Screen
                            name="SettingsScreen"
                            component={SettingsScreen}
                            options={{
                                title: 'Ustawienia',
                            }}
                        />
                    </Stack.Navigator>
                </SafeAreaView>
            </NavigationContainer>
        </CategoriesWithNotesContextProvider>
    ) : null
}
