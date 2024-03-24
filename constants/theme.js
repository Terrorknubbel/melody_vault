import { moderateScale } from '../utils/Metrics';

const COLORS = {
  dark: '#04091a',
  white: '#FFFFEC',

  background: '#6421c2',
  backgroundNeutral: '#1c1c1e'
};

const FONT = {
  regular: "Noto"
};

const SIZES = {
  xSmall: 10,
  small: 14,
  medium: moderateScale(14),
  large: moderateScale(20),
  xLarge: moderateScale(24),
  xxLarge: 32,
};

export { COLORS, SIZES, FONT };
