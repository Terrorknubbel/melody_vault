import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'

import styles from './sheetcard.style'
import { icons } from '../../../constants';

const SheetCard = ({ name, handlePress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
        <Text numberOfLines={2} style={styles.defaultText}>{name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dotsContainer} onPress={handlePress}>
        <Image
            source={icons.dots}
            resizeMode="cover"
            style={styles.dotsImg}
          />
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  )
}

export default SheetCard
