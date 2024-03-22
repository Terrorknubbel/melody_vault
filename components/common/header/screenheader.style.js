import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension
  }),
});

export default styles;
