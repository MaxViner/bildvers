import React, { useContext } from 'react';
import  './loader.css';
import { ThemeContext } from '../ThemeToggle/themeContext';

export const Loader = () => {
  const {theme}=useContext(ThemeContext)
  const loaderStyles = {
    background: theme === 'dark' ? '#FFFFFF' : '#212331'
  };
  return (
    <div className='lds-ellipsis'>
      <div style={loaderStyles}></div>
      <div style={loaderStyles}></div>
      <div style={loaderStyles}></div>
      <div style={loaderStyles}></div>
    </div>
  );
};