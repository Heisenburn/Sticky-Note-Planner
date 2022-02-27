import { SafeAreaView, FlatList } from "react-native";
import FloatingButton from "./FloatingButton/FloatingButton";
import styles from "./HomeScreen.styles";
import ListItem from "./ListItem/ListItem";

const PREDEFINED_CATEGORIES = [
  {
    id: "1",
    title: "Tydzień",
  },
  {
    id: "2",
    title: "Random",
  },
];

const USER_CATEGORIES = [
  {
    id: "3",
    title: "Third Item",
  },
  {
    id: "4",
    title: "Forth Item",
  },
  {
    id: "5",
    title: "Fifth Item",
  },
];

const renderItem = ({ item }) => (
  <ListItem title={item.title} keyExtractor={(item) => item.id} />
);

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[...PREDEFINED_CATEGORIES, ...USER_CATEGORIES]}
        renderItem={renderItem}
      />
      <FloatingButton navigation={navigation} />
    </SafeAreaView>
  );
}
