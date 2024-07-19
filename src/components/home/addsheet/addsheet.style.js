import { StyleSheet } from 'react-native'

import {
  horizontalScale,
  moderateScale,
  verticalScale
} from '../../../utils/Metrics'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: moderateScale(25),
    bottom: moderateScale(25)
  },
  menu: {
    marginBottom: 20 + moderateScale(5)
  },
  button: {
    paddingLeft: horizontalScale(5),
    paddingTop: verticalScale(5),
    paddingRight: horizontalScale(5),
    paddingBottom: verticalScale(5)
  },
  itemContent: { marginTop: -2 }
})

export default styles
