
import React, { useEffect, useState } from 'react';
import { ThemeContext } from './themeContext';
 export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
   
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
   useEffect(() => {
    localStorage.setItem('theme', theme);
     if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.setProperty('--text-main', '#E6E6E6');
      document.documentElement.style.setProperty('--bg-main', '#212331');
      document.documentElement.style.setProperty('--bg-primary', '#100E1C');
      document.documentElement.style.setProperty('--disabled-main', '#ACACAC');
      document.documentElement.style.setProperty('--disabled-secondary', '#6D6D6D');
      document.documentElement.style.setProperty('--icon-bg', '#EC6E4D');
      document.documentElement.style.setProperty('--iconPosition', 'flex-start%');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.style.setProperty('--text-main', '#48484A');
      document.documentElement.style.setProperty('--bg-main', '#FFFFFF');
      document.documentElement.style.setProperty('--bg-primary', '#F1F1F1');
      document.documentElement.style.setProperty('--disabled-main', '#ACACAC');
      document.documentElement.style.setProperty('--disabled-secondary', '#6D6D6D');
      document.documentElement.style.setProperty('--icon-bg', '#48484A');
      document.documentElement.style.setProperty('--iconPosition', 'flex-end');
    }
  }, [theme]);
 
   return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};