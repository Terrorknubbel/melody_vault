import { StyleSheet } from "react-native";

import { SIZES, COLORS, FONT } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    gap: 30,
    alignItems: "center",
  },
  btnImg: {
    width: SIZES.large,
    height: SIZES.large,
  },
  imgContainer: {
    flex: 1,
  },
  defaultText: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.white
  },
});

export default styles;
