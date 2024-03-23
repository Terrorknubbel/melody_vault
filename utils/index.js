import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export const pdfUpload = async () => {
  let result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf',
  });

  if (result.canceled === false) {
    saveFile(result.assets[0].uri, result.assets[0].name)
  }
}

const saveFile = async (uri, name) => {
  const downloadDest = `${FileSystem.documentDirectory}/pdfs/${name}`;
  await FileSystem.copyAsync({ from: uri, to: downloadDest });
  getSavedFiles()
};

const getSavedFiles = async () => {
  const directoryUri = `${FileSystem.documentDirectory}/pdfs/`;
  try {
    const fileInfos = await FileSystem.getInfoAsync(directoryUri);
    console.log("infos: ", fileInfos)
  } catch (error) {
    console.error('Error getting saved file names:', error);
  }
};
