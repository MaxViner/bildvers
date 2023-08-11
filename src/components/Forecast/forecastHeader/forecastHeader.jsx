import React from 'react';
import style from '../Forecast.module.css';

const ForecastHeader = ({ cardsType,
   setCardsType,
   setSliderPosition,
   setIsPrevButtonActive, 
   setIsNextButtonActive,}) => {
  return (
    <div className={style.forecastHeader}>
      <span className={style.forecastHeaderWhether}>Прогноз</span>
      <button
        className={`${style.forecastHeaderItem} ${style.forecastHeaderItemWeek} ${
          cardsType === 'week' ? style.active : ''
        }`}
        onClick={() =>{
            setIsNextButtonActive(true)
            setIsPrevButtonActive(false)
            setSliderPosition(0)
            setCardsType('week')
        } }
      >
        на неделю
      </button>
      <button
        className={`${style.forecastHeaderItem} ${style.forecastHeaderItemDay} ${
          cardsType === 'day' ? style.active : ''
        }`}
        onClick={() =>{
            setSliderPosition(0)
            setCardsType('day')
        } }
      >
        почасовой
      </button>
    </div>
  );
};

export default ForecastHeader;