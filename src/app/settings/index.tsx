import { Stack, useNavigation, useRouter } from 'expo-router'
import { useContext } from 'react'
import { Linking } from 'react-native'
import { Appbar, Divider, List, Switch, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from './settings.style'

import Subheader from '@/src/components/settings/Subheader'
import { PreferencesContext } from '@/src/utils/PreferencesContext'

const Settings = () => {
  const { colors } = useTheme()

  const router = useRouter()

  const navigation = useNavigation()
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext)

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    )
  }

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
              <Appbar.Content title="Einstellungen" color={colors.surface} />
            </Appbar.Header>
          )
        }}
      />
      <List.Section style={{ marginTop: 15 }}>
        <Subheader text="Anpassen" />
        <List.Item
          title="Dunkel Modus"
          titleStyle={styles.itemTitle}
          style={styles.item}
          left={() => <List.Icon icon="theme-light-dark" />}
          right={() => (
            <Switch value={isThemeDark} onValueChange={toggleTheme} />
          )}
        />
        <Divider horizontalInset style={{ marginVertical: 15 }} />
        <Subheader text="Hilfe" />
        <List.Item
          title="Lizensen"
          onPress={() => router.push('/settings/Licenses')}
          titleStyle={styles.itemTitle}
          style={styles.item}
          left={() => <List.Icon icon="file-document-multiple-outline" />}
        />
        <List.Item
          title="Feedback senden"
          onPress={() => openLink('mailto:w.macher3@gmail.com')}
          titleStyle={styles.itemTitle}
          style={styles.item}
          left={() => <List.Icon icon="email-check-outline" />}
        />
        <List.Item
          title="Github"
          onPress={() =>
            openLink('https://github.com/Terrorknubbel/melody_vault')
          }
          titleStyle={styles.itemTitle}
          style={styles.item}
          left={() => <List.Icon icon="github" />}
        />
      </List.Section>
    </SafeAreaView>
  )
}

export default Settings
