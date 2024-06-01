import { useAssets } from 'expo-asset'
import * as FileSystem from 'expo-file-system'
import { Stack, useNavigation } from 'expo-router'
import { useEffect, useState, useCallback } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import { Appbar, Text, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const CHUNK_SIZE = 1000

const Licenses = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [chunks, setChunks] = useState([] as string[])
  const [loading, setLoading] = useState(true)

  const [assets] = useAssets([require('../../assets/licenses.txt')])

  useEffect(() => {
    const loadFile = async () => {
      if (assets && assets[0].localUri) {
        const content = await FileSystem.readAsStringAsync(assets[0].localUri)
        const contentChunks = []
        for (let i = 0; i < content.length; i += CHUNK_SIZE) {
          contentChunks.push(content.substring(i, i + CHUNK_SIZE))
        }

        setChunks(contentChunks)
        setLoading(false)
      }
    }

    loadFile()
  }, [assets])

  const renderItem = useCallback(({ item }: { item: string }) => {
    return <Text>{item}</Text>
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background
      }}
      edges={['bottom']}
    >
      <Stack.Screen
        options={{
          header: () => (
            <Appbar.Header
              style={{ backgroundColor: colors.onBackground, margin: 0 }}
            >
              <Appbar.BackAction
                color={colors.surface}
                onPress={() => navigation.goBack()}
              />
              <Appbar.Content title="Lizenzen" color={colors.surface} />
            </Appbar.Header>
          )
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList data={chunks} renderItem={renderItem} />
      )}
    </SafeAreaView>
  )
}

export default Licenses
