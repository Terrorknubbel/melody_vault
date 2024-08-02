import { cacheDirectory, copyAsync } from 'expo-file-system'
import { useRouter } from 'expo-router'
import { shareAsync } from 'expo-sharing'
import { useState } from 'react'
import { NativeEventSubscription, View } from 'react-native'
import { Icon, List, useTheme } from 'react-native-paper'

import SheetDestroyDialog from './SheetDestroyDialog'
import SheetMenu from './SheetMenu'

import {
  useDetailsModalStore,
  useFileStore,
  useSearchBarStore
} from '@/src/store/store'
import { getFilepath, setFavorite, updateFile } from '@/src/utils/db'

interface Props {
  sheetKey: number
  name: string
  composer: string
  favorite: boolean
  searchBackHandler: NativeEventSubscription
}

const SheetCard = ({
  sheetKey,
  name,
  composer,
  favorite,
  searchBackHandler
}: Props) => {
  const { colors } = useTheme()

  const router = useRouter()
  const [destroyDialogVisible, setDestroyDialogVisible] = useState(false)

  const closeSearchBar = useSearchBarStore((state) => state.close)

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

  const handleToggleFavorite = async () => {
    await setFavorite(sheetKey, !favorite)
    loadMetaData()
  }

  const share = async () => {
    const fileUri = await getFilepath(sheetKey)
    const shareUri = `${cacheDirectory}${name}.pdf`
    await copyAsync({
      from: fileUri,
      to: shareUri
    })

    shareAsync(shareUri)
  }

  const redirect = (key: number): void => {
    closeSearchBar()
    searchBackHandler.remove()

    router.push(`/sheet/${key}`)
  }

  return (
    <View>
      <List.Item
        title={name}
        description={composer}
        descriptionStyle={{ color: colors.outline }}
        contentStyle={favorite && { marginLeft: -10 }}
        onPress={() => redirect(sheetKey)}
        left={() =>
          favorite ? (
            <View
              style={{
                marginVertical: 'auto',
                marginLeft: 16
              }}
            >
              <Icon source="heart" color="red" size={25} />
            </View>
          ) : null
        }
        right={() => (
          <SheetMenu
            setDestroyDialogVisible={setDestroyDialogVisible}
            handleEdit={editSheetMenu}
            favorite={favorite}
            toggleFavorite={handleToggleFavorite}
            share={share}
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
