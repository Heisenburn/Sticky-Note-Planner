import { NavigationContainer } from "@react-navigation/native";
import AddScreen from "./Views/AddScreen/AddScreen";
import HomeScreen from "./Views/HomeScreen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListViewScreen from "./Views/ListViewScreen/ListViewScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddScreen" component={AddScreen} />
        <Stack.Screen name="ListViewScreen" component={ListViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//expo start

// do draggable listy
//https://openbase.com/categories/js/most-popular-react-native-drag-and-drop-list-libraries
