const OP_WEATH_API_KEY = '3f93b16adb3d10bb424b2dda5dace557'; 
 
export const fetchDayForecast = async (latitude, longitude) => { 
  const apiUrl =  `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OP_WEATH_API_KEY}&lang=en&units=metric` ; 
 
  try { 
    const response = await fetch(apiUrl); 
    if (!response.ok) { 
      throw new Error('Не удалось получить прогноз'); 
    } 
    const weatherForecast = await response.json(); 
    return weatherForecast; 
  } catch (error) { 
    console.error('Не удалось получить прогноз:', error); 
    return null; 
  } 
}; 



