import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as DB from './db';

const pdfUpload = async (): Promise<true|null> => {
  let result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf',
  });

  if (!result.canceled) {
    const filename = result.assets[0].name
    const fileUri = result.assets[0].uri

    const downloadDest = `${FileSystem.documentDirectory}/pdfs/${filename}`;
    await FileSystem.copyAsync({ from: fileUri, to: downloadDest });

    await DB.saveFile({filename: filename.replace('.pdf', ''), filepath: downloadDest})
    return true;
  }else {
    return null;
  }
}

const destroyPDF = async (filepath: string): Promise<void> => {
  await FileSystem.deleteAsync(filepath)
}

export {
  pdfUpload,
  destroyPDF
}
