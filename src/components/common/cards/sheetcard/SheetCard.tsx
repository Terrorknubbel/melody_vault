import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'
import { List } from 'react-native-paper'

import SheetDestroyDialog from './SheetDestroyDialog'
import SheetMenu from './SheetMenu'
import styles from './sheetcard.style'

interface Props {
  sheetKey: number
  name: string
}

const SheetCard = ({ sheetKey, name }: Props) => {
  const router = useRouter()
  const [destroyDialogVisible, setDestroyDialogVisible] = useState(false)

  const redirect = (key: number): void => router.push(`/sheet/${key}`)

  return (
    <View style={styles.container}>
      <List.Item
        title={name}
        onPress={() => redirect(sheetKey)}
        style={styles.itemContainer}
      />
      <SheetMenu setDestroyDialogVisible={setDestroyDialogVisible} />
      <SheetDestroyDialog
        sheetKey={sheetKey}
        sheetName={name}
        visible={destroyDialogVisible}
        setVisible={setDestroyDialogVisible}
      />
    </View>
  )
}

export default SheetCard
