import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import { pdfUpload } from '../../../utils';
import { icons } from '../../../constants'

import styles from './addsheetmodal.style'

import MenuItem from '../../common/menuitem/MenuItem';

const AddSheetModal = ({ visible, onClose, refresh}) => {
  const handlePdfUpload = async () => {
    const success = await pdfUpload();
    success && refresh()
    onClose()
  };

  return (
    <View style={styles.centeredView}>
      <Modal transparent={true} visible={visible}>
        <TouchableWithoutFeedback onPressOut={onClose}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <MenuItem text="Foto aufnehmen" iconUrl={icons.gallery} />
                <MenuItem text="PDF hochladen" iconUrl={icons.pdf} handlePress={handlePdfUpload} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default AddSheetModal;
