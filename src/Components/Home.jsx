import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import { WiHumidity } from "react-icons/wi";
import { FaLeaf } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { GiMountains } from "react-icons/gi";
import { Center, Box, SegmentedControl } from "@mantine/core";

export default function Home() {
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const apiKey = "fcfc1bf78d9e9327060d9e2e8c00f2ba"; //api removed for security reasons(find api key info from readme.md )
  const [units, setUnits] = useState("metric");
  const [inputType, setInputType] = useState('city');

  const handleSelectChange = (e) => {
    setInputType(e.target.value);
  };

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
    setWeather("");
    const locElement = e.target.elements.loc;
    const latElement = e.target.elements.lat;
    const lonElement = e.target.elements.lon;

    const loc = locElement ? locElement.value : null;
    const lat = latElement ? latElement.value : null;
    const lon = lonElement ? lonElement.value : null;

    const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=${units}`; //API url from OpenWeatherMap
    const url2=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    try {
      let url;
      if (inputType === 'city' && loc) {
        url = url1;
      } else if (inputType === 'coordinates' && lat && lon) {
        url = url2;
      } else {
        alert("Please enter a city name or latitude and longitude coordinates.");
        return;
      }
      const res = await axios.get(url);
      setWeather({
        descp: res.data.weather[0].description, //fetching data from API
        temp: res.data.main.temp,
        city: res.data.name,
        humidity: res.data.main.humidity,
        wind: res.data.wind.speed,
        feel: res.data.main.feels_like,
      });
      setCity(res.data.name);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Please enter valid city name or latitude and longitude coordinates.");
      } else {
        console.error("Error occurred while fetching API data.");
      }
    }
    if (latElement) latElement.value = "";
    if (lonElement) lonElement.value = "";
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
    <div className="app">
      <div className="search">
        <form onSubmit={apiCall}>
          <select onChange={handleSelectChange} className="dropdown-menu">
            <option value="city">Enter City</option>
            <option value="coordinates">Enter Latitude and Longitude</option>
          </select>

          {inputType === 'city' ? (
            <input type="text" placeholder="Enter your city" name="loc" />
          ) : (
            <>
              <input type="text" placeholder="Enter latitude" name="lat" />
              <input type="text" placeholder="Enter longitude" name="lon" />
            </>
          )}

          <button className=" ml-4 px-8 py-2.5 mt-4 transition-all ease-in duration-75 bg-gradient-to-r from-purple-950 from-20% via-purple-900 via-60% to-purple-800 to-80% rounded-full hover:scale-105 font-bold">
            Get Weather
          </button>
        </form>

        {weather && <Weather />}
      </div>
    </div>
  );
}
