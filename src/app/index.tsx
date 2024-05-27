import { Stack } from 'expo-router'
import { useState, useEffect } from 'react'
import { ScrollView, View, SafeAreaView } from 'react-native'
import { Appbar, Snackbar, Searchbar, useTheme } from 'react-native-paper'

import AddSheet from '../components/home/addsheet/AddSheet'
import Filter from '../components/home/menu/filter/filter'
import Sheets from '../components/home/sheets/Sheets'
import { COLORS } from '../constants'
import {
  useFileStore,
  useSnackbarStore,
  useSnackbarMessageStore
} from '../store/store'

const Home = () => {
  const { colors } = useTheme()

  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const searchQuery = useFileStore((state) => state.searchQuery)
  const setSearchQuery = useFileStore((state) => state.setSearchQuery)
  const loadAllMetadata = useFileStore((state) => state.loadAllMetadata)

  const snackbarVisible = useSnackbarStore((state) => state.visible)
  const setSnackbarVisible = useSnackbarStore((state) => state.setVisible)

  const snackbarMessage = useSnackbarMessageStore((state) => state.message)

  useEffect(() => {
    loadAllMetadata()
  }, [loadAllMetadata])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <Stack.Screen
        options={{
          header: () => (
            <Appbar.Header style={{ backgroundColor: COLORS.dark }}>
              {!isSearchVisible && <Appbar.Content title="Melody Vault" />}
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
                  placeholderTextColor={COLORS.gray}
                />
              )}
              <Appbar.Action
                icon="magnify"
                color={COLORS.white}
                onPress={() => setIsSearchVisible(true)}
              />
              <Filter />
              <Appbar.Action
                icon="cog"
                color={COLORS.white}
                onPress={() => {}}
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
