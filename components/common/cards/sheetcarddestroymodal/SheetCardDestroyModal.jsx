import { Modal, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import styles from './sheetcarddestroymodal.style'

const SheetCardDestroyModal = ({ visible, onClose, refresh }) => {
  if(!visible) {
    return null
  }

  return (
    <View>
      <Modal transparent={true}>
        <TouchableWithoutFeedback onPressOut={onClose}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalView]}>
                <Text style={styles.heading}>
                  Unwiderruflich löschen?
                </Text>
                <Text style={styles.text}>
                  Diese Aktion kann nicht rückgängig gemacht werden.
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={[styles.button, styles.destroyButton]}
                  >
                    <Text style={[styles.text, styles.destroyText]}>Löschen</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onClose}
                    style={[styles.button, styles.cancelButton]}
                  >
                    <Text style={[styles.text, styles.cancelText]}>Abbrechen</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default SheetCardDestroyModal;
