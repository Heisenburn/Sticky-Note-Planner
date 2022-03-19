import ListItem from "../ListItem/ListItem";
import { FlatList, View } from "react-native";
import styles from "../HomeScreen.styles";

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
    title: "Urodziny",
  },
  {
    id: "4",
    title: "Ksiazki do przeczytania",
  },
  {
    id: "5",
    title: "Filmy",
  },
];

const renderItem = ({ item }) => (
  <ListItem title={item.title} keyExtractor={(item) => item.id} />
);

const seperator = (e) => {
  return e.leadingItem.id >= 2 ? <View style={styles.separator} /> : null;
};

const CategoriesList = () => {
  return (
    <FlatList
      data={[...PREDEFINED_CATEGORIES, ...USER_CATEGORIES]}
      renderItem={renderItem}
      // ItemSeparatorComponent={(e) => seperator(e)}
    />
  );
};

export default CategoriesList;
