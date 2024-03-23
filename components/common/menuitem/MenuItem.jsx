import React from 'react'
import { Text, TouchableOpacity, Image, View } from 'react-native'

import styles from './menuitem.style'

const MenuItem = ({ text, iconUrl, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <View style={styles.imgContainer}>
        <Image
          source={iconUrl}
          resizeMode="cover"
          style={styles.btnImg}
        />
      </View>
      <Text style={styles.defaultText}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default MenuItem
