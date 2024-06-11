import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { View, useColorScheme } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import { useFileStore } from '../store/store'
import { PreferencesContext } from '../utils/PreferencesContext'
import { getDarkmode, getFilter, initDatabase, setDarkmode } from '../utils/db'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../utils/theme'

export default function Layout() {
  const [isThemeDark, setIsThemeDark] = useState(useColorScheme() === 'dark')

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme

  const setFilter = useFileStore((state) => state.setFilter)

  const toggleTheme = useCallback(async () => {
    const newTheme = !isThemeDark
    setIsThemeDark(newTheme)
    await setDarkmode(newTheme)
  }, [isThemeDark])

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark
    }),
    [toggleTheme, isThemeDark]
  )

  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase()

        const darkmode = await getDarkmode()
        const filter = await getFilter()

        if (darkmode !== null) {
          setIsThemeDark(darkmode)
        }

        setFilter(filter)
      } catch (error) {
        console.log('Initialization error:', error)
      }
    }

    init()
  }, [setFilter])

  const [fontsLoaded] = useFonts({
    Noto: require('../assets/fonts/Noto.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  SplashScreen.preventAutoHideAsync()

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <View
          style={{ flex: 1, backgroundColor: theme.colors.background }}
          onLayout={onLayoutRootView}
        >
          <Stack />
        </View>
      </PaperProvider>
    </PreferencesContext.Provider>
  )
}
