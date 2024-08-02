import { NativeEventSubscription } from 'react-native'
import { List } from 'react-native-paper'

import SheetCard from '@/src/components/common/cards/sheetcard/SheetCard'
import { FilterEnum } from '@/src/shared/enums'
import { useFileStore, useSearchBarStore } from '@/src/store/store'

interface Props {
  searchBackHandler: NativeEventSubscription
}

const Sheets = ({ searchBackHandler }: Props) => {
  const fileList = useFileStore((state) => state.fileList)
  const searchQuery = useSearchBarStore((state) => state.searchQuery)
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

  const favorites = sortedList.filter((file) => file.favorite)
  const nonFavorites = sortedList.filter((file) => !file.favorite)

  const combinedList = [...favorites, ...nonFavorites]

  return (
    <List.Section>
      {combinedList.map((file) => {
        return (
          <SheetCard
            key={file.id}
            sheetKey={file.id}
            name={file.filename}
            composer={file.composer}
            favorite={file.favorite}
            searchBackHandler={searchBackHandler}
          />
        )
      })}
    </List.Section>
  )
}

export default Sheets
