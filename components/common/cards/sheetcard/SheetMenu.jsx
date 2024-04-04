import { useState } from 'react';
import { Menu, IconButton } from 'react-native-paper';
import { useSheetDestroyDialogStore } from '../../../../store';

const SheetMenu = () => {
  const [visible, setVisible] = useState(false);
  const setSheetDestroyDialogVisible = useSheetDestroyDialogStore((store) => store.setVisible)

  const changeName = () => setVisible(false)

  const destroy = async () => {
    setSheetDestroyDialogVisible(true)
    setVisible(false)
  };

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={<IconButton icon="dots-vertical" onPress={() => setVisible(true)}/>}
    >
      <Menu.Item leadingIcon="pencil" onPress={changeName} title="Bearbeiten" />
      <Menu.Item leadingIcon="delete" onPress={destroy} title="Löschen" />
    </Menu>
  );
}

export default SheetMenu;
