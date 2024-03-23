import { StyleSheet } from "react-native";

import { COLORS } from "../../../constants";

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: 5,
    padding: 25,
    alignItems: 'center',
    position: 'absolute',
    right: 25,
    bottom: 90,
    flex: 1,
    gap: 25,
  },
  centeredView: {
    flex: 1,
  }
});

export default styles;
