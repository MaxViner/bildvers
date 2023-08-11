import React, { useContext, useEffect, useState } from 'react';
import style from './DayDetails.module.css';
import DayDetailsCard from './DayDetailsCard/DayDetailsCard';
import { SearchContext } from '../../context/searchContext';

const DayDetails = () => {
  const [dayDetailsData, setDayDetailsData] =useState([])
  const { weatherDayData } = useContext(SearchContext);


  useEffect(
    ()=>{
      weatherDayData &&
      setDayDetailsData(
      [
        {
          title: 'Скорость ветра',
          didgit: weatherDayData?.wind?.speed,
          symbol: 'м/с',
          windDuration:  weatherDayData?.wind?.deg,
        },
        {
          title: 'Влажность',
          didgit: weatherDayData?.main?.humidity,
          symbol: '%',
          humidity:true,
        },
        {
          title: 'Видимость',
          didgit: weatherDayData?.visibility / 1000,
          symbol: 'км',
        },
        {
          title: 'Давление',
          didgit: (weatherDayData?.main?.pressure * 0.75006).toFixed(0),
          pressure: 'мм рт. ст.',
        },
      ]
    )
  },
  [weatherDayData]
  )

  return (
    <section className={style.DayWrapper}>
      <h1 className={style.dayDetailsTitle}>Подробно на сегодня</h1>
      <div className={style.dayDetailsList}>
        {weatherDayData &&(
          dayDetailsData.map((data, index) => (
            <DayDetailsCard key={index} cardData={data} index={index + 1} />
          ))
        )}
      </div>
    </section>
  );
};

export default DayDetails;