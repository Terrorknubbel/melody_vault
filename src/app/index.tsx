import { useEffect } from 'react'
import { ScrollView, View, SafeAreaView } from 'react-native'
import { Stack } from 'expo-router'

import { COLORS, SIZES } from '../constants'
import { Sheets, AddSheet } from '../components'
import { Appbar, Snackbar } from 'react-native-paper'
import { useFileStore, useSnackbarStore, useSnackbarMessageStore } from '../store/store'

const Home = () => {
  const loadAllMetadata = useFileStore((state) => state.loadAllMetadata)

  const snackbarVisible = useSnackbarStore((state) => state.visible)
  const setSnackbarVisible = useSnackbarStore((state) => state.setVisible)

  const snackbarMessage = useSnackbarMessageStore((state) => state.message)

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
          <Sheets/>
        </View>
      </ScrollView>

      <AddSheet />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {`${snackbarMessage.action}: ${snackbarMessage.text}`}
      </Snackbar>
    </SafeAreaView>
  );
}

export default Home;
