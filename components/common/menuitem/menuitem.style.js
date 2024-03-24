import { StyleSheet } from "react-native";

import { SIZES, COLORS, FONT } from "../../../constants";

import { moderateScale } from '../../../utils/Metrics';

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    gap: moderateScale(30),
    alignItems: "center"
  },
  btnImg: {
    width: SIZES.large,
    height: SIZES.large
  },
  imgContainer: {
    flex: 1
  },
  defaultText: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.white
  },
});

export default styles;
