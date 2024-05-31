import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import DocumentScanner from 'react-native-document-scanner-plugin'
import { createPdf } from 'react-native-images-to-pdf'

import * as DB from './db'
import { SheetMetadata } from '../shared/types'

interface PDF {
  filename: string
  fileUri: string
}

const scanDocument = async (): Promise<PDF | null> => {
  const filename = 'Scan'
  const fileUri = await DocumentScanner.scanDocument().then(
    ({ scannedImages }) => {
      if (!scannedImages?.length) {
        return null
      }

      return createPdf({
        pages: scannedImages.map((imagePath) => ({ imagePath })),
        outputPath: `${FileSystem.cacheDirectory}${filename}.pdf`
      })
    }
  )

  if (!fileUri) {
    return null
  }

  return { filename, fileUri: `file://${fileUri}` }
}

const pdfUpload = async (): Promise<PDF | null> => {
  const result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf'
  })

  if (!result.canceled) {
    const filename = result.assets[0].name.replace('.pdf', '')
    const fileUri = result.assets[0].uri

    return { filename, fileUri }
  } else {
    return null
  }
}

const savePdf = async ({ filename, composer, filepath }: SheetMetadata) => {
  if (filepath === undefined) {
    return
  }

  const timestamp = new Date().getTime()
  const downloadDest = `${FileSystem.documentDirectory}pdfs/${timestamp}${filename}.pdf`

  await FileSystem.copyAsync({ from: filepath, to: downloadDest })

  await DB.saveFile({
    filename,
    composer,
    filepath: downloadDest
  })
}

const destroyPDF = async (filepath: string): Promise<void> => {
  await FileSystem.deleteAsync(filepath)
}

export { scanDocument, pdfUpload, savePdf, destroyPDF }
