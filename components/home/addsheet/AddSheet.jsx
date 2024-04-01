import { useState } from 'react';
import { View } from 'react-native';
import { Button, Menu } from 'react-native-paper';

import styles from './addsheet.style'
import { pdfUpload } from '../../../utils'

const AddSheet = ({ refresh }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handlePdfUpload = async () => {
    await pdfUpload();
    refresh()
    closeMenu()
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button style={styles.button} icon='plus' mode='contained' onPress={openMenu}>
            Neu
          </Button>
        }
      >
        <Menu.Item leadingIcon="file-image-plus-outline" onPress={() => {}} title="Foto aufnehmen" />
        <Menu.Item leadingIcon="file-pdf-box" onPress={handlePdfUpload} title="PDF hochladen" />
      </Menu>
    </View>
  )
}

export default AddSheet
