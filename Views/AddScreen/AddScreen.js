import { Text, SafeAreaView, TextInput, View, Pressable } from "react-native";
import Toast from "react-native-toast-message";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./AddScreen.styles";

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("@storage_Key", value);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@storage_Key");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

//mozna tez obiekt zapisywac https://react-native-async-storage.github.io/async-storage/docs/usage

const AddScreen = ({ navigation }) => {
  const [noteValue, setNoteValue] = useState("");

  const handleSubmit = () => {
    Toast.show({
      type: "success",
      text1: "pomyślnie zapisano notatkę",
      text2: `o treści ${noteValue} 👋`,
    });
    storeData(noteValue);
  };

  getData().then((value) => {
    console.log(value);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Dodawanie notatki</Text>
        <TextInput
          multiline={true}
          placeholder="Treść notatki..."
          onChangeText={(value) => setNoteValue(value)}
          style={styles.textInput}
        />

        <Pressable
          title="Submit"
          onPress={handleSubmit}
          style={[styles.buttonCommonStyles, styles.saveButton]}
        >
          <Text>Zapisz</Text>
        </Pressable>

        <Pressable
          title="Submit"
          onPress={() => navigation.navigate("MoreOptions")}
          style={[styles.buttonCommonStyles, styles.optionsButton]}
        >
          <Text style={styles.optionsButtonText}>Więcej opcji</Text>
        </Pressable>

        <Pressable
          title="back"
          onPress={() => navigation.navigate("HomeScreen")}
          style={[styles.buttonCommonStyles, styles.backButton]}
        >
          <Text>Powrót</Text>
        </Pressable>
        <Toast />
      </View>
    </SafeAreaView>
  );
};

export default AddScreen;
