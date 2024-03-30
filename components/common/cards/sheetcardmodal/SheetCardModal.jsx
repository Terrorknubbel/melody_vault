import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import { icons } from '../../../../constants'
import styles from './sheetcardmodal.style'
import MenuItem from '../../menuitem/MenuItem';
import { moderateScale } from '../../../../utils/Metrics';

const SheetCardModal = ({ visible, onDestroyOpen, onClose, cardPosition }) => {
  const changeName = async () => {
    onClose()
  }

  const destroy = async () => {
    onDestroyOpen()
    onClose()
  };

  const modalStyle = {
    top: cardPosition ? cardPosition.y + cardPosition.height + moderateScale(70) : 0
  };

  if(!visible) {
    return null
  }

  return (
    <View>
      <Modal transparent={true}>
        <TouchableWithoutFeedback onPressOut={onClose}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalView, modalStyle]}>
                <MenuItem text="Name ändern" iconUrl={icons.pencile} handlePress={changeName} />
                <MenuItem text="Löschen" iconUrl={icons.bin} handlePress={destroy} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default SheetCardModal;
