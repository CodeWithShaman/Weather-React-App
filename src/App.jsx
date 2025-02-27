import React, { useState } from 'react';
import { Search, MapPin, Wind } from 'react-feather';
import getWeather from './components/Api'; // Assuming this is where your weather API function is
import dateFormat from 'dateformat';
import './App.css';

function App() {
  const [city, setCity] = useState(''); // Stores the current input value
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]); // To hold filtered city suggestions

  // Predefined cities list for suggestions
  const cities = ['Hyderabad,PK', 'Karachi,PK', 'Hyderabad,IND'];

  // Function to fetch weather data for the selected city
  const getWeatherCity = async (selectedCity) => {
    if (!selectedCity.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await getWeather(selectedCity); // API call to get weather data
      setWeather(data);
      setCity(selectedCity); // Update the input field with the selected city
      setSuggestions([]); // Clear suggestions
    } catch (error) {
      setError('City not found!');
      setWeather(null);
    }
    setLoading(false);
  };

  // Function to handle input changes and filter city suggestions
  const handleInputChange = (e) => {
    const query = e.target.value;
    setCity(query);

    // Filter cities based on input
    if (query) {
      const filteredCities = cities.filter((cityName) =>
        cityName.toLowerCase().includes(query.toLowerCase()) // case-insensitive search
      );
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  // Function to handle selecting a city from the suggestions list
  const handleSelectCity = (cityName) => {
    getWeatherCity(cityName); // Fetch weather data for the selected city
  };

  // Render current date and time
  const renderDate = () => {
    return dateFormat(new Date(), "dddd, mmmm dS, h:MM TT");
  };

  return (
    <div className="app">
      <h1 className="title">Weather App</h1>

      <div className="input-wrapper">
        {/* Search input field */}
        <input
          type="text"
          className="input"
          value={city}
          onChange={handleInputChange} // Call function on input change
          placeholder="Enter City Name"
        />

        {/* Display filtered suggestions */}
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSelectCity(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Loading state */}
      {loading && <div className="loading">Loading...</div>}

      {/* Error state */}
      {error && <div className="error">{error}</div>}

      {/* Weather data display */}
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
