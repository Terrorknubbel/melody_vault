import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as DB from './db';

export const pdfUpload = async () => {
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
