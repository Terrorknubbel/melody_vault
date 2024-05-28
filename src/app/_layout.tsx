import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import { PreferencesContext } from '../utils/PreferencesContext'
import { initDatabase } from '../utils/db'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../utils/theme'

export default function Layout() {
  const [isThemeDark, setIsThemeDark] = useState(false)

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark)
  }, [isThemeDark])

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark
    }),
    [toggleTheme, isThemeDark]
  )

  useEffect(() => {
    initDatabase()
  }, [])

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
