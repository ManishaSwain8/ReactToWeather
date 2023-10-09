import React from "react";
import "../index.css";
import { WiHumidity } from "react-icons/wi";
import { FaLeaf } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { GiMountains } from "react-icons/gi";
import { Center, Box, SegmentedControl } from "@mantine/core";
import backgroundsData from '../data/backgrounds.json'

function getBackgroundImgUrl(condition) {
  const backgroundImg = backgroundsData.find(obj => obj.condition === condition)?.backgroundImg;
  return backgroundImg || `url(https://source.unsplash.com/random?${condition})`;
}
// The weather box component
export default function WeatherDetails({ units, handleUnitChange, weather, renderTemperature }) {
  const backgroundImgUrl = getBackgroundImgUrl(weather.condition);
  const containerStyle = {
    backgroundImage: `${backgroundImgUrl}`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  };
    return (
        <div className="container bg-blend-multiply" style={containerStyle}>
          {" "}
          <div>
            <div className="mt-2">
              <SegmentedControl //Converts temp from (Celsius to Kelvin or Kelvin to Celsius or etc)
                radius="lg"
                color="rgba(103, 9, 171, 1)"
                value={units}
                onChange={handleUnitChange}
                data={[
                  {
                    value: "standard",
                    label: (
                      <Center>
                        <Box className="hidden sm:block">Kelvin</Box>
                        <Box className="sm:hidden">K</Box>
                      </Center>
                    ),
                  },
                  {
                    value: "metric",
                    label: (
                      <Center>
                        <Box className="hidden sm:block">Celsius</Box>
                        <Box className="sm:hidden">°C</Box>
                      </Center>
                    ),
                  },
                  {
                    value: "imperial",
                    label: (
                      <Center>
                        <Box className="hidden sm:block">Fahrenheit</Box>
                        <Box className="sm:hidden">°F</Box>
                      </Center>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div className="top">
            <div className="text-left ">
              <div className="flex gap-2 m-2">
                <p className="text-2xl sm:text-3xl">{weather.city}</p>
                <CiLocationOn size={25} />
              </div>
              <div className="text-5xl sm:text-7xl font-bold m-2">
                {renderTemperature(weather.temp)}
              </div>
            </div>
          </div>
          <div className="flex gap-1 m-1">
            <GiMountains size={25} />
            <p className="description">
              Today's weather is {weather.descp} in {weather.city}.
            </p>
          </div>
          <div className="bottom">
            <div className="feels">
              <div className="weather-attribute m-2">
                <div className="text-2xl font-bold">
                  {renderTemperature(weather.feel)}
                </div>
                <div className="flex gap-1 place-content-center">
                  Feels like:
                  <FaLeaf size={20} />
                </div>
              </div>
            </div>
            <div>
              <div className="weather-attribute m-2">
                <div className="text-2xl font-bold">{weather.humidity}%
                </div>
                <div className="flex gap-1 place-content-center">
                  Humidity:
                  <WiHumidity size={25} />
                </div>
              </div>
            </div>
            <div className="">
              <div className="weather-attribute m-2">
                <div className="text-2xl font-bold ">{weather.wind}MPH
                </div>
                <div className="flex gap-1 place-content-center">
                  Wind speed:
                  <FiWind size={25} />
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      );
}