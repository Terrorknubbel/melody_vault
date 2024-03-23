import { StyleSheet } from "react-native";

import { SIZES, COLORS, FONT } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.background,
    width: "30%",
    aspectRatio: 16/8,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  defaultText: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.white
  },
  plus: {
    color: COLORS.white,
    fontSize: SIZES.xLarge
  }
});

export default styles;
