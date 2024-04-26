import { useRouter } from 'expo-router';
import { List } from 'react-native-paper';

import { useFileStore } from '../../../store/store';
import SheetCard from '../../common/cards/sheetcard/SheetCard';

const Sheets = () => {
  const router = useRouter();
  const fileList = useFileStore((state) => state.fileList);

  const handleSheetPress = (key: number): void => {
    router.push(`/sheet/${key}`);
  };

  return (
    <List.Section>
      {fileList.map((file) => {
        return (
          <SheetCard
            key={file.id}
            sheetKey={file.id}
            name={file.filename}
            handlePress={handleSheetPress}
          />
        );
      })}
    </List.Section>
  );
};

export default Sheets;
