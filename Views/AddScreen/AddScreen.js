import { Text, SafeAreaView, TextInput, View, Pressable } from "react-native";
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
  const [name, setName] = useState("");

  const handleSubmit = () => {
    storeData(name);
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
          onChangeText={(value) => setName(value)}
          style={styles.textInput}
        />

        <Pressable
          title="Submit"
          onPress={handleSubmit}
          style={[styles.buttonCommonStyles, styles.saveButton]}
        >
          <Text>Submit</Text>
        </Pressable>

        <Pressable
          title="back"
          onPress={() => navigation.navigate("HomeScreen")}
          style={[styles.buttonCommonStyles, styles.backButton]}
        >
          <Text>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddScreen;
