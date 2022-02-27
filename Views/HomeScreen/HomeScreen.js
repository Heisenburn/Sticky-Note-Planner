import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "s Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "d Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145asas571e29d72",
    title: "Forth Item",
  },
  {
    id: "58694asdsda0f-3da1-471f-bd96-145asas571e29d72",
    title: "Fifth Item",
  },
];

const ListItem = ({ title }) => (
  <View style={styles.container}>
    <Pressable
      style={[styles.categoryButton, { backgroundColor: generateColor() }]}
      onPress={() => Alert.alert("test")}
    >
      <Text style={styles.heading}>{title}</Text>
      <Text style={[styles.numberOfElements, styles.boxShadow]}>23</Text>
    </Pressable>
  </View>
);

const AddButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={[styles.addButtonContainer, styles.boxShadow]}
      onPress={() => navigation.navigate("AddScreen")}
    >
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
};

// https://github.com/santomegonzalo/react-native-floating-action

const actions = [
  {
    text: "Notatka",
    name: "AddScreen",
    position: 1,
  },
  {
    text: "Kategoria",
    name: "bt_language",
    position: 2,
  },
  {
    text: "Hashtag",
    name: "bt_room",
    position: 3,
  },
];

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <ListItem title={item.title} keyExtractor={(item) => item.id} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} />
      {/* <AddButton navigation={navigation} /> */}
      <FloatingAction
        actions={actions}
        onPressItem={(name) => navigation.navigate(name)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "black",
    alignItems: "stretch",
  },
  heading: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  boxShadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  numberOfElements: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
    paddingTop: 20,
    textAlign: "center",
  },
  categoryButton: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 55,
    borderWidth: 8,
    borderColor: "white",
    padding: 70,
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 50,
  },
  addButtonContainer: {
    position: "absolute",
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "orange",
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 30,
    elevation: 8,
  },
  addButtonText: {
    fontSize: 50,
    color: "white",
  },
});
