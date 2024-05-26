import { useState } from 'react';
import { Menu, IconButton } from 'react-native-paper';

interface Props {
  setDestroyDialogVisible: (visible: boolean) => void;
}

const SheetMenu = ({ setDestroyDialogVisible }: Props) => {
  const [visible, setVisible] = useState(false);
  const changeName = (): void => setVisible(false);

  const destroy = (): void => {
    setDestroyDialogVisible(true);
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentStyle={{
        marginTop: 40,
        marginRight: 10
      }}
      anchor={
        <IconButton
          icon="dots-vertical"
          onPress={() => setVisible(true)}
          testID="SheetMenu"
        />
      }
    >
      <Menu.Item leadingIcon="pencil" onPress={changeName} title="Bearbeiten" />
      <Menu.Item
        testID="SheetMenu-delete-button"
        leadingIcon="delete"
        onPress={destroy}
        title="Löschen"
      />
    </Menu>
  );
};

export default SheetMenu;
