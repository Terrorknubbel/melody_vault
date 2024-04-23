import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import * as DB from '../../../../utils/db';
import { destroyPDF } from '../../../../utils';
import { useSnackbarMessageStore, useSnackbarStore } from '../../../../store/store';
import { useFileStore } from '../../../../store/store';
import { useSheetDestroyDialogStore } from '../../../../store/store';

interface Props {
  sheetKey: number,
  sheetName: string
}

const SheetDestroyDialog = ({ sheetKey, sheetName }: Props) => {
  const theme = useTheme();

  const visible = useSheetDestroyDialogStore((store) => store.visible)
  const setVisible = useSheetDestroyDialogStore((store) => store.setVisible)

  const setSnackbarVisible = useSnackbarStore((store) => store.setVisible)
  const setSnackbarMessage = useSnackbarMessageStore((store) => store.setMessage)

  const loadAllMetadata = useFileStore((state) => state.loadAllMetadata)

  const deleteSheet = async (): Promise<void> => {
    const filepath = await DB.getFilepath(sheetKey)

    await destroyPDF(filepath)
    await DB.deleteFile(sheetKey)

    loadAllMetadata()

    setSnackbarMessage({ action: "Gelöscht", text: sheetName })
    setSnackbarVisible(true);
    setVisible(false)
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
