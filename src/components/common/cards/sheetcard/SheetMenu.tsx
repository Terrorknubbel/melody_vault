import { useState } from 'react'
import { Menu, IconButton } from 'react-native-paper'

import styles from './sheetMenu.style'

import i18n from '@/src/utils/i18n'

interface Props {
  setDestroyDialogVisible: (visible: boolean) => void
  handleEdit: () => void
  favorite: boolean
  toggleFavorite: () => void
  share: () => void
}

const SheetMenu = ({
  setDestroyDialogVisible,
  handleEdit,
  favorite,
  toggleFavorite,
  share
}: Props) => {
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
        contentStyle={styles.itemContent}
        title={i18n.t('edit')}
      />
      <Menu.Item
        leadingIcon={favorite ? 'heart-off' : 'heart'}
        onPress={() => {
          setVisible(false)
          toggleFavorite()
        }}
        contentStyle={styles.itemContent}
        title={i18n.t('favorite')}
      />
      <Menu.Item
        leadingIcon="share-variant"
        onPress={() => {
          setVisible(false)
          share()
        }}
        contentStyle={styles.itemContent}
        title={i18n.t('share')}
      />
      <Menu.Item
        testID="SheetMenu-delete-button"
        leadingIcon="delete"
        onPress={destroy}
        contentStyle={styles.itemContent}
        title={i18n.t('delete')}
      />
    </Menu>
  )
}

export default SheetMenu
