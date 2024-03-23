import { Text, ScrollView, View, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS, SIZES, icons } from '../constants'
import { ScreenHeaderBtn, Sheets, AddSheet } from '../components'

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.dark },
          headerShadowVisible: false,
          headerLeft: () => (
            <Text style={{fontSize: SIZES.large, color: COLORS.white, fontWeight: "bold"}}>Melody Vault</Text>
          ),
          headerRight: () => (
            <>
              <ScreenHeaderBtn iconUrl={icons.filter} dimension="50%" />
              <ScreenHeaderBtn iconUrl={icons.search} dimension="50%" />
              <ScreenHeaderBtn iconUrl={icons.settings} dimension="50%" />
            </>
          ),
          headerTitle: ""
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Sheets />
        </View>
      </ScrollView>

      <AddSheet />
    </SafeAreaView>
  );
}

export default Home;
