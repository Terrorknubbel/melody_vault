import { Text, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS, SIZES, icons } from '../constants'
import { ScreenHeaderBtn } from '../components'

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.dark },
          headerShadowVisible: false,
          headerLeft: () => (
            <Text style={{ fontSize: SIZES.large, color: COLORS.white }}>Melody Vault</Text>
          ),
          headerRight: () => (
            <>
              <ScreenHeaderBtn iconUrl={icons.filter} dimension="60%" />
              <ScreenHeaderBtn iconUrl={icons.search} dimension="60%" />
              <ScreenHeaderBtn iconUrl={icons.settings} dimension="60%" />
            </>
          ),
          headerTitle: ""
        }}
      />
    </SafeAreaView>
  );
}

export default Home;
