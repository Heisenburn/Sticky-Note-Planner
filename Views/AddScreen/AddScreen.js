import { View, Text, SafeAreaView, Button } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const AddScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Test</Text>
        <Button title="back" onPress={() => navigation.navigate("HomeScreen")}>
          <Text>Back</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddScreen;
