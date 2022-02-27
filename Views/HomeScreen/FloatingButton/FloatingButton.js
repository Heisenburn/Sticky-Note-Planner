import { FloatingAction } from "react-native-floating-action";

const actions = [
  {
    text: "Notatka",
    name: "AddScreen",
    position: 1,
  },
  {
    text: "Kategoria",
    name: "bt_language",
    position: 2,
  },
  {
    text: "Hashtag",
    name: "bt_room",
    position: 3,
  },
];

const FloatingButton = ({ navigation }) => {
  return (
    <FloatingAction
      buttonSize={80}
      actions={actions}
      onPressItem={(name) => navigation.navigate(name)}
    />
  );
};

export default FloatingButton;
