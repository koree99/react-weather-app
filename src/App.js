import { useEffect, useState } from "react";
import { getWeatherData } from "./Weatherservice.js";

export default function App() {
  const [city, setCity] = useState("paris");
  const [location, setLocation] = useState();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    //on first load, get current position of client
    navigator.geolocation.getCurrentPosition(showPosition);
  }, [location]);

  const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    //set location to client position
    setLocation({
      lat,
      lon,
    });
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city);
      setWeather(data);
    };

    fetchWeatherData();
  }, [city]);

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="container">
      <h3>Weather App</h3>
      <form className="add-group">
        <input
          onKeyDown={enterKeyPressed}
          type="text"
          name="city"
          placeholder="Enter city..."
        />
      </form>
      {weather && (
        <div className="weather-list">
          <div className="weather">
            <h1>{`${weather.name}, ${weather.country}`}</h1>
            <img src={weather.weather_icons} alt="weathericon" />
            <h1>{weather.weather_descriptions}</h1>
          </div>
          <div className="section-temp">
            <h2>{weather.temperature} °C</h2>
          </div>
        </div>
      )}
      {/* <div className="cities">
        <h3>15 largest cities in the world</h3>
        <p></p>
      </div> */}
    </div>
  );
}
