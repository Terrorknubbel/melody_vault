import { Stack, useNavigation, useRouter } from 'expo-router'
import { useContext, useState } from 'react'
import { Linking } from 'react-native'
import { Appbar, Divider, List, Switch, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import LanguageModal from './LanguageModal'
import styles from './settings.style'

import Subheader from '@/src/components/settings/Subheader'
import { PreferencesContext } from '@/src/utils/PreferencesContext'
import i18n from '@/src/utils/i18n'

const Settings = () => {
  const { colors } = useTheme()
  const router = useRouter()
  const navigation = useNavigation()
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext)

  const [languageModalVisible, setLanguageModalVisible] = useState(false)

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
              <Appbar.Content
                title={i18n.t('settings')}
                color={colors.surface}
              />
            </Appbar.Header>
          )
        }}
      />
      <List.Section style={{ marginTop: 15 }}>
        <Subheader text={i18n.t('customize')} />
        <List.Item
          title={i18n.t('dark-mode')}
          titleStyle={styles.itemTitle}
          style={styles.item}
          left={() => <List.Icon icon="theme-light-dark" />}
          right={() => (
            <Switch value={isThemeDark} onValueChange={toggleTheme} />
          )}
        />
        <List.Item
          title={i18n.t('language')}
          description={
            i18n.language === 'en' ? i18n.t('english') : i18n.t('german')
          }
          titleStyle={styles.itemTitle}
          style={styles.item}
          onPress={() => setLanguageModalVisible(true)}
          left={() => <List.Icon icon="translate" />}
        />
        <Divider horizontalInset style={{ marginVertical: 15 }} />
        <Subheader text={i18n.t('help')} />
        <List.Item
          title={i18n.t('licenses')}
          onPress={() => router.push('/settings/Licenses')}
          titleStyle={styles.itemTitle}
          style={styles.item}
          left={() => <List.Icon icon="file-document-multiple-outline" />}
        />
        <List.Item
          title={i18n.t('send-feedback')}
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
      <LanguageModal
        visible={languageModalVisible}
        setVisible={setLanguageModalVisible}
      />
    </SafeAreaView>
  )
}

export default Settings
