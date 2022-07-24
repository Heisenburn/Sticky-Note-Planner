import { SafeAreaView } from "react-native";
import { View, Text } from "react-native";
import styles from "./ListViewScreen.style";

//Deprecated asyncstorage
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("1");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

export default function ListViewScreen({ route }) {
  const { itemId } = route.params;
  getData().then((value) => {
    console.log("from listViewScreen: ", value);
  });
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
      </View>
    </SafeAreaView>
  );
}
