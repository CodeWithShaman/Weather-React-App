import { useState } from 'react';
import { Search, MapPin, Wind } from 'react-feather';
import getWeather from './components/Api';
import dateFormat from 'dateformat';
// import Card from './components/Card.jsx'
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeatherCity = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await getWeather(city);
      setWeather(data);
      setCity('');
    } catch (error) {
      setError('City not found!');
      setWeather(null);
    }
    setLoading(false);
  };

  const renderDate = () => {
    return dateFormat(new Date(), "dddd, mmmm dS, h:MM TT");
  };

  return (
    <div className="app">
      <h1 className="title">Weather App</h1>
      <br />
      <div className="input-wrapper">
        <input className='input'
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter location"
        />
        <button onClick={getWeatherCity}>
          <Search />
        </button>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {error && <div className="error">{error}</div>}

      {weather && weather.weather && (
        <div className="weather-info">
          <div className="location">
            
            <MapPin />
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
          </div>
          <p className="date">{renderDate()}</p>
          <div className="weather-details">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <h3>{weather.weather[0].description}</h3>
          </div>
          <div className="temperature">
            <h1>{weather.main.temp}°C</h1>
            <h3>Feels like: {weather.main.feels_like}°C</h3>
          </div>
          <div className="wind">
            <Wind />
            <h3>Wind: {weather.wind.speed} km/h</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
