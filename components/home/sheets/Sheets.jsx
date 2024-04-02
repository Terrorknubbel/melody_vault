import { useRouter } from "expo-router";
import { List } from 'react-native-paper';

import SheetCard from '../../common/cards/sheetcard/SheetCard'

const Sheets = ({ fileList, refresh, onSnackbarTrigger }) => {
  const router = useRouter();

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
            refresh={refresh}
            onSnackbarTrigger={onSnackbarTrigger}
          />
        )
      })}
    </List.Section>
  )
}

export default Sheets
