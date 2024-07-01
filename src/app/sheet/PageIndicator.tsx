import React, { useEffect } from 'react'
import { Text } from 'react-native-paper'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence
} from 'react-native-reanimated'

interface Props {
  numberOfPages: number | null
  currentPage: number | null
}

const PageIndicator = ({ numberOfPages, currentPage }: Props) => {
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) }),
      withDelay(
        600,
        withTiming(0, { duration: 200, easing: Easing.inOut(Easing.ease) })
      )
    )
  }, [opacity, currentPage])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  if (!numberOfPages || !currentPage) {
    return
  }

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          backgroundColor: 'rgb(245, 240, 245)',
          marginBottom: 20,
          paddingHorizontal: 15,
          paddingVertical: 8,
          borderRadius: 5
        }
      ]}
    >
      <Text variant="titleMedium" style={{ color: 'rgb(74, 69, 78)' }}>
        {currentPage}/{numberOfPages}
      </Text>
    </Animated.View>
  )
}

export default PageIndicator
