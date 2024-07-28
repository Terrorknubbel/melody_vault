import * as Sentry from '@sentry/react-native'
import { useFonts } from 'expo-font'
import { useNavigationContainerRef, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { View, useColorScheme } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import { useFileStore } from '../store/store'
import { PreferencesContext } from '../utils/PreferencesContext'
import { getDarkmode, getFilter, initDatabase, setDarkmode } from '../utils/db'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../utils/theme'

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

Sentry.init({
  dsn: 'https://04232518f1837077e7d7ca4d08958724@o4507526194069504.ingest.de.sentry.io/4507526241058896',
  enabled: process.env.NODE_ENV === 'production',
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      enableNativeFramesTracking: true
    })
  ]
})

function Layout() {
  const ref = useNavigationContainerRef()

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
      await initDatabase()

      const darkmode = await getDarkmode()
      const filter = await getFilter()

      if (darkmode !== null) {
        setIsThemeDark(darkmode)
      }

      setFilter(filter)
    }

    init()
  }, [setFilter])

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref)
    }
  }, [ref])

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

export default Sentry.wrap(Layout)
