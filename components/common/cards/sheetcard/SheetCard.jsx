import { useState } from 'react';
import { View } from 'react-native'

import styles from './sheetcard.style'
import { List } from 'react-native-paper';
import SheetMenu from './SheetMenu'
import SheetDestroyDialog from './SheetDestroyDialog';

const SheetCard = ({ sheetKey, name, handlePress, refresh, onSnackbarTrigger }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [destroyDialogVisible, setDestroyDialogVisible] = useState(false)

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const openDestroyDialog = () => setDestroyDialogVisible(true);
  const closeDestroyDialog = () => setDestroyDialogVisible(false);

  return (
    <View style={styles.container}>
      <List.Item
        title={name}
        onPress={() => handlePress(sheetKey)}
        style={styles.itemContainer}
      />
      <SheetMenu
        visible={menuVisible}
        openMenu={openMenu}
        closeMenu={closeMenu}
        openDestroyDialog={openDestroyDialog}
      />
      <SheetDestroyDialog
        visible={destroyDialogVisible}
        closeDialog={closeDestroyDialog}
        refresh={refresh}
        sheetKey={sheetKey}
        sheetName={name}
        onSnackbarTrigger={onSnackbarTrigger}
      />
    </View>
  )
}

export default SheetCard
