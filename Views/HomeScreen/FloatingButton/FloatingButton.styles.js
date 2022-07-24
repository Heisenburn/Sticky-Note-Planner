import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 55,
    backgroundColor: "#6638f0",
    borderColor: "#6638f0",
    width: 100,
    height: 100,
    zIndex: 300, // works on ios
    elevation: 300, // works on android
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  numberOfElements: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
  },
  boxShadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default styles;
