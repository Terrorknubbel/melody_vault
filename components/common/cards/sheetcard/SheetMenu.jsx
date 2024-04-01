import { Menu, IconButton } from 'react-native-paper';

const SheetMenu = ({ visible, openMenu, closeMenu, openDestroyDialog }) => {
  const changeName = async () => {
    closeMenu()
  }

  const destroy = async () => {
    openDestroyDialog()
    closeMenu()
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="dots-vertical" onPress={openMenu}/>}
    >
      <Menu.Item leadingIcon="pencil" onPress={changeName} title="Bearbeiten" />
      <Menu.Item leadingIcon="delete" onPress={destroy} title="Löschen" />
    </Menu>
  );
}

export default SheetMenu;
