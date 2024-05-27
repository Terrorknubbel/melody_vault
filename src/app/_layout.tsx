import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect } from 'react'
import { View } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import { initDatabase } from '../utils/db'
import { theme } from '../utils/theme'

export default function Layout() {
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
    <PaperProvider theme={theme}>
      <View
        style={{ flex: 1, backgroundColor: 'rgb(4, 9, 26)' }}
        onLayout={onLayoutRootView}
      >
        <Stack />
      </View>
    </PaperProvider>
  )
}
