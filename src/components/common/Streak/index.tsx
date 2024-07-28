import { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'
import Animated, {
  Easing,
  SlideInLeft,
  SlideOutLeft
} from 'react-native-reanimated'

import { useStreakStore } from '@/src/store/store'
import { moderateScale } from '@/src/utils/Metrics'
import { PreferencesContext } from '@/src/utils/PreferencesContext'

const Streak = () => {
  const { colors } = useTheme()
  const { isThemeDark } = useContext(PreferencesContext)

  const streakAllowed = useStreakStore((state) => state.streakAllowed)
  const visible = useStreakStore((state) => state.streakVisible)
  const setVisible = useStreakStore((state) => state.setStreakVisible)

  const streak = useStreakStore((state) => state.streak)

  useEffect(() => {
    const setInvisible = setTimeout(() => {
      setVisible(false)
    }, 4800)
    return () => clearTimeout(setInvisible)
  }, [setVisible, streakAllowed, visible])

  if (!streakAllowed || !visible) {
    return null
  }

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: moderateScale(30),
        left: moderateScale(5),
        padding: 10,
        borderRadius: 10,
        backgroundColor: isThemeDark
          ? colors.elevation.level2
          : colors.elevation.level5
      }}
      entering={SlideInLeft.delay(1000)
        .duration(2000)
        .easing(Easing.elastic(1))}
      exiting={SlideOutLeft.duration(1800)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text variant="titleSmall">Streak: {streak}</Text>
        <Icon source="fire" color={colors.error} size={25} />
      </View>
    </Animated.View>
  )
}

export default Streak
