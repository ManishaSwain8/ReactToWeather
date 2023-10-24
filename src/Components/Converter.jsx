import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Navbar from './Navbar';
export default function Converter(){
  const [inputType, setInputType] = useState("Celsius");
  const [outputType, setOutputType] = useState("Celsius");
  const [changedTemp, setChangedTemp] = useState("");
  const handleInputTypeChange = (e) => {
    setInputType(e.target.value);
  };
  const handleOutputTypeChange = (e) => {
    setOutputType(e.target.value);
  }
  const call = async (e) => {
    e.preventDefault();
    let temp = "";
    temp = e.target.elements.temp.value;

    try {
      if (inputType === "Celsius" && outputType === "Celsius") {
        setChangedTemp(+(temp));
      } else if (inputType === "Celsius" && outputType === "Kelvin") {
        setChangedTemp(+(temp)+273.15);
      }else if (inputType === "Celsius" && outputType === "Farhenheit") {
        setChangedTemp(+(temp)*(9/5)+32);
      }else if (inputType === "Kelvin" && outputType === "Celsius") {
        setChangedTemp(+(temp)-273.15);
      }else if (inputType === "Kelvin" && outputType === "Farhenheit") {
        setChangedTemp((+(temp)-273.15)*(9/5)+32);
      }else if (inputType === "Kelvin" && outputType === "Kelvin") {
        setChangedTemp(+(temp));
      }else if (inputType === "Farhenheit" && outputType === "Celsius") {
        setChangedTemp((+(temp)-32)*5/9);
      }else if (inputType === "Farhenheit" && outputType === "Kelvin") {
        setChangedTemp((+(temp)-32)*(5/9)+273.15);
      }else{
        setChangedTemp(+(temp));
      }

    } catch (error) {
      if (error.response && error.response.status === 404) {
        //Error handeling done using try and catch block .
        toast.error("Inavlid city name");
       
      } else {
        console.error("Error occured while fetching API data.");
        
      }
    
    }
  };
    return(
        <div className="app">
           <Navbar />
           <div className="search">
        <form onSubmit={call} className="flex flex-col md:flex-row items-center md:items-center lg:pl-9">
          <select
            onChange={handleInputTypeChange}
            className="dropdown-menu mx-auto sm:mx-0 mt-4"
            value={inputType}
          >
            <option value="Celsius">Celsius</option>
            <option value="Kelvin">Kelvin</option>
            <option value="Farhenheit">Farhenheit</option>
          </select>

          <input
                type="text"
                placeholder="Enter Temperature"
                name="temp"
                className="m-2 lg:w-1/4 w-max"
              />
              <select
            onChange={handleOutputTypeChange}
            className="dropdown-menu mx-auto sm:mx-0 mt-4"
            value={outputType}
          >
            <option value="Celsius">Celsius</option>
            <option value="Kelvin">Kelvin</option>
            <option value="Farhenheit">Farhenheit</option>
          </select>
              <input
                type="text"
                placeholder="Changed Temperature"
                name="ctemp"
                className="m-2 lg:w-1/4 w-max"
                value={changedTemp}
              />
              <button className="m-4 px-12 py-2.5 md:py-1.8 mt-4 transition-all ease-in duration-75 bg-gradient-to-r from-purple-950 from-20% via-purple-900 via-60% to-purple-800 to-80% rounded-full hover:scale-105 font-bold">
            Convert Temp
          </button>
        </form>
        </div>
        </div>
    )
}
