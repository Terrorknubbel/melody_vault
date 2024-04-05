import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// width, marginLeft, marginRight, marginHorizontal, paddingLeft, paddingRight, paddingHorizontal
const horizontalScale = (size) => (width / guidelineBaseWidth) * size;

// height, marginTop, marginBottom, marginVertical, line-height, paddingTop, paddingBottom, paddingVertical
const verticalScale = (size) => (height / guidelineBaseHeight) * size;

// font-size, borderRadius
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
