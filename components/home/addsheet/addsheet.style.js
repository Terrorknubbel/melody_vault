import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/Metrics';

import { SIZES, COLORS, FONT } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: moderateScale(25),
    bottom: moderateScale(25),
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.background,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: horizontalScale(20),
    paddingTop: verticalScale(10),
    paddingRight: horizontalScale(20),
    paddingBottom: verticalScale(10),
    gap: moderateScale(10)
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
