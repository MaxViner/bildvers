
import React, { useContext } from 'react';
import style from './Input.module.css';
import search from '../../../assets/img/sideBarImg/searchPanel/search.svg';
import { ThemeContext } from '../ThemeToggle/themeContext';
import { Spiner } from '../Spiner/Spiner';

 export const Input = ({ 
  className,
  inputValue, 
  inputType, 
  handleBlur,
  handleChange,
  handleClear,
  handleFocus,
  inputRef,
  isLoading,
 }) => {
  const {theme}=useContext(ThemeContext)
   return (
    <div className="search-wrapper">
      <input
        type="text"
        value={inputValue}
        className={[
          inputType === 'search' ? style['searchInput'] : '',
          className ? className : '',
        ].join(' ')}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
      />
      
      {
        <svg width="26" height="26" viewBox="0 0 26 26" 
        role='button'
        alt="close" 
        className={`${style.closeIcon} ${inputValue === '' ? style.hidden : style.visible}`}        
        fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={handleClear}
        >
        <path d="M26 2.61857L23.3814 0L13 10.3814L2.61857 0L0 2.61857L10.3814 13L0 23.3814L2.61857 26L13 15.6186L23.3814 26L26 23.3814L15.6186 13L26 2.61857Z" 
        
        fill={theme === 'light' ? 'red' : 'whitesmoke'}/>
       
        </svg>   
      }
      {inputType === 'search' && 
      isLoading 
      ?
      <div className={style.searchIcon}>
       <Spiner/>
      </div>
      :
      (
        <img src={search} alt="search" className={style.searchIcon} />
      )}
      </div>
    
  );
};