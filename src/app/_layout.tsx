import * as Sentry from '@sentry/react-native'
import { useFonts } from 'expo-font'
import { useNavigationContainerRef, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { View, useColorScheme } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import Streak from '../components/common/Streak'
import { useFileStore, useStreakStore } from '../store/store'
import { PreferencesContext } from '../utils/PreferencesContext'
import {
  getDarkmode,
  getFilter,
  getLastOpened,
  initDatabase,
  setDarkmode,
  setLastOpened
} from '../utils/db'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../utils/theme'

const dayjs = require('dayjs')

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

  const initStreak = useStreakStore((state) => state.initStreak)
  const streak = useStreakStore((state) => state.streak)
  const setStreak = useStreakStore((state) => state.setStreak)
  const setStreakVisible = useStreakStore((state) => state.setStreakVisible)

  const [initialized, setInitialized] = useState(false)
  const [isStreakInitialized, setIsStreakInitialized] = useState(false)

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

      await initStreak()
      setInitialized(true)
    }

    init()
  }, [setFilter, initStreak])

  useEffect(() => {
    const init = async () => {
      const lastOpenedUTC = await getLastOpened()
      const currentTimeUTC = new Date().getTime()

      if (lastOpenedUTC === 0) {
        await setLastOpened(currentTimeUTC)
        setStreakVisible(true)
        return
      }

      const dayDiff = dayjs(currentTimeUTC).diff(lastOpenedUTC, 'day')

      if (dayDiff === 0) return

      if (dayDiff === 1) {
        setStreak(streak + 1)
      } else {
        setStreak(1)
      }

      await setLastOpened(currentTimeUTC)
      setStreakVisible(true)
    }

    if (initialized && !isStreakInitialized) {
      init()
      setIsStreakInitialized(true)
    }
  }, [initialized, streak, setStreak, setStreakVisible, isStreakInitialized])

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
          <Streak />
        </View>
      </PaperProvider>
    </PreferencesContext.Provider>
  )
}

export default Sentry.wrap(Layout)
