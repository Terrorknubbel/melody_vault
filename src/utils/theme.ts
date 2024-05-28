import {
  MD3LightTheme as DefaultTheme,
  configureFonts
} from 'react-native-paper'

const colorScheme = {
  dark: {
    primary: 'rgb(220, 184, 255)',
    onPrimary: 'rgb(71, 12, 122)',
    primaryContainer: 'rgb(95, 43, 146)',
    onPrimaryContainer: 'rgb(240, 219, 255)',
    secondary: 'rgb(208, 193, 218)',
    onSecondary: 'rgb(54, 44, 63)',
    secondaryContainer: 'rgb(77, 67, 87)',
    onSecondaryContainer: 'rgb(237, 221, 246)',
    tertiary: 'rgb(243, 183, 190)',
    onTertiary: 'rgb(75, 37, 43)',
    tertiaryContainer: 'rgb(101, 58, 65)',
    onTertiaryContainer: 'rgb(255, 217, 221)',
    error: 'rgb(244, 67, 54)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(4, 9, 26)',
    onBackground: 'rgb(4, 9, 26)',
    surface: 'rgb(231, 225, 229)',
    onSurface: 'rgb(231, 225, 229)',
    surfaceVariant: 'rgb(74, 69, 78)',
    onSurfaceVariant: 'rgb(204, 196, 206)',
    outline: 'rgb(150, 142, 152)',
    outlineVariant: 'rgb(74, 69, 78)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(231, 225, 229)',
    inverseOnSurface: 'rgb(50, 47, 51)',
    inversePrimary: 'rgb(120, 69, 172)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(39, 35, 41)',
      level2: 'rgb(30, 30, 45)',
      level3: 'rgb(50, 44, 55)',
      level4: 'rgb(52, 46, 57)',
      level5: 'rgb(170, 170, 170)'
    },
    surfaceDisabled: 'rgba(231, 225, 229, 0.12)',
    onSurfaceDisabled: 'rgba(231, 225, 229, 0.38)',
    backdrop: 'rgba(51, 47, 55, 0.4)'
  },
  light: {
    primary: 'rgb(50, 27, 150)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(239, 219, 255)',
    onPrimaryContainer: 'rgb(44, 0, 81)',
    secondary: 'rgb(120, 69, 172)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(240, 219, 255)',
    onSecondaryContainer: 'rgb(44, 0, 81)',
    tertiary: 'rgb(128, 81, 88)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 217, 221)',
    onTertiaryContainer: 'rgb(50, 16, 23)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(243, 240, 245)',
    onBackground: 'rgb(50, 27, 150)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(29, 27, 30)',
    surfaceVariant: 'rgb(233, 223, 235)',
    onSurfaceVariant: 'rgb(50, 27, 150)',
    outline: 'rgb(123, 117, 126)',
    outlineVariant: 'rgb(204, 196, 206)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(50, 47, 51)',
    inverseOnSurface: 'rgb(245, 239, 244)',
    inversePrimary: 'rgb(220, 184, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(248, 242, 250)',
      level2: 'rgb(244, 237, 247)',
      level3: 'rgb(240, 232, 244)',
      level4: 'rgb(238, 230, 243)',
      level5: 'rgb(236, 227, 241)'
    },
    surfaceDisabled: 'rgba(29, 27, 30, 0.12)',
    onSurfaceDisabled: 'rgba(29, 27, 30, 0.38)',
    backdrop: 'rgba(51, 47, 55, 0.4)'
  }
}

export const CombinedDefaultTheme = {
  ...DefaultTheme,
  colors: colorScheme.light,
  fonts: configureFonts({
    config: {
      fontFamily: 'Noto'
    }
  })
}

export const CombinedDarkTheme = {
  ...DefaultTheme,
  colors: colorScheme.dark,
  fonts: configureFonts({
    config: {
      fontFamily: 'Noto'
    }
  })
}
