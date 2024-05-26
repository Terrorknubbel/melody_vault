import { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';

import { COLORS } from '@/src/constants';
import { FilterEnum } from '@/src/shared/enums';
import { useFileStore } from '@/src/store/store';

const Filter = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const currentFilter = useFileStore((state) => state.filter);
  const setFilter = useFileStore((state) => state.setFilter);

  return (
    <Menu
      visible={isMenuVisible}
      contentStyle={{
        alignItems: 'flex-end',
        marginTop: 40
      }}
      onDismiss={() => setIsMenuVisible(false)}
      anchor={
        <Appbar.Action
          icon="filter-variant"
          color={COLORS.white}
          onPress={() => setIsMenuVisible(true)}
        />
      }
    >
      <Menu.Item
        onPress={() => setFilter(FilterEnum.TitleAsc)}
        leadingIcon={currentFilter === FilterEnum.TitleAsc ? 'check' : ''}
        trailingIcon="sort-alphabetical-ascending"
        title="Titel A-Z"
      />
      <Menu.Item
        onPress={() => setFilter(FilterEnum.TitleDesc)}
        leadingIcon={currentFilter === FilterEnum.TitleDesc ? 'check' : ''}
        trailingIcon="sort-alphabetical-descending"
        title="Titel Z-A"
      />
      <Menu.Item
        onPress={() => setFilter(FilterEnum.CreatedAt)}
        leadingIcon={currentFilter === FilterEnum.CreatedAt ? 'check' : ''}
        trailingIcon="calendar-blank-outline"
        title="Erstellt am"
      />
    </Menu>
  );
};

export default Filter;
