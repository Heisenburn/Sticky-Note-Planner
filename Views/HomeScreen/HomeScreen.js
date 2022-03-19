import { SafeAreaView } from "react-native";
import CategoriesList from "./Categories/CategoriesList";
import FloatingButton from "./FloatingButton/FloatingButton";
import styles from "./HomeScreen.styles";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        <CategoriesList/>
        <FloatingButton navigation={navigation}/>
    </SafeAreaView>
  );
}
