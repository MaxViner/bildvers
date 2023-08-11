
import React, {useContext} from "react";
import style from './DayDetailsCard.module.css';
import { Loader } from "../../UI/loader/Loader";
import HumidityScale from "../../UI/HumidityScale/HumidityScale ";
import { SearchContext } from "../../../context/searchContext";
const DayDetailsCard = ({ cardData, index }) => {
  let itemNumber = 'item' + index;
  const { isLoading, weatherDayData } = useContext(SearchContext);

  if (!weatherDayData || !weatherDayData.weather || weatherDayData.weather.length === 0) {
    return <Loader/>;
  }
  return (
    <>
      { (
        <article className={`${style.dayDetailsItem} ${style[itemNumber]}`}>
          {isLoading || !cardData? (
            <Loader />
          ) : (
            <>
              <h4 className={style.dayDetailsListItemTitle}>{cardData.title}</h4>
              <p className={style.dayDetailsListItemContent}>
                <span className={style.dayDetailsListItemContentDidgit}>
                  {cardData.didgit || 0}
                </span>
                <span className={style.dayDetailsListItemContentSymbol}>
                  {cardData.symbol}
                </span>
                {cardData.pressure && (
                  <span className={style.dayDetailsListItemContent}>
                    <span className={style.dayDetailsListItemContentPressure}>
                      мм рт. ст.
                    </span>
                  </span>
                )}
              </p>
              {cardData.windDuration && (
                <p className={style.dayDetailsListItemWind}>
                  <svg
                    className={style.dayDetailsListItemWindIcon} 
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    transform={`rotate(${cardData.windDuration + 45})`}
                  >
                    <circle cx="19" cy="19" r="19" fill="#48484A"  />
                    <path
                      d="M18.1951 31.0029L10.0872 10.8978C9.76221 10.092 10.5487 9.28365 11.3631 9.58643L31.9073 
                      17.2246C32.7267 17.5293 32.7906 18.6717 32.0237 19.0912C26.1915 22.2822 23.1612 25.3608 20.0501 31.0907C19.6388 31.8482 18.5175 31.8023 18.1951 31.0029Z"
                      fill="#E6E6E6" 
                    />
                  </svg>
                  <span className={style.dayDetailsListItemWindDuration}>
                    {
                      (cardData.windDuration <15) ?
                      'C'
                      :
                      (cardData.windDuration>15&& 
                      cardData.windDuration <75)?
                      'СВ'
                      :
                      (cardData.windDuration>=75&& 
                      cardData.windDuration <105)?
                      'В'
                      :
                      (cardData.windDuration>=105&& 
                      cardData.windDuration <165)?
                      'ЮВ'
                      :
                      (cardData.windDuration>=165&& 
                      cardData.windDuration <195)?
                      'Ю'
                      :
                      (cardData.windDuration>=195&& 
                      cardData.windDuration <255)?
                      'ЮЗ'
                      :
                      (cardData.windDuration>=255&& 
                        cardData.windDuration <285)?
                        'З'
                      :
                      (cardData.windDuration>=285&& 
                        cardData.windDuration <345)?
                        'СЗ'
                      :
                      'С'
                    }
                  </span>
                </p>
              )}
              {cardData.humidity && (
                <HumidityScale humidityPercentage={cardData.didgit || 0} />
              )}
            </>
          )}
        </article>
      )}
    </>
  );
};

export default DayDetailsCard;