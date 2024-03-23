import React from 'react'
import { View } from 'react-native'

import styles from './sheets.style'

import SheetCard from '../../common/cards/SheetCard'

const Sheets = ({ iconUrl, dimension, handlePress }) => {
  const data = [
    {
      id: 1,
      name: 'Nocturne Op. 9, Nr. 2 ~ Frederic Chopin'
    },
    {
      id: 2,
      name: 'Chasing Kou'
    }
  ]

  return (
    <View style={styles.container}>
      {data?.map((sheet) => (
        <SheetCard
          key={sheet.id}
          name={sheet.name}
        />
      ))}
    </View>
  )
}

export default Sheets
