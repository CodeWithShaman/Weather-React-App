import axios from 'axios';

const getWeather = async (city) => {
  const apiKey = '12a14519b3a276166c83c81a19d1c4fe'; // Replace with your OpenWeather API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${}&appid=${apiKey}&units=metric}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('City not found!');
  }
};

export default getWeather;
