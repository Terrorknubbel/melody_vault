import { Text } from 'react-native'
import { Snackbar, useTheme } from 'react-native-paper'

import { SnackbarMode } from '@/src/shared/enums'
import { useSnackbarMessageStore, useSnackbarStore } from '@/src/store/store'

export default () => {
  const { colors } = useTheme()

  const visible = useSnackbarStore((state) => state.visible)
  const setVisible = useSnackbarStore((state) => state.setVisible)
  const message = useSnackbarMessageStore((state) => state.message)
  const duration = useSnackbarStore((state) => state.duration)
  const setDuration = useSnackbarStore((state) => state.setDuration)
  const mode = useSnackbarStore((state) => state.mode)
  const setMode = useSnackbarStore((state) => state.setMode)

  return (
    <Snackbar
      visible={visible}
      onDismiss={() => {
        // restore defaults
        setDuration(3000)
        setMode(SnackbarMode.Success)

        setVisible(false)
      }}
      duration={duration}
    >
      <Text>
        <Text
          style={{
            color:
              mode === SnackbarMode.Success
                ? colors.inverseOnSurface
                : colors.onError
          }}
        >
          {message.action}
        </Text>
        <Text
          style={{ color: colors.inverseOnSurface }}
        >{`: ${message.text}`}</Text>
      </Text>
    </Snackbar>
  )
}
