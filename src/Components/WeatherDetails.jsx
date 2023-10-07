import React from "react";
import "../index.css";
import { WiHumidity } from "react-icons/wi";
import { FaLeaf } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { GiMountains } from "react-icons/gi";
import { Center, Box, SegmentedControl } from "@mantine/core";

// The weather box component
export default function WeatherDetails({units, handleUnitChange, weather, renderTemperature}) {
    return (
        <div className="container">
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
}