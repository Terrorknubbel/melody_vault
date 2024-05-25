import { List } from 'react-native-paper';

import { useFileStore } from '../../../store/store';
import SheetCard from '../../common/cards/sheetcard/SheetCard';

const Sheets = () => {
  const fileList = useFileStore((state) => state.fileList);

  return (
    <List.Section>
      {fileList.map((file) => {
        return (
          <SheetCard key={file.id} sheetKey={file.id} name={file.filename} />
        );
      })}
    </List.Section>
  );
};

export default Sheets;
