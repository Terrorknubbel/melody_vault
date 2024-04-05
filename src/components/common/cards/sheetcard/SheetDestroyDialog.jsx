import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import * as DB from '../../../../utils/db';
import { destroyPDF } from '../../../../utils';
import { useSnackbarMessageStore, useSnackbarStore } from '../../../../store/store';
import { useFileStore } from '../../../../store/store';
import { useSheetDestroyDialogStore } from '../../../../store/store';

const SheetDestroyDialog = ({ sheetKey, sheetName }) => {
  const theme = useTheme();

  const visible = useSheetDestroyDialogStore((store) => store.visible)
  const setVisible = useSheetDestroyDialogStore((store) => store.setVisible)

  const setSnackbarVisible = useSnackbarStore((store) => store.setSnackbarVisible)
  const setSnackbarMessage = useSnackbarMessageStore((store) => store.setSnackbarMessage)

  const loadMetaData = useFileStore((state) => state.loadMetaData)

  const deleteSheet = async () => {
    const filepath = await DB.getFilepath(sheetKey)
    await destroyPDF(filepath)
    await DB.deleteFile(sheetKey)

    loadMetaData()

    setSnackbarMessage({ action: "Gelöscht", text: sheetName })
    setSnackbarVisible(true);
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)} style={{ marginLeft: "auto", marginRight: "auto" }}>
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
            onPress={() => setVisible(false)}
          >
            Abbrechen
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default SheetDestroyDialog;
