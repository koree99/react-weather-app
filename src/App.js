import { useEffect, useState } from "react";
import { getWeatherData } from "./Weatherservice.js";

export default function App() {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData("paris");
      setWeather(data);
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="container">
      <Form />
      {weather && (
        <div className="weather-list">
          <ul className="weather">
            <h1>
              {weather.temperature} °C, {weather.weather_descriptions}
            </h1>
            <img src={weather.weather_icons} alt="weathericon" />
            <p>{`${weather.name}, ${weather.country}`}</p>
          </ul>
        </div>
      )}
    </div>
  );
}

function Form() {
  return (
    <form className="add-group">
      <input type="text" placeholder="Cities" />
      <button>Search</button>
    </form>
  );
}
