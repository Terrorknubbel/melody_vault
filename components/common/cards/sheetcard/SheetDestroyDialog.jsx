import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import * as DB from '../../../../utils/db';
import { destroyPDF } from '../../../../utils';

const SheetDestroyDialog = ({ visible, closeDialog, refresh, sheetKey, sheetName, onSnackbarTrigger }) => {
  const theme = useTheme();

  const deleteSheet = async () => {
    const filepath = await DB.getFilepath(sheetKey)
    await destroyPDF(filepath)
    await DB.deleteFile(sheetKey)
    refresh()
    onSnackbarTrigger("Gelöscht", sheetName)
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={closeDialog} style={{ marginLeft: "auto", marginRight: "auto" }}>
        <Dialog.Title>Unwiderruflich löschen?</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">
            Diese Aktion kann nicht rückgängig gemacht werden.
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={{ gap: 5 }}>
          <Button
            mode="outlined"
            textColor={theme.colors.error}
            style={{
              borderColor: theme.colors.error,
              borderRadius: 5
            }}
            onPress={deleteSheet}
          >
            Löschen
          </Button>
          <Button
            mode="outlined"
            textColor={theme.colors.elevation.level5}
            style={{
              borderRadius: 5
            }}
            onPress={closeDialog}
          >
            Abbrechen
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default SheetDestroyDialog;
