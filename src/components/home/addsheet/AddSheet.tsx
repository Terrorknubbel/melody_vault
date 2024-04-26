import { useState } from 'react';
import { View } from 'react-native';
import { Button, Menu } from 'react-native-paper';

import styles from './addsheet.style';
import { useFileStore } from '../../../store/store';
import { pdfUpload } from '../../../utils';

const AddSheet = () => {
  const [visible, setVisible] = useState(false);
  const loadMetaData = useFileStore((store) => store.loadAllMetadata);

  const handlePdfUpload = async (): Promise<void> => {
    await pdfUpload();
    loadMetaData();
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            style={styles.button}
            icon="plus"
            mode="contained"
            onPress={() => setVisible(true)}
          >
            Neu
          </Button>
        }
      >
        <Menu.Item
          leadingIcon="file-image-plus-outline"
          onPress={() => {}}
          title="Foto aufnehmen"
        />
        <Menu.Item
          leadingIcon="file-pdf-box"
          onPress={handlePdfUpload}
          title="PDF hochladen"
        />
      </Menu>
    </View>
  );
};

export default AddSheet;
