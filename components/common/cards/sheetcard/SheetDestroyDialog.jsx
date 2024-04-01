import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';

const SheetDestroyDialog = ({ visible, closeDialog, refresh }) => {
  const theme = useTheme();

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
            onPress={() => {}}
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
