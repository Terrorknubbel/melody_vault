import { useEffect, useState } from 'react'
import { Text, ScrollView, View, SafeAreaView } from 'react-native'
import { Stack } from 'expo-router'
import * as DB from '../utils/db'

import { COLORS, SIZES, icons } from '../constants'
import { ScreenHeaderBtn, Sheets, AddSheet } from '../components'

const Home = () => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const loadAllMetadata = async () => {
      const allData = await DB.getFiles();
      const dbFilenames = allData.map((f) => f.filename );
      setFileList(dbFilenames)
    };
    loadAllMetadata();
  }, []);

  const updateFileList = (newFileName) => {
    setFileList((prevFileList) => [...prevFileList, newFileName]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.dark },
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
          <Sheets fileList={fileList}/>
        </View>
      </ScrollView>

      <AddSheet updateFileList={updateFileList}/>
    </SafeAreaView>
  );
}

export default Home;
