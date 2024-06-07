import { useState } from 'react'
import { Menu, IconButton } from 'react-native-paper'

import i18n from '@/src/utils/i18n'

interface Props {
  setDestroyDialogVisible: (visible: boolean) => void
  handleEdit: () => void
}

const SheetMenu = ({ setDestroyDialogVisible, handleEdit }: Props) => {
  const [visible, setVisible] = useState(false)

  const destroy = (): void => {
    setDestroyDialogVisible(true)
    setVisible(false)
  }

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentStyle={{ marginTop: 30 }}
      theme={{ animation: { scale: 0.3 } }}
      anchor={
        <IconButton
          icon="dots-vertical"
          onPress={() => setVisible(true)}
          testID="SheetMenu"
          style={{
            marginRight: -15,
            margin: 0
          }}
        />
      }
    >
      <Menu.Item
        leadingIcon="pencil"
        onPress={() => {
          setVisible(false)
          handleEdit()
        }}
        title={i18n.t('edit')}
      />
      <Menu.Item
        testID="SheetMenu-delete-button"
        leadingIcon="delete"
        onPress={destroy}
        title={i18n.t('delete')}
      />
    </Menu>
  )
}

export default SheetMenu
