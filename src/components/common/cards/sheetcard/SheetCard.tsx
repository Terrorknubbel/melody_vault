import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'
import { List, useTheme } from 'react-native-paper'

import SheetDestroyDialog from './SheetDestroyDialog'
import SheetMenu from './SheetMenu'

import { useDetailsModalStore, useFileStore } from '@/src/store/store'
import { getFilepath, updateFile } from '@/src/utils/db'

interface Props {
  sheetKey: number
  name: string
  composer: string
}

const SheetCard = ({ sheetKey, name, composer }: Props) => {
  const { colors } = useTheme()

  const router = useRouter()
  const [destroyDialogVisible, setDestroyDialogVisible] = useState(false)

  const loadMetaData = useFileStore((store) => store.loadAllMetadata)

  const {
    setDetailsModalVisible,
    setDetailsSheetName,
    setDetailsComposer,
    setDetailsFileUri,
    setDetailsHandleSave
  } = useDetailsModalStore((state) => ({
    setDetailsModalVisible: state.setVisible,
    setDetailsSheetName: state.setSheetName,
    setDetailsComposer: state.setComposer,
    setDetailsFileUri: state.setFileUri,
    setDetailsHandleSave: state.setHandleSave
  }))

  const editSheetMenu = async () => {
    setDetailsSheetName(name)
    setDetailsComposer(composer)

    const fileUri = await getFilepath(sheetKey)
    setDetailsFileUri(fileUri)

    setDetailsHandleSave(handleSheetUpdate)
    setDetailsModalVisible(true)
  }

  const handleSheetUpdate = async ({
    filename,
    composer
  }: {
    filename: string
    composer: string
  }) => {
    await updateFile(sheetKey, filename, composer)
    loadMetaData()
    setDetailsModalVisible(false)
  }

  const redirect = (key: number): void => router.push(`/sheet/${key}`)

  return (
    <View>
      <List.Item
        title={name}
        description={composer}
        descriptionStyle={{ color: colors.outline }}
        onPress={() => redirect(sheetKey)}
        right={() => (
          <SheetMenu
            setDestroyDialogVisible={setDestroyDialogVisible}
            handleEdit={editSheetMenu}
          />
        )}
      />
      <SheetDestroyDialog
        sheetKey={sheetKey}
        sheetName={name}
        visible={destroyDialogVisible}
        setVisible={setDestroyDialogVisible}
      />
    </View>
  )
}

export default SheetCard
