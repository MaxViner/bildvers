import React from 'react';
import style from './SearchPanel.module.css';


export const SearchedCityItem = ({ cityName, handleListItemClick, theme }) => {
  return (
    <li className={style.searchedCitiesRow}>
      <span className={style.searchedCitiesCity}>{cityName}</span>
      <svg
        onClick={() => handleListItemClick(cityName)}
        role="button"
        className={style.searchedCitiesIcon}
        width="11"
        height="15"
        viewBox="0 0 11 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.09312 0L0 1.7625L6.79892 7.5L0 13.2375L2.09312 15L11 7.5L2.09312 0Z"
          fill={theme === 'light' ? '#ACACAC' : '#ACACAC'}
        />
      </svg>
    </li>
  );
};