import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  Portal,
  useTheme,
  TextInput
} from 'react-native-paper';
import Pdf from 'react-native-pdf';

interface Props {
  initialSheetName: string;
  fileUri: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  handleSave: (filename: string) => Promise<void>;
}

const DetailsDialog = ({
  initialSheetName,
  fileUri,
  visible,
  setVisible,
  handleSave
}: Props) => {
  const { colors } = useTheme();

  const [sheetName, setSheetName] = useState('');
  const [composer, setComposer] = useState('');

  useEffect(() => {
    setSheetName(initialSheetName);
  }, [initialSheetName]);

  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <Dialog
        visible
        onDismiss={() => setVisible(false)}
        style={{ marginLeft: 'auto', marginRight: 'auto', minWidth: 330 }}
      >
        <Dialog.Title>Noten speichern</Dialog.Title>
        <Dialog.Content style={{ gap: 20 }}>
          <Pdf
            source={{ uri: fileUri }}
            singlePage
            style={{
              width: 150,
              height: 150,
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: colors.elevation.level0
            }}
          />
          <TextInput
            label="Name"
            value={sheetName}
            mode="outlined"
            onChangeText={(text) => setSheetName(text)}
          />
          <TextInput
            label="Komponist"
            value={composer}
            mode="outlined"
            onChangeText={(text) => setComposer(text)}
          />
        </Dialog.Content>
        <Dialog.Actions style={{ gap: 5 }}>
          <Button
            mode="text"
            style={{
              borderRadius: 5
            }}
            onPress={() => handleSave(sheetName)}
          >
            Speichern
          </Button>
          <Button
            mode="text"
            textColor={colors.elevation.level5}
            style={{
              borderRadius: 5
            }}
            onPress={() => setVisible(false)}
            testID="DestroyDialog-cancel-button"
          >
            Abbrechen
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DetailsDialog;
