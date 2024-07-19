import * as FileSystem from 'expo-file-system'
import { StorageAccessFramework } from 'expo-file-system'
import { t } from 'i18next'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import {
  Button,
  Dialog,
  Portal,
  Checkbox,
  Divider,
  useTheme
} from 'react-native-paper'

import styles from './exportModal.style'

import { SnackbarMode } from '@/src/shared/enums'
import { FileData } from '@/src/shared/types'
import {
  useFileStore,
  useSnackbarMessageStore,
  useSnackbarStore
} from '@/src/store/store'
import { verticalScale } from '@/src/utils/Metrics'
import i18n from '@/src/utils/i18n'

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const ExportModal = ({ visible, setVisible }: Props) => {
  const fileList: FileData[] = useFileStore((state) => state.fileList)
  const { colors } = useTheme()

  const [allChecked, setAllChecked] = useState(true)

  const [filesToSelect, setFilesToSelect] = useState(
    fileList.map((fileData) => {
      return { ...fileData, checked: true }
    })
  )

  const setSnackbarVisible = useSnackbarStore((store) => store.setVisible)
  const setSnackbarMessage = useSnackbarMessageStore(
    (store) => store.setMessage
  )
  const setSnackbarDuration = useSnackbarStore((store) => store.setDuration)
  const setSnackbarMode = useSnackbarStore((store) => store.setMode)

  const handleExport = async () => {
    setVisible(false)

    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync(
        StorageAccessFramework.getUriForDirectoryInRoot('Download')
      )

    if (!permissions.granted) {
      return
    }

    const { directoryUri } = permissions

    // Prevent using non-writable directories like `content://com.android.providers.downloads.documents/
    if (
      !directoryUri.startsWith(
        'content://com.android.externalstorage.documents'
      )
    ) {
      setSnackbarMessage({
        action: t('export-failed'),
        text: t('export-failed-description')
      })
      setSnackbarDuration(6000)
      setSnackbarMode(SnackbarMode.Error)
      setSnackbarVisible(true)
      return
    }

    const selectedFiles = filesToSelect.filter((fileData) => fileData.checked)

    selectedFiles.forEach(async (fileData) => {
      const base64Data = await FileSystem.readAsStringAsync(fileData.filepath, {
        encoding: FileSystem.EncodingType.Base64
      })

      const uri = await StorageAccessFramework.createFileAsync(
        directoryUri,
        fileData.filename,
        'application/pdf'
      )

      await FileSystem.writeAsStringAsync(uri, base64Data, {
        encoding: FileSystem.EncodingType.Base64
      })
    })

    setSnackbarMessage({
      action: 'Export ' + i18n.t('successful'),
      text: selectedFiles.length + ' ' + i18n.t('files')
    })
    setSnackbarVisible(true)
  }

  if (!visible) {
    return null
  }

  return (
    <Portal>
      <Dialog visible onDismiss={() => setVisible(false)} style={styles.dialog}>
        <Dialog.Title>{i18n.t('select-files')}</Dialog.Title>
        <Dialog.Content style={styles.content}>
          <Checkbox.Item
            label={i18n.t('all')}
            status={allChecked ? 'checked' : 'unchecked'}
            position="leading"
            labelStyle={styles.checkboxLabel}
            style={[styles.checkbox, { paddingTop: 0 }]}
            onPress={() => {
              setAllChecked(!allChecked)
              const tempArr = [...filesToSelect]
              tempArr.forEach((fileData) => {
                fileData.checked = !allChecked
              })
              setFilesToSelect(tempArr)
            }}
          />
          <Divider bold style={styles.divider} />
          <ScrollView
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            style={{
              flexGrow: 0,
              maxHeight: verticalScale(350)
            }}
          >
            {filesToSelect.map((fileData, index) => (
              <Checkbox.Item
                key={index}
                label={fileData.filename}
                labelStyle={styles.checkboxLabel}
                status={fileData.checked ? 'checked' : 'unchecked'}
                position="leading"
                style={[styles.checkbox, { paddingVertical: 3 }]}
                onPress={() => {
                  const tempArr = [...filesToSelect]
                  tempArr.splice(index, 1, {
                    ...fileData,
                    checked: !fileData.checked
                  })
                  setFilesToSelect(tempArr)
                  setAllChecked(tempArr.every((file) => file.checked))
                }}
              />
            ))}
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button
            mode="text"
            style={styles.button}
            onPress={handleExport}
            disabled={filesToSelect.every(
              (fileData) => fileData.checked === false
            )}
          >
            {i18n.t('export')}
          </Button>
          <Button
            mode="text"
            textColor={colors.outline}
            style={styles.button}
            onPress={() => setVisible(false)}
          >
            {i18n.t('cancel')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default ExportModal
