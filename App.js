import { NavigationContainer } from "@react-navigation/native";
import AddScreen from "./Views/AddScreen/AddScreen";
import HomeScreen from "./Views/HomeScreen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//expo start

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
