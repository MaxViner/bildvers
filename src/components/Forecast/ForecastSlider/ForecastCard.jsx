
import React, {useContext} from 'react';

import { SearchContext } from '../../../context/searchContext';
import style from './ForecastCard.module.css';
import { Loader } from '../../UI/loader/Loader';
 const ForecastCard = ({ cardData, isLoading, cardsType }) => {

  const dateStr = cardData.dt_txt;
  const date = new Date(dateStr);
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const formattedDate = date.toLocaleDateString('ru-RU', options);
  const { weatherDayData } = useContext(SearchContext);

  if (!weatherDayData || !weatherDayData.weather || weatherDayData.weather.length === 0) {
    return <Loader/>;
  }
    return (
    <>
      <article className={style.dayCard}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <time className={style.dayCardDay}>
              {
              cardsType==='day'?
              cardData?.time
              :
              formattedDate }
              </time>
            <img 
            className={style.dayCardImg} 
            src={
              cardsType==='day'?
              `https://openweathermap.org/img/wn/${cardData?.weather.icon}.png`
              :
              `https://openweathermap.org/img/wn/${cardData?.weather[0]?.icon}@2x.png` 
            }
            alt="forecast" 
             />
            <div className={style.dayCardTemp}>
            {cardsType === 'day' ? (
                  <span className={style.dayDetailsListItemContentDigit}>
                    {Math.round(cardData?.temperature)}°C
                  </span>
                ) : (
                  <span className={style.dayDetailsListItemContentDigit}>
                    {Math.round(cardData?.main?.temp)}°C
                  </span>
                )}
              {cardData?.main?.feels_like && cardsType==='week' && 
              <span className={style.dayCardTempFeel}>
                {Math.round(cardData?.main?.feels_like)}°C</span>}
            </div>
          </>
        )}
      </article>
    </>
  );
};
 export default ForecastCard;