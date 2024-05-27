import { List } from 'react-native-paper'

import SheetCard from '@/src/components/common/cards/sheetcard/SheetCard'
import { FilterEnum } from '@/src/shared/enums'
import { useFileStore } from '@/src/store/store'

const Sheets = () => {
  const fileList = useFileStore((state) => state.fileList)
  const searchQuery = useFileStore((state) => state.searchQuery)
  const filter = useFileStore((state) => state.filter)

  const filteredList = fileList.filter(
    (file) =>
      file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.composer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedList = filteredList.sort((a, b) => {
    if (filter === FilterEnum.TitleAsc) {
      return a.filename.localeCompare(b.filename)
    }

    if (filter === FilterEnum.TitleDesc) {
      return b.filename.localeCompare(a.filename)
    }

    return 0
  })

  return (
    <List.Section>
      {sortedList.map((file) => {
        return (
          <SheetCard
            key={file.id}
            sheetKey={file.id}
            name={file.filename}
            composer={file.composer}
          />
        )
      })}
    </List.Section>
  )
}

export default Sheets
