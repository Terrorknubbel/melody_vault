import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, SafeAreaView } from 'react-native'
import { Stack, useGlobalSearchParams } from "expo-router";
import * as DB from '../../utils/db'
import Pdf from 'react-native-pdf';
import { Appbar } from 'react-native-paper';

import styles from './sheet.style'
import { COLORS } from '../../constants'

const sheet = () => {
  const params = useGlobalSearchParams();
  const navigation = useNavigation();
  const [pdfUri, setpdfUri] = useState(null);

  const getFilepath = async () => {
    setpdfUri(await DB.getFilepath(params.id))
  }

  useEffect(() => {
    getFilepath();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <Stack.Screen
        options={{
          header: () => (
            <Appbar.Header style={{ backgroundColor: COLORS.dark }}>
              <Appbar.BackAction onPress={() => navigation.goBack()} />
            </Appbar.Header>
          )
        }}

      />
      <View style={styles.container}>
        <Pdf
          style={styles.pdf}
          source={{uri: pdfUri}}
          enablePaging={true}
          horizontal={true}
        />
      </View>
    </SafeAreaView>
  );
}

export default sheet
