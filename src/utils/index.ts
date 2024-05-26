import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import * as DB from './db';

const pdfUpload = async (): Promise<{
  filename: string;
  fileUri: string;
} | null> => {
  const result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf'
  });

  if (!result.canceled) {
    const filename = result.assets[0].name.replace('.pdf', '');
    const fileUri = result.assets[0].uri;

    return { filename, fileUri };
  } else {
    return null;
  }
};

const savePdf = async (filename: string, fileUri: string | undefined) => {
  if (fileUri === undefined) {
    return;
  }

  const downloadDest = `${FileSystem.documentDirectory}/pdfs/${filename}`;
  await FileSystem.copyAsync({ from: fileUri, to: downloadDest });

  await DB.saveFile({
    filename,
    filepath: downloadDest
  });
};

const destroyPDF = async (filepath: string): Promise<void> => {
  await FileSystem.deleteAsync(filepath);
};

export { pdfUpload, savePdf, destroyPDF };
