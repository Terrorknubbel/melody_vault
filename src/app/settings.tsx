import { Stack, useNavigation } from 'expo-router'
import { useContext } from 'react'
import { Appbar, Divider, List, Switch, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from './settings.style'
import { PreferencesContext } from '../utils/PreferencesContext'

import Subheader from '@/src/components/settings/Subheader'

const Settings = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext)

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
          onPress={() => {}}
          titleStyle={styles.itemTitle}
          style={styles.item}
          left={() => <List.Icon icon="file-document-multiple-outline" />}
        />
        <List.Item
          title="Feedback senden"
          onPress={() => {}}
          titleStyle={styles.itemTitle}
          style={styles.item}
          left={() => <List.Icon icon="email-check-outline" />}
        />
        <List.Item
          title="Github"
          onPress={() => {}}
          titleStyle={styles.itemTitle}
          style={styles.item}
          left={() => <List.Icon icon="github" />}
        />
      </List.Section>
    </SafeAreaView>
  )
}

export default Settings
