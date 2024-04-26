import { useNavigation } from '@react-navigation/native';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import Pdf from 'react-native-pdf';

import styles from './sheet.style';
import { COLORS } from '../../constants';
import * as DB from '../../utils/db';

const Sheet = () => {
  const params = useGlobalSearchParams();
  const navigation = useNavigation();
  const [pdfUri, setpdfUri] = useState(null);

  useEffect(() => {
    const getFilepath = async () => {
      setpdfUri(await DB.getFilepath(params.id));
    };

    getFilepath();
  }, [params.id]);

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
          source={{ uri: pdfUri }}
          enablePaging
          horizontal
        />
      </View>
    </SafeAreaView>
  );
};

export default Sheet;
