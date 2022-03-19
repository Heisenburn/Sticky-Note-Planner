import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "black",
    alignItems: "stretch",
  },
  heading: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  boxShadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  numberOfElements: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
    paddingTop: 20,
    textAlign: "center",
  },
  categoryButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 55,
    borderWidth: 8,
    borderColor: "white",
    padding: 70,
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 50,
  },
  separator: {
    borderTopColor: "white",
    borderTopWidth: 2,
    display: "flex",
    alignItems: "center",
  },
});

export default styles;
