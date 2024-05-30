import { useNavigation } from '@react-navigation/native'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'
import Pdf from 'react-native-pdf'

import styles from './sheet.style'
import * as DB from '../../utils/db'

const Sheet = () => {
  const { colors } = useTheme()

  const params = useGlobalSearchParams()
  const navigation = useNavigation()
  const [pdfUri, setpdfUri] = useState(null)

  useEffect(() => {
    const getFilepath = async () => {
      setpdfUri(await DB.getFilepath(params.id))
    }

    getFilepath()
  }, [params.id])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => (
            <Appbar.Header style={{ backgroundColor: colors.onBackground }}>
              <Appbar.BackAction
                onPress={() => navigation.goBack()}
                color={colors.surface}
              />
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
  )
}

export default Sheet
