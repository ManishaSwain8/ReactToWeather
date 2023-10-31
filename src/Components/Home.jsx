import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import WeatherDetails from "./WeatherDetails";
import ForecastCard from "./ForecastCard";
import toast from "react-hot-toast";
import Loader from "react-js-loader";
import Footer from "./Footer";


import Navbar from './Navbar';
import Converter from './Converter';

import Maps from "./Maps";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import micOn from "../assets/micOn.png";
import micOff from "../assets/micOff.png";
import LocationLogger from "./LocationLogger";

const TextSearch = ({ setCity }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setCity(transcript);
  }, [transcript]);

  return (
    <div className="mic-container h-[50px] w-[50px]">
      {!browserSupportsSpeechRecognition ? (
        <img alt="Mic Off" src={micOff} className="p-2" />
      ) : listening ? (
        <img
          alt="Mic On"
          src={micOn}
          className="p-2"
          onClick={() => {
            SpeechRecognition.stopListening();
          }}
        />
      ) : (
        <img
          alt="Mic Off"
          src={micOff}
          className="p-2"
          onClick={() => {
            SpeechRecognition.startListening();
            resetTranscript();
          }}
        />
      )}
    </div>
  );
};


export default function Home() {
  const [weather, setWeather] = useState("");
  const [forecast, setForecast] = useState([]);
  const [units, setUnits] = useState("metric");
  const [showForecast, setShowForecast] = useState(false);
  const [inputType, setInputType] = useState("city");
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [showMap,setShowMap] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY; //api removed for security reasons(find api key info from readme.md ) 


  const handleInputTypeChange = (e) => {
    setInputType(e.target.value);
    if(e.target.value === "city" && showMap){
      setShowMap(false);

    }
  };

  const renderTemperature = (value) => {
    if (units === "metric") {
      return `${value}°C`;
    }
    if (units === "imperial") {
      return `${value}°F`;
    }
    return `${value}K`;
  };

  // Function to fetch weather data

  const fetchWeatherData = async (loc, lat, lon, units) => {
    let url;
    if (loc) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=${units}`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    }

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
        condition: res.data.weather[0].main,
      };
    } catch (error) {
      toast.error("Error while fetching data from API");
      console.error("Error occurred while fetching API data.");
      throw error;
    }
  };

  // Function to fetch weather data for 7 days (forecast)
  const fetchForecastData = async (loc, lat, lon, units) => {
    let forecastURL;
    if (loc) {
      forecastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${loc}&cnt=7&APPID=eec48f1630281ec926acbcbb20931f70&units=${units}`;
    } else if (lat && lon) {
      forecastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&APPID=eec48f1630281ec926acbcbb20931f70&units=${units}`;
    }

    try {
      const forecastRes = await axios.get(forecastURL);
      const forecastData = forecastRes.data.list.map((day) => ({
        date: day.dt,
        temperature: day.temp.day,
        description: day.weather[0].description,
        humidity: day.humidity,
        wind: day.speed,
      }));
      return forecastData;
    } catch (error) {
      toast.error("Error while fetching data from API");
      console.error("Error occurred while fetching forecast data.");
      throw error;
    }
  };

  const apiCall = async (e) => {
    e.preventDefault();
    setLoading(true);
    let loc = "";
    let lat = "";
    let lon = "";

    if (inputType === "city") {
      loc = e.target.elements.loc.value;
    } else if (inputType === "coordinates") {
      lat = e.target.elements.lat.value;
      lon = e.target.elements.lon.value;
    }

    try {
      const [newWeatherData, forecastData] = await Promise.all([
        fetchWeatherData(loc, lat, lon, units),
        fetchForecastData(loc, lat, lon, units),
      ]);

      setWeather(newWeatherData);
      setForecast(forecastData);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        //Error handeling done using try and catch block .
        toast.error("Inavlid city name");
        setWeather("");
      } else {
        console.error("Error occured while fetching API data.");
        setWeather("");
      }
      setLoading(false);
    }
  };

  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };

  const updateWeatherData = async (selectedUnit = units) => {
    if (weather && weather.city) {
      try {
        const [newWeatherData, forecastData] = await Promise.all([
          fetchWeatherData(weather.city, null, null, selectedUnit),
          fetchForecastData(weather.city, null, null, selectedUnit),
        ]);
        setWeather(newWeatherData);
        setForecast(forecastData);
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

  const handleUnitChange = (selectedUnit) => {
    updateWeatherData(selectedUnit);
  };
  const handleMapChange = () =>{
    setShowMap(!showMap);
  }
  return (
    //On clicking the button of GetWeather the api gets called and fetched and data is displayed.

    <div className="app">
      
    <Navbar />
      <div className="search">
        <LocationLogger/>
        <form
          onSubmit={apiCall}
          className="flex flex-col md:flex-row items-center md:items-center lg:pl-9"
        >
          <select
            onChange={handleInputTypeChange}
            className="dropdown-menu mx-auto sm:mx-0 mt-4"
            value={inputType}
          >
            <option value="city">Enter City</option>
            <option value="coordinates">Enter Latitude and Longitude</option>
          </select>

          {inputType === "city" ? (
            <div className="city-input flex flex-col md:flex-row items-center gap-4 justify-between w-full lg:ml-4 flex-1">
              <input
                type="text"
                placeholder="Enter your city"
                name="loc"
                className="border-none outline-none flex-1"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextSearch setCity={setCity} />
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter latitude"
                name="lat"
                className="m-2 lg:w-1/4 w-max"
              />
              <input
                type="text"
                placeholder="Enter longitude"
                name="lon"
                className="m-2 lg:w-1/4 w-max"
              />
              <button type="button"  className="m-4 px-12 py-2.5 md:py-1.8 mt-4 transition-all ease-in duration-75 bg-gradient-to-r from-purple-950 from-20% via-purple-900 via-60% to-purple-800 to-80% rounded-full hover:scale-105 font-bold" onClick={handleMapChange}> {showMap ? "Hide Map" : "Show Map"} </button>
              <br />
            </>
          )}
<div>
          <button className="m-4 px-12 py-2.5 md:py-1.8 mt-4 transition-all ease-in duration-75 bg-gradient-to-r from-purple-950 from-20% via-purple-900 via-60% to-purple-800 to-80% rounded-full hover:scale-105 font-bold">
            Get Weather
          </button>
          {/* Toggle button for forecast */}
          <button
            className="m-3 px-11 py-2.5 mt-4 transition-all ease-in duration-75 bg-gradient-to-r from-purple-950 from-20% via-purple-900 via-60% to-purple-800 to-80% rounded-full hover:scale-105 font-bold ml-4"
            onClick={toggleForecast}
          >
            {showForecast ? "Hide Forecast" : "Show Forecast"}
          </button>
          </div>
        </form>
        <div>
        {showMap && <>
        <Maps></Maps>
        </>}
        </div>
        {loading ? ( // Conditionally render the loader while loading is true
          <div className="loader-container">
            <Loader
              type="bubble-top"
              bgColor={"#6709AB"}
              title={""}
              size={80}
            />
          </div>
        ) : (
          <>
            {weather && (
              <div className="md:justify-center">
                <WeatherDetails
                  units={units}
                  handleUnitChange={handleUnitChange}
                  weather={weather}
                  renderTemperature={renderTemperature}
                />
              </div>
            )}
          </>
        )}

        {/* Render the forecast if showForecast is true */}
        {showForecast && (
          <div className="forecast-row place-items-center place-self-center">
            {forecast.map((day) => (
              <ForecastCard
                key={day.date}
                date={new Date(day.date * 1000).toDateString()}
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
      <Footer />
    </div>
  );
}