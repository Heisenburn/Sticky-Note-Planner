import { NavigationContainer } from "@react-navigation/native";
import AddScreen from "./Views/AddScreen/AddScreen";
import HomeScreen from "./Views/HomeScreen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const renderItem = ({ item }) => (
    <ListItem title={item.title} keyExtractor={(item) => item.id} />
  );
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddScreen" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
