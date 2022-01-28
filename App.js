import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Text,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Pressable
          style={styles.categoryButton}
          onPress={() => Alert.alert("test")}
        >
          <Text style={styles.heading}>TYDZIEŃ</Text>
          <Text style={[styles.numberOfElements, styles.boxShadow]}>23</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
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
