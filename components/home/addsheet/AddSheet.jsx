import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './addsheet.style'
import AddSheetModal from '../addsheetmodal/AddSheetModal';

const AddSheet = ({ refresh }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={openModal}>
        <Text style={styles.plus}>+</Text>
        <Text style={styles.defaultText}>Neu</Text>
      </TouchableOpacity>

      <AddSheetModal visible={modalVisible} onClose={closeModal} refresh={refresh} />
    </View>
  )
}

export default AddSheet
