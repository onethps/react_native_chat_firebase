import { createContext, FC, ReactNode, useState } from 'react';

export const ThemeContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
});

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
