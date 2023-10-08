import React from 'react';

const ForecastCard = ({ date, temperature, description, humidity, wind, units }) => {
  const renderTemperature = (value) => {
    if (units === 'metric') {
      return `${value}°C`;
    }
    if (units === 'imperial') {
      return `${value}°F`;
    }
    return `${value}K`;
  };

  const weatherEmojis = {
    'clear sky': '☀️',
    'few clouds': '🌤️',
    'scattered clouds': '⛅',
    'broken clouds': '☁️',
    'shower rain': '🌧️',
    'rain': '🌧️',
    'thunderstorm': '⛈️',
    'snow': '❄️',
    'mist': '🌫️',
  };

  const weatherEmoji = weatherEmojis[description.toLowerCase()] || '🌦️';

  return (
    <div className="forecast-card">
      <h3>
        {date} {weatherEmoji}
      </h3>
      <p>Temperature: {renderTemperature(temperature)}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind speed: {wind} MPH</p>
    </div>
  );
};

export default ForecastCard;
