import { Text, useTheme } from 'react-native-paper'

interface Props {
  text: string
}

const Subheader = ({ text }: Props) => {
  const { colors } = useTheme()

  return (
    <Text
      variant="titleMedium"
      style={{ color: colors.onPrimaryContainer, paddingHorizontal: 20 }}
    >
      {text}
    </Text>
  )
}

export default Subheader
