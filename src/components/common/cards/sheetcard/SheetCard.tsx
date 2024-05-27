import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'
import { List, useTheme } from 'react-native-paper'

import SheetDestroyDialog from './SheetDestroyDialog'
import SheetMenu from './SheetMenu'
import styles from './sheetcard.style'

interface Props {
  sheetKey: number
  name: string
  composer: string
}

const SheetCard = ({ sheetKey, name, composer }: Props) => {
  const { colors } = useTheme()

  const router = useRouter()
  const [destroyDialogVisible, setDestroyDialogVisible] = useState(false)

  const redirect = (key: number): void => router.push(`/sheet/${key}`)

  return (
    <View style={styles.container}>
      <List.Item
        title={name}
        description={composer}
        descriptionStyle={{ color: colors.outline }}
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
