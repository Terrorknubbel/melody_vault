import { View } from 'react-native'

import styles from './sheetcard.style'
import { List } from 'react-native-paper';
import SheetMenu from './SheetMenu'
import SheetDestroyDialog from './SheetDestroyDialog';

const SheetCard = ({ sheetKey, name, handlePress }) => {
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
