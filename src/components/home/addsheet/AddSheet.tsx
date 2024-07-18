import { useState } from 'react'
import { View } from 'react-native'
import { Button, Menu } from 'react-native-paper'

import styles from './addsheet.style'

import { SheetMetadata } from '@/src/shared/types'
import { useDetailsModalStore, useFileStore } from '@/src/store/store'
import { pdfUpload, scanDocument, savePdf } from '@/src/utils'
import i18n from '@/src/utils/i18n'

const AddSheet = () => {
  const [visible, setVisible] = useState(false)

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

  const handleUpload = async (isScan: boolean) => {
    setVisible(false)

    const result = isScan ? await scanDocument() : await pdfUpload()
    if (result) {
      setDetailsSheetName(result.filename)
      setDetailsComposer('')
      setDetailsFileUri(result.fileUri)
      setDetailsHandleSave(handlePdfSave)
      setDetailsModalVisible(true)
    }
  }

  const handlePdfSave = async ({
    filename,
    composer,
    filepath
  }: SheetMetadata) => {
    await savePdf({ filename, composer, filepath })

    loadMetaData()
    setDetailsModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentStyle={styles.menu}
        theme={{ animation: { scale: 0.3 } }}
        anchor={
          <Button
            style={styles.button}
            icon="plus"
            mode="contained"
            onPress={() => setVisible(true)}
          >
            {i18n.t('add')}
          </Button>
        }
      >
        <Menu.Item
          leadingIcon="file-image-plus-outline"
          onPress={() => handleUpload(true)}
          title={i18n.t('scan')}
        />
        <Menu.Item
          leadingIcon="file-pdf-box"
          onPress={() => handleUpload(false)}
          title={i18n.t('pdf-upload')}
        />
      </Menu>
    </View>
  )
}

export default AddSheet
