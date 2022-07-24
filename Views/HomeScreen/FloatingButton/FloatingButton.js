import { View, Pressable, Text } from "react-native";
import styles from "./FloatingButton.styles";

const FloatingButton = ({ navigation }) => {
  return (
    <View style={[styles.container, styles.boxShadow]}>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("AddScreen");
        }}
      >
        <Text style={styles.numberOfElements}>+</Text>
      </Pressable>
    </View>
  );
};

export default FloatingButton;
