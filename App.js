import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Text, FlatList,
} from "react-native";


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];


const Item = ({ title }) => (
    <View style={styles.container}>
      <Pressable
          style={styles.categoryButton}
          onPress={() => Alert.alert("test")}
      >
        <Text style={styles.heading}>{title}</Text>
        <Text style={[styles.numberOfElements, styles.boxShadow]}>23</Text>
      </Pressable>
    </View>
);

export default function App() {

  const renderItem = ({ item }) => <Item title={item.title}  keyExtractor={item => item.id} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
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
    backgroundColor: "orange",
    borderRadius: 55,
    borderWidth: 8,
    borderColor: "white",
    padding: 70,
  },
});
