import { StyleSheet } from "react-native";

import { SIZES, COLORS, FONT } from "../../../constants";

import { moderateScale } from '../../../utils/Metrics';

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
    width: "100%"
  },
  btnContainer: {
    flex: 1
  },
  dotsContainer: {
    width: moderateScale(40),
    alignItems: 'center'
  },
  dotsImg: {
    width: SIZES.large,
    height: SIZES.large
  }
});

export default styles;
