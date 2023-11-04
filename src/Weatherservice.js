const API_KEY = "fd55f2f2690066d8285bea419cef4c7b";

const getWeatherData = async (city, units = "m") => {
  const URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  const {
    current: { temperature, weather_descriptions, weather_icons },
    location: { name, country },
  } = data;

  return {
    temperature,
    name,
    country,
    weather_descriptions,
    weather_icons,
  };
};

export { getWeatherData };
