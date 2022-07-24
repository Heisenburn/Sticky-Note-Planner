import { Text, SafeAreaView, TextInput, View, Pressable } from "react-native";
import Toast from "react-native-toast-message";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./AddScreen.styles";
import {PREDEFINED_CATEGORIES, USER_CATEGORIES} from "../../shared/constants";
import Autocomplete from 'react-native-autocomplete-input';

const storeData = async (value, category) => {
  try {
    await AsyncStorage.setItem("1", value);
  } catch (e) {
    // saving error
  }
};

//mozna tez obiekt zapisywac https://react-native-async-storage.github.io/async-storage/docs/usage

const AddScreen = ({ navigation }) => {
  const [noteInput, setNoteInput] = useState("");
  const [controlledAutocomplete, setControlledAutocomplete] = useState("");

  const handleSubmit = () => {
    Toast.show({
      type: "success",
      text1: "pomyślnie zapisano notatkę",
      text2: `o treści ${noteInput} 👋`,
    });
    // storeData(noteInput, categoryInput);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Dodawanie notatki</Text>
        <TextInput
          multiline={true}
          placeholder="Treść notatki..."
          onChangeText={(value) => setNoteInput(value)}
          style={styles.noteInput}
        />
        <Pressable
          title="Submit"
          onPress={handleSubmit}
          style={[styles.buttonCommonStyles, styles.saveButton]}
        >
          <Text>Zapisz</Text>
        </Pressable>


        {/*<TextInput*/}
        {/*  style={[styles.categoryInput, styles.buttonCommonStyles]}*/}
        {/*  onChangeText={(value) => setCategoryInput(value)}*/}
        {/*  value={categoryInput}*/}
        {/*  placeholder="Provide category..."*/}
        {/*  placeholderTextColor="gray"*/}
        {/*/>*/}

                 <Autocomplete
              data={[...PREDEFINED_CATEGORIES, ...USER_CATEGORIES]}
              value={controlledAutocomplete}
              onChangeText={(text) => setControlledAutocomplete(text)}
              placeholder="Provide category..."
              flatListProps={{
                keyExtractor: (_, idx) => idx,
                renderItem: ({ item }) => <Text>{item}</Text>,
              }}
          />

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
