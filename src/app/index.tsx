import { useAssets } from 'expo-asset'
import { getLocales } from 'expo-localization'
import { Stack, useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View, SafeAreaView } from 'react-native'
import { Appbar, Searchbar, useTheme } from 'react-native-paper'

import Snackbar from '../components/common/Snackbar'
import AddSheet from '../components/home/addsheet/AddSheet'
import DetailsDialog from '../components/home/addsheet/DetailsDialog'
import Filter from '../components/home/menu/filter/filter'
import Sheets from '../components/home/sheets/Sheets'
import { useFileStore } from '../store/store'
import { savePdf } from '../utils'
import {
  getFirstlaunch,
  getLanguage,
  setFirstlaunch,
  setLanguage
} from '../utils/db'

const Home = () => {
  const { colors } = useTheme()

  const { t, i18n } = useTranslation()

  const router = useRouter()

  const [assets] = useAssets([require('../assets/nocturne.pdf')])

  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const searchQuery = useFileStore((state) => state.searchQuery)
  const setSearchQuery = useFileStore((state) => state.setSearchQuery)
  const loadAllMetadata = useFileStore((state) => state.loadAllMetadata)

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

      const language = await getLanguage()
      const deviceLanguage = getLocales()[0].languageCode ?? 'en'

      if (!language) {
        setLanguage(deviceLanguage)
      }

      const newLanguage = language || deviceLanguage
      i18n.changeLanguage(newLanguage)

      await loadAllMetadata()
    }

    init()
  }, [loadAllMetadata, assets, i18n])

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
                  placeholder={t('search')}
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

      <Snackbar />
    </SafeAreaView>
  )
}

export default Home
