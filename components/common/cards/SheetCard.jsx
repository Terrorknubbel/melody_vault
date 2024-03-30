import { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native'

import styles from './sheetcard.style'
import { icons } from '../../../constants';
import SheetCardModal from './sheetcardmodal/SheetCardModal';
import SheetCardDestroyModal from './sheetcarddestroymodal/SheetCardDestroyModal';

const SheetCard = ({ sheetKey, name, handlePress, refresh }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cardPosition, setCardPosition] = useState(null);

  const [destroyModalVisible, setDestroyModalVisible] = useState(false)

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openDestroyModal = () => {
    setDestroyModalVisible(true);
  }

  const closeDestroyModal = () => {
    setDestroyModalVisible(false);
  }

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
      <SheetCardModal
        visible={modalVisible}
        onDestroyOpen={openDestroyModal}
        onClose={closeModal}
        cardPosition={cardPosition}
      />
      <SheetCardDestroyModal visible={destroyModalVisible} onClose={closeDestroyModal} refresh={refresh} />
    </View>
  )
}

export default SheetCard
