export const interpolateWeatherData = (weatherForecast) => {
    console.log(weatherForecast);
    const interpolatedData = [];
    for (let i = 0; i < weatherForecast.length - 1; i++) {
      const currentTime = new Date(weatherForecast[i].dt_txt);
      const nextTime = new Date(weatherForecast[i + 1].dt_txt);
      const timeDiff = nextTime - currentTime;
      const hoursDiff = timeDiff / (1000 * 60 * 60);
  
      const currentTemp = weatherForecast[i].main.temp;
      const nextTemp = weatherForecast[i + 1].main.temp;
      const temperatureDiff = nextTemp - currentTemp;
      const temperatureStep = temperatureDiff / hoursDiff;
  
      const currentWeather = weatherForecast[i].weather[0];
      const nextWeather = weatherForecast[i + 1].weather[0];
  
      for (let j = 0; j < hoursDiff; j++) {
        const interpolatedTime = new Date(currentTime.getTime() + j * (1000 * 60 * 60));
        const interpolatedTimeFormatted = interpolatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const interpolatedTemp = currentTemp + temperatureStep * j;
  
        const interpolatedWeather = {
          id: currentWeather.id,
          main: currentWeather.main,
          description: currentWeather.description,
          icon: currentWeather.icon,
        };
  
        if (temperatureDiff > 0 && j >= Math.floor(hoursDiff / 2)) {
          interpolatedWeather.id = nextWeather.id;
          interpolatedWeather.main = nextWeather.main;
          interpolatedWeather.description = nextWeather.description;
          interpolatedWeather.icon = nextWeather.icon;
        }
  
        interpolatedData.push({
          time: interpolatedTimeFormatted,
          temperature: interpolatedTemp,
          weather: interpolatedWeather,
        });
      }
    }
    return interpolatedData;
  };