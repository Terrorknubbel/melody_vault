import React from 'react'
import { View } from 'react-native'

import styles from './sheets.style'

import SheetCard from '../../common/cards/SheetCard'

const Sheets = ({ fileList }) => {
  return (
    <View style={styles.container}>
      {fileList.map((file, index) => {
        return <SheetCard key={index} name={file} />
      })}
    </View>
  )
}

export default Sheets
