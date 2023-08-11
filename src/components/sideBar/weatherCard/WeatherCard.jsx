
import React, {useContext} from 'react';
import style from './WeatherCard.module.css';
import location from '../../../assets/img/sideBarImg/location.svg';
import { SearchContext } from '../../../context/searchContext';
import {Loader} from '../../UI/loader/Loader'
export const WeatherCard = () => {
  const currentDate = new Date();
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const formattedDate = currentDate.toLocaleDateString('ru-RU', options);
  let currentLocation = (JSON.parse(localStorage.getItem('currentLocation')))?.city || 'Moscow'; 
  const {
    weatherDayData,
  } = useContext(SearchContext);
  currentLocation = currentLocation.replace(/['"]+/g, '');
  

  if (!weatherDayData || !weatherDayData.weather || weatherDayData.weather.length === 0) {
    return <Loader/>;
  }

  return (
    <div className={style.weatherCard}>
      <img src={`https://openweathermap.org/img/wn/${weatherDayData?.weather[0]?.icon}@4x.png`} 
      alt="" className={style.WeatherCardSnow}/>
      <article className={style.weatherCardContent}>
        <div className={style.weatherCardContentCenter}>
          <h1 className={style.weatherCardTemp}>
            <span className={style.weatherCardTempDidgit}>{Math.round(weatherDayData.main.temp)}</span>
            <span className={style.weatherCardTempSymbol}>°</span> 
            <span className={style.weatherCardTempString}>C</span>
          </h1>
          <p className={style.weatherCardDescr}>
            {weatherDayData.weather[0].description}
          </p>
          <p className={style.weatherCardFootNote}>
            Ощущается как {Math.round(weatherDayData.main.feels_like)} °C
          </p>
          <p className={style.weatherCardDate}>
            <time>
              Cегодня
            </time>
            <time>
              {formattedDate}
            </time>
          </p>
        </div>
        <div className={style.weatherCardlocation}>
          <img src={location} alt="location"/>
          <span className={style.weatherCardlocationSity}>
            {currentLocation}
          </span>
        </div>
      </article>
    </div>
  );
}