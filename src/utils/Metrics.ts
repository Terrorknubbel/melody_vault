import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// width, marginLeft, marginRight, marginHorizontal, paddingLeft, paddingRight, paddingHorizontal
function horizontalScale(size: number): number {
  return (width / guidelineBaseWidth) * size;
}

// height, marginTop, marginBottom, marginVertical, line-height, paddingTop, paddingBottom, paddingVertical
function verticalScale(size: number): number {
  return (height / guidelineBaseHeight) * size;
}

// font-size, borderRadius
function moderateScale(size: number, factor: number = 0.5): number {
  return size + (horizontalScale(size) - size) * factor;
}

export { horizontalScale, verticalScale, moderateScale };
