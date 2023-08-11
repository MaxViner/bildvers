import React, { useContext, useEffect, useState, useRef } from 'react';
import style from './SearchPanel.module.css';
import SearchForm from './searchForm/SearchForm';
import { ThemeContext } from '../../UI/ThemeToggle/themeContext';
import { SearchContext } from '../../../context/searchContext';
import { fetchWeather } from '../../../api/fetchWeather ';
import { SearchedCityItem } from './SearchedCityHistory';
import ErrorMessage from '../../../utils/ErrorMessage/ErrorMessage';

export const SearchPanel = ({ searchPaneIsOpen, setSearchPaneIsOpen }) => {
  const { theme } = useContext(ThemeContext);
  const {
    searchedCities,
    handleSearchCity,
    setSearchedCities,
    toggleLoading,
    error,
    setWeatherDayData,
    setError,
    weatherDayData,
    setCurrentLocation,
    isLoading,
  } = useContext(SearchContext);

  let currentLocation = (JSON.parse(localStorage.getItem('currentLocation')))?.city || 'Москва';
  console.log(currentLocation);
  currentLocation = currentLocation.replace(/['"]+/g, '');

  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    currentLocation.city && setInputValue(currentLocation.city);
  }, [searchPaneIsOpen]);

  useEffect(() => {
    setInputValue('');
    // Фокус на инпут при открытии панели
    if (searchPaneIsOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchPaneIsOpen]);

  const handleBlur = () => {
    inputValue === '' && currentLocation.city && setInputValue(currentLocation.city);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let currentLocationData = JSON.parse(localStorage.getItem('currentLocation'));
        let currentCity = currentLocationData?.city || 'Москва';

        await handleSearchCity(
          currentCity,
          searchedCities,
          setSearchedCities,
          setWeatherDayData,
          weatherDayData,
          setError,
          setCurrentLocation
        );
        setSearchPaneIsOpen(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setInputValue('');
      }
    };

    fetchData();
  }, []);

  const handleFocus = () => {
    inputValue === currentLocation.city && setInputValue(currentLocation.city);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    let currentLocation = (JSON.parse(localStorage.getItem('currentLocation')))?.city || 'Москва';
    if (currentLocation?.toLowerCase() === inputValue.toLowerCase()) {
      setError('вы уже просматриваете этот город');
      setTimeout(() => {
        setError(null);
      }, 5000);
    } else {
      handleSearchCity(
        inputValue,
        searchedCities,
        setSearchedCities,
        setWeatherDayData,
        weatherDayData,
        setError,
        currentLocation,
        setCurrentLocation,
      )
        .then(() => {
          setTimeout(
           ()=> {if (error === null) {
              setSearchPaneIsOpen(false);
            }},1500
          )
         
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };
  const handleListItemClick = (cityName) => {
    let currentLocation = (JSON.parse(localStorage.getItem('currentLocation')))?.city || 'Москва';
    if (currentLocation && currentLocation.toLowerCase() === cityName.toLowerCase()) {
      setError('вы уже просматриваете этот город');
      setTimeout(() => {
        setError(null);
      }, 5000);
    } else {
      handleSearchCity(
        cityName,
        searchedCities,
        setSearchedCities,
        setWeatherDayData,
        weatherDayData,
        setError,
        currentLocation,
        setCurrentLocation,
      )
        .then(() => {
          toggleLoading();
          return fetchWeather(currentLocation.lat, currentLocation.lon, setWeatherDayData);
        })
        .then(() => {
          setSearchPaneIsOpen(false);
          setError(null);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          toggleLoading();
        });
    }
  };

  return (
    <div className={`${style.searchPanel} ${searchPaneIsOpen ? style.open : ''}`}>
      <SearchForm
        handleClear={() => {
          if (searchPaneIsOpen && inputRef.current) {
            inputRef.current.focus();
          }
          setInputValue('');
        }}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleBlur={handleBlur}
        handleFocus={handleFocus}
        handleChange={handleChange}
        handleSearchClick={handleSearchClick}
        inputRef={inputRef}
        isLoading={isLoading}
      />
      <ul className={style.searchedCities}>
        {Array.isArray(searchedCities) &&
          searchedCities.reverse().map((cityName, index) => (
            <SearchedCityItem
              key={index}
              cityName={cityName}
              handleListItemClick={handleListItemClick}
              theme={theme}
            />
          ))}
      </ul>
      <svg
        alt='close'
        width='26'
        height='26'
        viewBox='0 0 26 26'
        xmlns='http://www.w3.org/2000/svg'
        role='button'
        className={style.closeButton}
        onClick={() => {
          setSearchPaneIsOpen(false);
          setInputValue(currentLocation);
        }}
      >
        <path
          d='M26 2.61857L23.3814 0L13 10.3814L2.61857 0L0 2.61857L10.3814 13L0 23.3814L2.61857 26L13 15.6186L23.3814 26L26 23.3814L15.6186 13L26 2.61857Z'
          fill={theme === 'dark' ? '#E6E6E6' : '#48484A'}
        />
      </svg>
      {error && <ErrorMessage error={error} setError={setError} />}
    </div>
  );
};