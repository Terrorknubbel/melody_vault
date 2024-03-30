import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../constants";
import { moderateScale } from '../../../../utils/Metrics';

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 5,
    padding: moderateScale(25),
    gap: 25
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-around"
  },
  heading: {
    color: COLORS.white,
    fontSize: SIZES.large
  },
  text: {
    color: COLORS.white
  },
  button: {
    paddingLeft: moderateScale(20),
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(20),
    paddingBottom: moderateScale(10),
    borderRadius: 5,
    borderWidth: 1
  },
  destroyButton: {
    borderColor: COLORS.danger
  },
  destroyText: {
    color: COLORS.danger
  },
  cancelButton: {
    borderColor: COLORS.gray
  },
  cancelText: {
    color: COLORS.gray
  }
});

export default styles;
