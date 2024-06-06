import { Button, Dialog, Portal, useTheme, TextInput } from 'react-native-paper'
import Pdf from 'react-native-pdf'

import { useDetailsModalStore } from '@/src/store/store'
import i18n from '@/src/utils/i18n'

const DetailsDialog = () => {
  const { colors } = useTheme()

  const {
    visible,
    setVisible,
    sheetName,
    setSheetName,
    composer,
    setComposer,
    fileUri,
    handleSave
  } = useDetailsModalStore((state) => ({
    visible: state.visible,
    setVisible: state.setVisible,
    sheetName: state.sheetName,
    setSheetName: state.setSheetName,
    composer: state.composer,
    setComposer: state.setComposer,
    fileUri: state.fileUri,
    handleSave: state.handleSave
  }))

  if (!visible) {
    return null
  }

  return (
    <Portal>
      <Dialog
        visible
        onDismiss={() => setVisible(false)}
        style={{ marginLeft: 'auto', marginRight: 'auto', minWidth: 330 }}
      >
        <Dialog.Title>{i18n.t('save-sheet')}</Dialog.Title>
        <Dialog.Content style={{ gap: 20 }}>
          <Pdf
            source={{ uri: fileUri }}
            singlePage
            style={{
              width: 150,
              height: 150,
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: colors.elevation.level0
            }}
          />
          <TextInput
            label={i18n.t('title')}
            autoFocus
            value={sheetName}
            mode="outlined"
            onChangeText={(text) => setSheetName(text)}
          />
          <TextInput
            label={i18n.t('composer')}
            value={composer}
            mode="outlined"
            onChangeText={(text) => setComposer(text)}
          />
        </Dialog.Content>
        <Dialog.Actions style={{ gap: 5 }}>
          <Button
            mode="text"
            style={{
              borderRadius: 5
            }}
            onPress={() =>
              handleSave({ filename: sheetName, composer, filepath: fileUri })
            }
          >
            {i18n.t('save')}
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

export default DetailsDialog
