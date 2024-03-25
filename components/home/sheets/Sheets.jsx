import React from 'react'
import { View } from 'react-native'
import { useRouter } from "expo-router";
import styles from './sheets.style'

import SheetCard from '../../common/cards/SheetCard'

const Sheets = ({ fileList }) => {
  const router = useRouter();

  const handleSheetPress = (key) => {
    router.push(`/sheet/${key}`)
  }

  return (
    <View style={styles.container}>
      {fileList.map((file) => {
        return <SheetCard key={file.id} sheetKey={file.id} name={file.name} handlePress={handleSheetPress} />
      })}
    </View>
  )
}

export default Sheets
