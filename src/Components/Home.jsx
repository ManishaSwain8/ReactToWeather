import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import { WiHumidity } from "react-icons/wi";
import { FaLeaf } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { GiMountains } from "react-icons/gi";
import { Center, Box, SegmentedControl } from "@mantine/core";
import Loader from "react-js-loader"; // Import the  Loader component

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const apiKey = "Your API key"; // API key (removed for security reasons, find API key info in readme.md)
  const [units, setUnits] = useState("metric");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading status


  const renderTemperature = (value) => {
    if (units === "metric") {
      return `${value}\u00b0C`;
    }
    if (units === "imperial") {
      return `${value}\u00b0F`;
    }
    return `${value}\u212A`;
  };

  const apiCall = async (e) => {
    e.preventDefault();
    const loc = e.target.elements.loc.value;
    if (!loc) {
      setError("Please enter a city name.");
      return
    }

    setLoading(true); // Set loading to true when making the API call


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=${units}`;

    try {
      const res = await axios.get(url);
      setWeather({
        descp: res.data.weather[0].description,
        temp: res.data.main.temp,
        city: res.data.name,
        humidity: res.data.main.humidity,
        wind: res.data.wind.speed,
        feel: res.data.main.feels_like,
      });
      setCity(res.data.name);
      setError(null);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("City not found, please check the city name and try again.");
      } else {
        setError("An error occurred while fetching API data.");
      }
      setWeather(null);
    } finally {
      setLoading(false); // Set loading to false when API call is completed
    }

  };

  const Weather = () => {
    return (
      <div className="container">
        {" "}
        <div>
          <div className="mt-2">
            <SegmentedControl //Converts temp from (Celsius to Kelvin or Kelvin to Celsius or etc)
              radius="lg"
              color="rgba(103, 9, 171, 1)"
              value={units}
              onChange={setUnits}
              data={[
                {
                  value: "standard",
                  label: (
                    <Center>
                      <Box>Kelvin</Box>
                    </Center>
                  ),
                },
                {
                  value: "metric",
                  label: (
                    <Center>
                      <Box>Celsius</Box>
                    </Center>
                  ),
                },
                {
                  value: "imperial",
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
              <p className="text-3xl  ">{weather.city}</p>
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
            <p className="text-2xl font-bold">
              {renderTemperature(weather.feel)}
            </p>
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
            <p className="text-2xl font-bold ">{weather.wind}MPH</p>
            <div className="flex gap-1 max-sm:ml-14">
              Wind speed:
              <FiWind size={25} />
            </div>
          </div>
        </div>{" "}
      </div>
    );
  };
  return (
    //On clicking the button of GetWeather the api gets called and fetched and data is displayed.
    <div className="app">
      <div className="search">
        <form onSubmit={apiCall}>
          <input type="text" placeholder="Enetr your city" name="loc" />

          <button className=" ml-4 px-8 py-2.5 mt-4 transition-all ease-in duration-75 bg-gradient-to-r from-purple-950 from-20% via-purple-900 via-60% to-purple-800 to-80% rounded-full hover:scale-105 font-bold">
            Get Weather
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          // Display the loader while loading is true
          <div className="loader-container">
            <Loader type="bubble-top" bgColor={"#FFFFFF"} title={"Loading"} color={'#FFFFFF'} size={100} />
          </div>
        ) : (
          // Display the Weather component when loading is false
          weather && <Weather />
        )}
      </div>
    </div>
  );
}
