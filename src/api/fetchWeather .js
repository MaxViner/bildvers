const OP_WEATH_API_KEY = '3f93b16adb3d10bb424b2dda5dace557';

export const fetchWeather = async (lat, lon, setWeatherDayData) => {
  try {
    if (!lat || !lon) {
      return;
    }
  
    const latitude = typeof lat === 'object' ? lat.lat : lat;
    const longitude = typeof lon === 'object' ? lon.lon : lon;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OP_WEATH_API_KEY}&units=metric&lang=ru`
    );
    const data = await response.json();
    setWeatherDayData(data);
    

  } catch (error) {
    throw new Error(
      'не удалось загрузить данные о погоде'
    )
  }
};