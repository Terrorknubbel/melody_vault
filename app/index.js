import { useEffect, useState } from 'react'
import { ScrollView, View, SafeAreaView } from 'react-native'
import { Stack } from 'expo-router'
import * as DB from '../utils/db'

import { COLORS, SIZES } from '../constants'
import { Sheets, AddSheet } from '../components'
import { Appbar, Snackbar } from 'react-native-paper'

const Home = () => {
  const [fileList, setFileList] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState({ action: '', text: '' });

  const loadAllMetadata = async () => {
    const allData = await DB.getFiles();
    const files = allData.map((f) => ({ id: f.id, name: f.filename}) );
    setFileList(files)
  };

  const handleSnackbarTrigger = (action, text) => {
    setSnackbarMessage({ action, text })
    setSnackbarVisible(true);
  }

  const onDismissSnackBar = () => setSnackbarVisible(false);

  useEffect(() => {
    loadAllMetadata();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <Stack.Screen
        options={{
          header: () => (
            <Appbar.Header style={{ backgroundColor: COLORS.dark }}>
              <Appbar.Content
                title="Melody Vault"
              />
              <Appbar.Action icon="filter-variant" color={COLORS.white} onPress={() => {}} />
              <Appbar.Action icon="magnify" color={COLORS.white} onPress={() => {}} />
              <Appbar.Action icon="cog" color={COLORS.white} onPress={() => {}} />
            </Appbar.Header>
          )
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Sheets fileList={fileList} refresh={loadAllMetadata} onSnackbarTrigger={handleSnackbarTrigger} />
        </View>
      </ScrollView>

      <AddSheet refresh={loadAllMetadata} />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        duration={3000}
      >
        {`${snackbarMessage.action}: ${snackbarMessage.text}`}
      </Snackbar>
    </SafeAreaView>
  );
}

export default Home;
