module.exports = {
  extends: ['universe/native'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        semi: false
      }
    ]
  },
  ignorePatterns: ['expo-env.d.ts', '/android'],
  env: {
    node: true
  }
}
