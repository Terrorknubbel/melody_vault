import { Stack } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { initDatabase } from '../utils/db';

export default function Layout() {
  useEffect(() => {
    initDatabase()
  }, [])

  const [fontsLoaded] = useFonts({
    Noto: require('../assets/fonts/Noto.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.preventAutoHideAsync();

  return <Stack onLayout={onLayoutRootView} />;
}
