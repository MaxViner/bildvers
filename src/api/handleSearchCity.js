

export const handleSearchCity = async (
  cityName,
  searchedCities,
  setSearchedCities,
  setError,
  setCurrentLocation
) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${cityName}&format=json&addressdetails=1&limit=1`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const cityData = {
        city: data[0]?.name,
        lat: data[0]?.lat,
        lon: data[0]?.lon,
      };
      if (!data[0]?.name) {
        setError('Упс...! город не найден, попробуйте снова')
        throw new Error('Упс...! город не найден, попробуйте снова');
      }
      localStorage.setItem('currentLocation', JSON.stringify(cityData));

      const cityExists =
        Array.isArray(searchedCities) &&
        searchedCities.some((searchedCity) => searchedCity === data[0]?.address?.city);
      if (!cityExists) {
        let updatedCities;
        if (searchedCities && Array.isArray(searchedCities) && searchedCities.length === 5) {
          updatedCities = [...searchedCities.slice(1), data[0]?.address?.city];
        } else {
          updatedCities = [...searchedCities || [], data[0]?.address?.city];
        }
        setSearchedCities(updatedCities);
        setCurrentLocation(cityData);
        localStorage.setItem('searchedCities', JSON.stringify(updatedCities));
      }
      return cityData;
    } else {
      throw new Error('Ошибка при получении данных о городе');
    }
  } catch (error) {
    setError(true);
    throw error;
  }
};