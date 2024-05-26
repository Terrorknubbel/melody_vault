import { useState } from 'react';
import { View } from 'react-native';
import { Button, Menu } from 'react-native-paper';

import DetailsDialog from './DetailsDialog';
import styles from './addsheet.style';

import { useFileStore } from '@/src/store/store';
import { pdfUpload, savePdf } from '@/src/utils';

const AddSheet = () => {
  const [fileData, setFileData] = useState<{
    filename: string;
    fileUri: string;
  } | null>(null);

  const [visible, setVisible] = useState(false);
  const [detailsDialogVisible, setDetailsDialogVisible] = useState(false);

  const loadMetaData = useFileStore((store) => store.loadAllMetadata);

  const handlePdfUpload = async () => {
    setVisible(false);

    const result = await pdfUpload();
    if (result) {
      setFileData(result);
      setDetailsDialogVisible(true);
    }
  };

  const handlePdfSave = async (filename: string) => {
    setVisible(false);

    await savePdf(filename, fileData?.fileUri);

    loadMetaData();
    setDetailsDialogVisible(false);
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
      {fileData && (
        <DetailsDialog
          initialSheetName={fileData.filename}
          fileUri={fileData.fileUri}
          visible={detailsDialogVisible}
          setVisible={setDetailsDialogVisible}
          handleSave={handlePdfSave}
        />
      )}
    </View>
  );
};

export default AddSheet;
