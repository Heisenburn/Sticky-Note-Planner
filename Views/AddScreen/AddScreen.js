import { Text, SafeAreaView, Button, TextInput } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    <SafeAreaView>
      <Text>Tytul</Text>
      <TextInput
        multiline={true}
        placeholder="John Doe"
        onChangeText={(value) => setName(value)}
      />

      <Button title="Submit" onPress={handleSubmit}>
        Submit
      </Button>

      <Button title="back" onPress={() => navigation.navigate("HomeScreen")}>
        <Text>Back</Text>
      </Button>
    </SafeAreaView>
  );
};

export default AddScreen;
