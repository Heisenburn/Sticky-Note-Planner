import { View, Alert, Pressable, Text } from "react-native";
import styles from "../HomeScreen.styles";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

const ListItem = ({ title }) => (
  <View style={styles.container}>
    <Pressable
      style={[styles.categoryButton, { backgroundColor: generateColor() }]}
      onPress={() => Alert.alert(title)}
    >
      <Text style={styles.heading}>{title}</Text>
      <Text style={[styles.numberOfElements, styles.boxShadow]}>23</Text>
    </Pressable>
  </View>
);

export default ListItem;
