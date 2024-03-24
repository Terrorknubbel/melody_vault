import { StyleSheet } from "react-native";

import { COLORS } from "../../../constants";

import { moderateScale } from '../../../utils/Metrics';

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: COLORS.backgroundNeutral,
    borderRadius: 5,
    padding: moderateScale(25),
    alignItems: 'center',
    position: 'absolute',
    right: moderateScale(25),
    bottom: moderateScale(85),
    flex: 1,
    gap: 25
  },
  centeredView: {
    flex: 1
  }
});

export default styles;
