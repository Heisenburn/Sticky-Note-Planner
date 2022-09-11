import { NavigationContainer } from '@react-navigation/native'
import AddScreenBase from './Views/AddScreen/AddScreen'
import HomeScreenBase from './Views/HomeScreen/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListViewScreenBase from './Views/ListViewScreen/ListViewScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import withSaveAreaView from './Shared/HoC/WithSaveAreaView'
import { useEffect } from 'react'
import {
    CategoriesWithNotesContext,
    CategoriesWithNotesContextProvider,
} from './Context/CategoriesWithNotesContext'

const Stack = createNativeStackNavigator()

export default function App() {
    const ListViewScreen = withSaveAreaView(ListViewScreenBase)
    const HomeScreen = withSaveAreaView(HomeScreenBase)
    const AddScreen = withSaveAreaView(AddScreenBase)

    return (
        <CategoriesWithNotesContextProvider>
            <SafeAreaProvider>
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
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </CategoriesWithNotesContextProvider>
    )
}
