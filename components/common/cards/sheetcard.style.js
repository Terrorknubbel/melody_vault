import { StyleSheet } from "react-native";

import { SIZES, COLORS, FONT } from "../../../constants";

const styles = StyleSheet.create({
  defaultText: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.white
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  btnContainer: {
    paddingTop: SIZES.small,
    paddingBottom: SIZES.small,
    width: "90%",
  },
  dotsContainer: {
    width: "10%"
  },
  dotsImg: {
    width: SIZES.large,
    height: SIZES.large,
  },
  separator: {
    height: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  }
});

export default styles;
