import { useState } from 'react'
import { Appbar, Menu, useTheme } from 'react-native-paper'

import { FilterEnum } from '@/src/shared/enums'
import { useFileStore } from '@/src/store/store'
import i18n from '@/src/utils/i18n'

const Filter = () => {
  const { colors } = useTheme()

  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const currentFilter = useFileStore((state) => state.filter)
  const setFilter = useFileStore((state) => state.setFilter)

  return (
    <Menu
      visible={isMenuVisible}
      contentStyle={{
        alignItems: 'flex-end',
        marginTop: 40,
        marginRight: 15
      }}
      onDismiss={() => setIsMenuVisible(false)}
      theme={{ animation: { scale: 0.3 } }}
      anchor={
        <Appbar.Action
          icon="filter-variant"
          color={colors.surface}
          onPress={() => setIsMenuVisible(true)}
        />
      }
    >
      <Menu.Item
        onPress={() => setFilter(FilterEnum.TitleAsc)}
        leadingIcon={currentFilter === FilterEnum.TitleAsc ? 'check' : ''}
        trailingIcon="sort-alphabetical-ascending"
        title={i18n.t('filter-title-a-z')}
      />
      <Menu.Item
        onPress={() => setFilter(FilterEnum.TitleDesc)}
        leadingIcon={currentFilter === FilterEnum.TitleDesc ? 'check' : ''}
        trailingIcon="sort-alphabetical-descending"
        title={i18n.t('filter-title-z-a')}
      />
      <Menu.Item
        onPress={() => setFilter(FilterEnum.CreatedAt)}
        leadingIcon={currentFilter === FilterEnum.CreatedAt ? 'check' : ''}
        trailingIcon="calendar-blank-outline"
        title={i18n.t('filter-created-at')}
      />
    </Menu>
  )
}

export default Filter
