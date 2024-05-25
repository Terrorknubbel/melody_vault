import { render as rtlRender } from '@testing-library/react-native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

import theme from './theme';

function render(component) {
  return rtlRender(<PaperProvider theme={theme}>{component}</PaperProvider>);
}

export * from '@testing-library/react-native';
export { render };
