import React from "react";
import { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import WeatherDetails from "./WeatherDetails";
import toast from "react-hot-toast";

export default function Home() {
  const [weather, setWeather] = useState("");
  const [units, setUnits] = useState("metric");

  //api removed for security reasons(find api key info from readme.md )
  const apiKey = "111cea304b54b49df94e294221cc8b63";

  // Used to display the temperature details in a readable manner
  const renderTemperature = (value) => {
    if (units === "metric") {
      return `${value}\u00b0C`;
    }
    if (units === "imperial") {
      return `${value}\u00b0F`;
    }
    return `${value}\u212A`;
  };

  // Function to fetch weather data
  const fetchWeatherData = async (loc, units) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=${units}`;

    try {
      const res = await axios.get(url);
      toast.success("Search Successful");
      return {
        descp: res.data.weather[0].description,
        temp: res.data.main.temp,
        city: res.data.name,
        humidity: res.data.main.humidity,
        wind: res.data.wind.speed,
        feel: res.data.main.feels_like,
      };
    } catch (error) {
      toast.error("Error while fetching data from API");
      console.error("Error occurred while fetching API data.");
      throw error;
    }
  };

  // Runs when the user submits the form with the location data
  const apiCall = async (e) => {
    e.preventDefault();
    const loc = e.target.elements.loc.value;

    try {
      const newWeatherData = await fetchWeatherData(loc, units);
      setWeather(newWeatherData);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        //Error handeling done using try and catch block .
        toast.error("Inavlid city name");
        setWeather("");
      } else {
        console.error("Error occured while fetching API data.");
        setWeather("");
      }
    }
  };

  // Function to update weather data when the unit changes
  const updateWeatherData = async (selectedUnit = units) => {
    if (weather.city) {
      try {
        const newWeatherData = await fetchWeatherData(
          weather.city,
          selectedUnit
        );
        setWeather(newWeatherData);
        setUnits(selectedUnit);
      } catch (error) {
        // Handle error if needed
      }
    }
  };

  // Add useEffect to update weather data when the unit changes
  // useEffect(() => {
  //   updateWeatherData();
  // }, [units]);

  // Function to handle unit button click and update units state
  const handleUnitChange = (selectedUnit) => {
    updateWeatherData(selectedUnit);
  };

  return (
    //On clicking the button of GetWeather the api gets called and fetched and data is displayed.
    <div className="app">
      <div className="search">
        <form onSubmit={apiCall}>
          <input type="text" placeholder="Enter your city" name="loc" />
          <button className=" ml-4 px-8 py-2.5 mt-4 transition-all ease-in duration-75 bg-gradient-to-r from-purple-950 from-20% via-purple-900 via-60% to-purple-800 to-80% rounded-full hover:scale-105 font-bold">
            Get Weather
          </button>
        </form>
        {weather && (
          <WeatherDetails
            units={units}
            handleUnitChange={handleUnitChange}
            weather={weather}
            renderTemperature={renderTemperature}
          />
        )}
      </div>
    </div>
  );
}
