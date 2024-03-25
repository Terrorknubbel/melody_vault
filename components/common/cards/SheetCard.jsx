import { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native'

import styles from './sheetcard.style'
import { icons } from '../../../constants';
import SheetCardModal from '../../home/sheetcardmodal/SheetCardModal';

const SheetCard = ({ sheetKey, name, handlePress, refresh }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cardPosition, setCardPosition] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLayout = (event) => {
    const layout = event.nativeEvent.layout;
    setCardPosition({ y: layout.y, height: layout.height });
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <TouchableOpacity style={styles.btnContainer} onPress={() => handlePress(sheetKey)}>
        <Text numberOfLines={2} style={styles.defaultText}>{name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dotsContainer} onPress={openModal}>
        <Image
            source={icons.dots}
            resizeMode="cover"
            style={styles.dotsImg}
          />
      </TouchableOpacity>
      <SheetCardModal visible={modalVisible} onClose={closeModal} refresh={refresh} cardPosition={cardPosition} />
    </View>
  )
}

export default SheetCard
