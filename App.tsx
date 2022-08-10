import React from 'react';
import ThemeProvider from './src/components/ThemeProvider/ThemeProvider';
import Main from './src/Main';

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}
