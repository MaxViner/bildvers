import React, { useState, useEffect, useRef,useContext } from 'react'; 

import  {ThemeContext}  from '../UI/ThemeToggle/themeContext';
import style from './Forecast.module.css'; 
import { SearchContext } from '../../context/searchContext';
import { fetchDayForecast} from '../../api/fetchWeekForecast';
import ForecastHeader from './forecastHeader/forecastHeader';
import ForecastSlider from './ForecastSlider/ForecastSlider';
import { interpolateWeatherData } from '../../utils/interpolateWeatherData';


const Forecast = ({numCards,btenWidible}) => { 
  const [switchSliderData, setSwitchSliderData]= useState(false)
  const [cardsType, setCardsType] = useState('week'); 
  const [sliderData, setSliderData] = useState([])
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isPrevButtonActive, setIsPrevButtonActive] = useState(false);
  const [isNextButtonActive, setIsNextButtonActive] = useState(true);

  const { theme } = useContext(ThemeContext);
  const {isLoading}=useContext(SearchContext)

let currentLocation = JSON.parse(localStorage.getItem('currentLocation'))?.city || 'Москва'
useEffect(() => {
  let coords={
    lat: JSON.parse(localStorage.getItem('currentLocation'))?.lat || '55.625578',
    lon: JSON.parse(localStorage.getItem('currentLocation'))?.lon || '37.6063916',
  }
  setSwitchSliderData(true);
  fetchDayForecast(coords.lat, coords.lon)
    .then((weatherForecast) => {
      console.log(weatherForecast);
      const filteredData = weatherForecast?.list.filter((item, index) => (index + 1) % 8 === 0);
      cardsType === 'day'
        ? setSliderData(interpolateWeatherData(weatherForecast?.list.slice(0, 9)))
        : setSliderData(filteredData);
        setSwitchSliderData(false);
    })
    .catch((error) => {
      setSwitchSliderData(false);
      console.error('Ошибка при получении прогноза погоды:', error);
    });
}, [ cardsType, currentLocation]);

const handlePrevButtonClick = () => {
  setIsNextButtonActive(true);
  if (sliderPosition > 0) {
    setSliderPosition(sliderPosition - 1);
  }
  if (sliderPosition - 1 === 0) {
    setIsPrevButtonActive(false);
  }
};

const handleNextButtonClick = () => {
   setIsPrevButtonActive(true);
  if ( sliderPosition < sliderData.length - numCards) {
    setSliderPosition(sliderPosition + 1);
  } 
  if (
    ( sliderPosition + 1 === sliderData.length - numCards) 
  ) {
    setIsNextButtonActive(false);
  }

  
   
  
};


  return ( 
    <div className={style.forecastWrapvper}  > 
      <ForecastHeader
       cardsType={cardsType}
       setCardsType={setCardsType}
       setSliderPosition={setSliderPosition}
       setIsNextButtonActive={setIsNextButtonActive}
       setIsPrevButtonActive={setIsPrevButtonActive}
        />
      <ForecastSlider
        btenWidible={btenWidible}
        handlePrevButtonClick={handlePrevButtonClick}
        handleNextButtonClick={handleNextButtonClick}
        theme={theme}
        sliderData={sliderData}
        sliderPosition={sliderPosition}
        numCards={numCards}
        isLoading={isLoading}
        cardsType={cardsType}
        isNextButtonActive={isNextButtonActive}
        isPrevButtonActive={isPrevButtonActive}
        switchSliderData={switchSliderData}
      />
    </div> 
  ); 
}; 
 
export default Forecast;