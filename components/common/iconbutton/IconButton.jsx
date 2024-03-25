import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from './iconbutton.style'
import { moderateScale } from '../../../utils/Metrics';

const IconButton = ({ iconName, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Ionicons name={iconName} size={moderateScale(21)} color='white' />
    </TouchableOpacity>
  )
}

export default IconButton
