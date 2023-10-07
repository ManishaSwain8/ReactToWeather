import React, { useState } from 'react';
import axios from 'axios';
import { WiHumidity } from 'react-icons/wi';
import { FaLeaf } from 'react-icons/fa';
import { FiWind } from 'react-icons/fi';
import { CiLocationOn } from 'react-icons/ci';
import { GiMountains } from 'react-icons/gi';
import { Center, Box, SegmentedControl } from '@mantine/core';
import ForecastCard from './ForecastCard';

export default function Home() {
  const [weather, setWeather] = useState('');
  const [forecast, setForecast] = useState([]);
  const apiKey = '58f4ff45ae64ddc14419863f7ae969dc';
  const forcastKey = 'eec48f1630281ec926acbcbb20931f70';
  const [units, setUnits] = useState('metric');
  const [showForecast, setShowForecast] = useState(false);

  const renderTemperature = (value) => {
    if (units === 'metric') {
      return `${value}°C`;
    }
    if (units === 'imperial') {
      return `${value}°F`;
    }
    return `${value}K`;
  };

  const apiCall = async (e) => {
    e.preventDefault();
    const loc = e.target.elements.loc.value;
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=${units}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${loc}&cnt=7&APPID=${forcastKey}&units=${units}`;


    try {
      const [currentRes, forecastRes] = await Promise.all([axios.get(currentWeatherURL), axios.get(forecastURL)]);
      console.log('Current Weather API Response:', currentRes.data);
      console.log('Forecast API Response:', forecastRes.data);
      const forecastData = forecastRes.data.list.map((day) => ({
        date: day.dt,
        temperature: day.temp.day,
        description: day.weather[0].description,
        humidity: day.humidity,
        wind: day.speed,
      }));

      setWeather({
        descp: currentRes.data.weather[0].description,
        temp: currentRes.data.main.temp,
        city: currentRes.data.name,
        humidity: currentRes.data.main.humidity,
        wind: currentRes.data.wind.speed,
        feel: currentRes.data.main.feels_like,
      });
      setForecast(forecastData);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Please enter a valid city name.');
      } else {
        console.error('Error occurred while fetching API data.');
      }
    }
  };

  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };

  const Weather = () => {
    return (
      <div className="container">
        <div>
          <div className="mt-2">
            <SegmentedControl
              radius="lg"
              color="rgba(103, 9, 171, 1)"
              value={units}
              onChange={setUnits}
              data={[
                {
                  value: 'standard',
                  label: (
                    <Center>
                      <Box>Kelvin</Box>
                    </Center>
                  ),
                },
                {
                  value: 'metric',
                  label: (
                    <Center>
                      <Box>Celsius</Box>
                    </Center>
                  ),
                },
                {
                  value: 'imperial',
                  label: (
                    <Center>
                      <Box>Fahrenheit</Box>
                    </Center>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <div className="top">
          <div className="text-left ">
            <div className="flex gap-2">
              <p className="text-3xl">{weather.city}</p>
              <CiLocationOn size={25} />
            </div>
            <div className="text-7xl font-bold mt-2 max-sm:text-6xl">
              {renderTemperature(weather.temp)}
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <GiMountains size={25} />
          <p className="description">
            Today's weather is {weather.descp} in {weather.city}.
          </p>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="text-2xl font-bold">{renderTemperature(weather.feel)}</p>
            <div className="flex gap-1 max-sm:ml-14">
              Feels like:
              <FaLeaf size={20} />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold">{weather.humidity}%</p>
            <div className="flex gap-1 max-sm:ml-14">
              Humidity:
              <WiHumidity size={25} />
            </div>
          </div>
          <div className="">
            <p className="text-2xl font-bold">{weather.wind}MPH</p>
            <div className="flex gap-1 max-sm:ml-14">
              Wind speed:
              <FiWind size={25} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <div className="search">
        <form onSubmit={apiCall}>
          <input type="text" placeholder="Enter your city" name="loc" />
          <button className="ml-4 px-8 py-2.5 mt-4 transition-all ease-in duration-75 bg-gradient-to-r from-purple-950 from-20% via-purple-900 via-60% to-purple-800 to-80% rounded-full hover:scale-105 font-bold">
            Get Weather
          </button>
        </form>
        {weather && <Weather />}

        {/* Toggle button for forecast */}
        <button
          className="ml-4 px-8 py-2.5 mt-4 transition-all ease-in duration-75 bg-gradient-to-r from-purple-950 from-20% via-purple-900 via-60% to-purple-800 to-80% rounded-full hover:scale-105 font-bold"
          onClick={toggleForecast}
        >
          {showForecast ? 'Hide Forecast' : 'Show Forecast'}
        </button>

        {/* Render the forecast if showForecast is true */}
        {showForecast && (
          <div className="forecast-row">
            {forecast.map((day) => (
              <ForecastCard
                key={day.date}
                date={new Date(day.date * 1000).toDateString()} // Convert timestamp to a readable date
                temperature={day.temperature}
                description={day.description}
                humidity={day.humidity}
                wind={day.wind}
                units={units}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
