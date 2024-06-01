import { useAssets } from 'expo-asset'
import { Stack, useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { ScrollView, View, SafeAreaView } from 'react-native'
import { Appbar, Snackbar, Searchbar, useTheme } from 'react-native-paper'

import AddSheet from '../components/home/addsheet/AddSheet'
import DetailsDialog from '../components/home/addsheet/DetailsDialog'
import Filter from '../components/home/menu/filter/filter'
import Sheets from '../components/home/sheets/Sheets'
import {
  useFileStore,
  useSnackbarStore,
  useSnackbarMessageStore
} from '../store/store'
import { savePdf } from '../utils'
import { getFirstlaunch, setFirstlaunch } from '../utils/db'

const Home = () => {
  const { colors } = useTheme()

  const router = useRouter()

  const [assets] = useAssets([require('../assets/nocturne.pdf')])

  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const searchQuery = useFileStore((state) => state.searchQuery)
  const setSearchQuery = useFileStore((state) => state.setSearchQuery)
  const loadAllMetadata = useFileStore((state) => state.loadAllMetadata)

  const snackbarVisible = useSnackbarStore((state) => state.visible)
  const setSnackbarVisible = useSnackbarStore((state) => state.setVisible)

  const snackbarMessage = useSnackbarMessageStore((state) => state.message)

  useEffect(() => {
    const init = async () => {
      const firstLaunch = await getFirstlaunch()
      if (firstLaunch && assets && assets[0].localUri) {
        await setFirstlaunch(false)
        await savePdf({
          filename: '[Sample] Nocturne Op. 9 N. 2',
          composer: 'Frédéric Chopin',
          filepath: assets[0].localUri
        })
      }

      await loadAllMetadata()
    }

    init()
  }, [loadAllMetadata, assets])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen
        options={{
          header: () => (
            <Appbar.Header style={{ backgroundColor: colors.onBackground }}>
              {!isSearchVisible && (
                <Appbar.Content title="Melody Vault" color={colors.surface} />
              )}
              {isSearchVisible && (
                <Searchbar
                  mode="bar"
                  placeholder="Suchen…"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus
                  style={{
                    margin: 15,
                    backgroundColor: colors.elevation.level2
                  }}
                  icon="arrow-left"
                  onIconPress={() => {
                    setSearchQuery('')
                    setIsSearchVisible(false)
                  }}
                  placeholderTextColor={colors.outline}
                />
              )}
              <Appbar.Action
                icon="magnify"
                color={colors.surface}
                onPress={() => setIsSearchVisible(true)}
              />
              <Filter />
              <Appbar.Action
                icon="cog"
                color={colors.surface}
                onPress={() => router.push('/settings/')}
              />
            </Appbar.Header>
          )
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1 }}>
          <Sheets />
        </View>
      </ScrollView>

      <AddSheet />

      <DetailsDialog />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {`${snackbarMessage.action}: ${snackbarMessage.text}`}
      </Snackbar>
    </SafeAreaView>
  )
}

export default Home
