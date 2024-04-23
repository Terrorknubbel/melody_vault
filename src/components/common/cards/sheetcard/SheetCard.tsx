import { View } from 'react-native'

import styles from './sheetcard.style'
import { List } from 'react-native-paper';
import SheetMenu from './SheetMenu'
import SheetDestroyDialog from './SheetDestroyDialog';

interface Props {
  sheetKey: number,
  name: string,
  handlePress: (key: number) => void
}

const SheetCard = ({ sheetKey, name, handlePress }: Props) => {
  return (
    <View style={styles.container}>
      <List.Item
        title={name}
        onPress={() => handlePress(sheetKey)}
        style={styles.itemContainer}
      />
      <SheetMenu />
      <SheetDestroyDialog sheetKey={sheetKey} sheetName={name} />
    </View>
  )
}

export default SheetCard
