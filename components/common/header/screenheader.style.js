import { StyleSheet } from "react-native";

import { moderateScale } from '../../../utils/Metrics';

const styles = StyleSheet.create({
  btnContainer: {
    width: moderateScale(40),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension
  }),
});

export default styles;
