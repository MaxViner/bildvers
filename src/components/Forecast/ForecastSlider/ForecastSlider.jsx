
import React from 'react';
import style from '../Forecast.module.css';
import SliderTabLigth from '../../../assets/img/sliderIMG/sliderTab-light.svg';
import SliderTabDark from '../../../assets/img/sliderIMG/sliderTab-dark.svg';
import ForecastCard from './ForecastCard';

const ForecastSlider = ({
  handlePrevButtonClick,
  handleNextButtonClick,
  theme,
  sliderData,
  sliderPosition,
  numCards,
  isLoading,
  cardsType,
  switchSliderData,
  isPrevButtonActive,
  isNextButtonActive,
  btenWidible,
}) => {
  return (
    <div className={style.dayCardsSlider}>
      {btenWidible&&
      <img
        onClick={handlePrevButtonClick}
        role="button"
        src={theme === 'light' ? SliderTabLigth : SliderTabDark}
        alt="slideBtn"
        className={`${style.slideTabLeft} ${!isPrevButtonActive ? style.disaibled : ''}`}  
            
      />
      } 
      <div className={style.dayCards}>
        {sliderData.slice(sliderPosition, sliderPosition + numCards).map((cardData, index) => {
          return (
            <ForecastCard
              cardData={cardData}
              key={index}
              isLoading={isLoading || switchSliderData}
              cardsType={cardsType}
            />
          );
        })}
      </div>
      {btenWidible&&
      <img
        src={theme === 'light' ? SliderTabLigth : SliderTabDark}
        alt="slideBtn"
        onClick={handleNextButtonClick}
        className={`${style.slideTabRigth} ${!isNextButtonActive ? style.disaibled : ''}`}  
        role="button"
      />
      }
    </div>
  );
};

export default ForecastSlider;