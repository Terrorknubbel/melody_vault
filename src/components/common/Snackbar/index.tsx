import { Snackbar } from 'react-native-paper'

import { useSnackbarMessageStore, useSnackbarStore } from '@/src/store/store'

export default () => {
  const snackbarVisible = useSnackbarStore((state) => state.visible)
  const setSnackbarVisible = useSnackbarStore((state) => state.setVisible)
  const snackbarMessage = useSnackbarMessageStore((state) => state.message)
  const snackBarDuration = useSnackbarStore((state) => state.duration)

  return (
    <Snackbar
      visible={snackbarVisible}
      onDismiss={() => setSnackbarVisible(false)}
      duration={snackBarDuration}
    >
      {`${snackbarMessage.action}: ${snackbarMessage.text}`}
    </Snackbar>
  )
}
