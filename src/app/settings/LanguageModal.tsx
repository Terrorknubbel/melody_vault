import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Button, Dialog, Portal, RadioButton, Text } from 'react-native-paper'

import * as DB from '@/src/utils/db'

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const LanguageModal = ({ visible, setVisible }: Props) => {
  const { t, i18n } = useTranslation()

  const [language, setLanguage] = useState(i18n.language)

  const save = () => {
    i18n.changeLanguage(language)
    DB.setLanguage(language)
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <Portal>
      <Dialog
        visible
        onDismiss={() => setVisible(false)}
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Dialog.Title>{i18n.t('set-language')}</Dialog.Title>
        <Dialog.Content style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20
            }}
          >
            <RadioButton
              value="de"
              status={language === 'de' ? 'checked' : 'unchecked'}
              onPress={() => setLanguage('de')}
            />
            <Text variant="bodyLarge" onPress={() => setLanguage('de')}>
              {t('german')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20
            }}
          >
            <RadioButton
              value="en"
              status={language === 'en' ? 'checked' : 'unchecked'}
              onPress={() => setLanguage('en')}
            />
            <Text variant="bodyLarge" onPress={() => setLanguage('en')}>
              {i18n.t('english')}
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions style={{ gap: 5 }}>
          <Button mode="text" onPress={save}>
            {i18n.t('save')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default LanguageModal
