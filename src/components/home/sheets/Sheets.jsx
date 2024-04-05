import { useRouter } from "expo-router";
import { List } from 'react-native-paper';

import SheetCard from '../../common/cards/sheetcard/SheetCard'
import { useFileStore } from "../../../store/store";

const Sheets = () => {
  const router = useRouter();
  const fileList = useFileStore((state) => state.fileList)

  const handleSheetPress = (key) => {
    router.push(`/sheet/${key}`)
  }

  return (
    <List.Section>
      {fileList.map((file) => {
        return (
          <SheetCard
            key={file.id}
            sheetKey={file.id}
            name={file.name}
            handlePress={handleSheetPress}
          />
        )
      })}
    </List.Section>
  )
}

export default Sheets
