import { View } from 'react-native';
import { List } from 'react-native-paper';

import SheetDestroyDialog from './SheetDestroyDialog';
import SheetMenu from './SheetMenu';
import styles from './sheetcard.style';

interface Props {
  sheetKey: number;
  name: string;
  handlePress: (key: number) => void;
}

const SheetCard = ({ sheetKey, name, handlePress }: Props) => {
  return (
    <View style={styles.container}>
      <List.Item
        title={name}
        onPress={() => handlePress(sheetKey)}
        style={styles.itemContainer}
      />
      <SheetMenu />
      <SheetDestroyDialog sheetKey={sheetKey} sheetName={name} />
    </View>
  );
};

export default SheetCard;
