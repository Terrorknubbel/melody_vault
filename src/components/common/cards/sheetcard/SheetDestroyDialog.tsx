import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper'

import {
  useSnackbarMessageStore,
  useSnackbarStore,
  useFileStore
} from '@/src/store/store'
import { destroyPDF } from '@/src/utils'
import * as DB from '@/src/utils/db'
import i18n from '@/src/utils/i18n'

interface Props {
  sheetKey: number
  sheetName: string
  visible: boolean
  setVisible: (visible: boolean) => void
}

const SheetDestroyDialog = ({
  sheetKey,
  sheetName,
  visible,
  setVisible
}: Props) => {
  const { colors } = useTheme()

  const setSnackbarVisible = useSnackbarStore((store) => store.setVisible)
  const setSnackbarMessage = useSnackbarMessageStore(
    (store) => store.setMessage
  )
  const setSnackbarDuration = useSnackbarStore((store) => store.setDuration)

  const loadAllMetadata = useFileStore((state) => state.loadAllMetadata)

  const deleteSheet = async (): Promise<void> => {
    const filepath = await DB.getFilepath(sheetKey)

    await destroyPDF(filepath)
    await DB.deleteFile(sheetKey)

    loadAllMetadata()

    setSnackbarMessage({ action: 'Gelöscht', text: sheetName })
    setSnackbarDuration(3000)
    setSnackbarVisible(true)
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <Portal>
      <Dialog
        visible
        onDismiss={() => setVisible(false)}
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
        testID="DestroyDialog"
      >
        <Dialog.Title>{i18n.t('delete-headline')}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">{i18n.t('delete-body')}</Text>
        </Dialog.Content>
        <Dialog.Actions style={{ gap: 5 }}>
          <Button
            mode="text"
            textColor={colors.error}
            style={{
              borderColor: colors.error,
              borderRadius: 5
            }}
            onPress={deleteSheet}
          >
            {i18n.t('delete')}
          </Button>
          <Button
            mode="text"
            textColor={colors.outline}
            style={{
              borderRadius: 5
            }}
            onPress={() => setVisible(false)}
            testID="DestroyDialog-cancel-button"
          >
            {i18n.t('cancel')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default SheetDestroyDialog
