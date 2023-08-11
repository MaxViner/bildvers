import React, { useState, useEffect } from 'react';
import { handleSearchCity } from '../api/handleSearchCity';
import { fetchWeather } from '../api/fetchWeather ';

export const SearchContext = React.createContext({
  searchedCities: [],
  handleSearchCity: () => {},
  setSearchedCities: () => {},
  currentLocation: {},
  setCurrentLocation: () => {},
  isLoading: false,
  toggleLoading: () => {},
  error: null,
  setError: () => {},
  weatherDayData: {},
  setWeatherDayData: () => {},
});

export const SearchProvider = ({ children }) => {
  const [searchedCities, setSearchedCities] = useState(
    JSON.parse(localStorage.getItem('searchedCities')) || []
  );
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(
    localStorage.getItem('currentLocation') || {
      city: 'Moskov',
      lat: null,
      lon: null,
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [weatherDayData, setWeatherDayData] = useState({});

  useEffect(() => {
    if (currentLocation?.lat && currentLocation?.lon) {
      fetchWeather(currentLocation?.lat, currentLocation?.lon, setWeatherDayData);
    }
  }, [currentLocation]);

  const handleSearch = async (cityName) => {
    try {
      toggleLoading();
      const cityData = await handleSearchCity(
        cityName,
        searchedCities,
        setSearchedCities,
        setError,
        setCurrentLocation
      );
      if (!cityData.error) {
        setCurrentLocation(cityData);
        fetchWeather(cityData.lat, cityData.lon, setWeatherDayData);
        setError(null);
      } else {
        setError(cityData.error);
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
      setWeatherDayData((prevData) => prevData);
    } finally {
      toggleLoading();
    }
  };

  const toggleLoading = () => {
    setIsLoading((prevLoading) => !prevLoading);
  };

  return (
    <SearchContext.Provider
      value={{
        searchedCities,
        setSearchedCities,
        handleSearchCity: handleSearch,
        currentLocation,
        isLoading,
        toggleLoading,
        error,
        setError,
        weatherDayData,
        setWeatherDayData,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};