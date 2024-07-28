import { Stack, useNavigation, useRouter } from 'expo-router'
import { useContext, useState } from 'react'
import { Linking } from 'react-native'
import { Appbar, Divider, List, Switch, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from './settings.style'
import LanguageModal from '../../components/settings/LanguageModal'

import Snackbar from '@/src/components/common/Snackbar'
import ExportModal from '@/src/components/settings/ExportModal'
import Subheader from '@/src/components/settings/Subheader'
import { useStreakStore } from '@/src/store/store'
import { PreferencesContext } from '@/src/utils/PreferencesContext'
import i18n from '@/src/utils/i18n'

const Settings = () => {
  const { colors } = useTheme()
  const router = useRouter()
  const navigation = useNavigation()
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext)

  const [languageModalVisible, setLanguageModalVisible] = useState(false)
  const [exportModalVisible, setExportModalVisible] = useState(false)

  const streak = useStreakStore((state) => state.streak)

  const streakAllowed = useStreakStore((state) => state.streakAllowed)
  const setStreakAllowed = useStreakStore((state) => state.setStreakAllowed)

  const setStreakVisible = useStreakStore((state) => state.setStreakVisible)

  const toggleStreak = async () => {
    const newStreakAllowed = !streakAllowed

    if (newStreakAllowed) {
      setStreakVisible(newStreakAllowed)
    }

    setStreakAllowed(newStreakAllowed)
  }

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
          contentStyle={styles.listContent}
          left={() => <List.Icon icon="theme-light-dark" />}
          right={() => (
            <Switch value={isThemeDark} onValueChange={toggleTheme} />
          )}
        />
        <List.Item
          title={i18n.t('streak-setting-title')}
          description={i18n.t('streak-setting-description') + ': ' + streak}
          titleStyle={styles.itemTitle}
          style={styles.item}
          contentStyle={styles.listContent}
          left={() => <List.Icon icon="fire" />}
          right={() => (
            <Switch value={streakAllowed} onValueChange={toggleStreak} />
          )}
        />
        <List.Item
          title={i18n.t('language')}
          description={
            i18n.language === 'en' ? i18n.t('english') : i18n.t('german')
          }
          titleStyle={styles.itemTitle}
          style={styles.item}
          contentStyle={styles.listContent}
          onPress={() => setLanguageModalVisible(true)}
          left={() => <List.Icon icon="translate" />}
        />
        <Subheader
          text={
            i18n.t('files').charAt(0).toUpperCase() + i18n.t('files').slice(1)
          }
        />
        <List.Item
          title={i18n.t('export')}
          titleStyle={styles.itemTitle}
          style={styles.item}
          contentStyle={styles.listContent}
          onPress={() => setExportModalVisible(true)}
          left={() => <List.Icon icon="download" />}
        />
        <Divider horizontalInset style={{ marginVertical: 15 }} />
        <Subheader text={i18n.t('help')} />
        <List.Item
          title={i18n.t('licenses')}
          onPress={() => router.push('/settings/Licenses')}
          titleStyle={styles.itemTitle}
          style={styles.item}
          contentStyle={styles.listContent}
          left={() => <List.Icon icon="file-document-multiple-outline" />}
        />
        <List.Item
          title={i18n.t('send-feedback')}
          onPress={() => openLink('mailto:w.macher3@gmail.com')}
          titleStyle={styles.itemTitle}
          style={styles.item}
          contentStyle={styles.listContent}
          left={() => <List.Icon icon="email-check-outline" />}
        />
        <List.Item
          title="Github"
          onPress={() =>
            openLink('https://github.com/Terrorknubbel/melody_vault')
          }
          titleStyle={styles.itemTitle}
          style={styles.item}
          contentStyle={styles.listContent}
          left={() => <List.Icon icon="github" />}
        />
      </List.Section>
      <LanguageModal
        visible={languageModalVisible}
        setVisible={setLanguageModalVisible}
      />
      <ExportModal
        visible={exportModalVisible}
        setVisible={setExportModalVisible}
      />
      <Snackbar />
    </SafeAreaView>
  )
}

export default Settings
