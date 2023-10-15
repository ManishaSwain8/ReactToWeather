import React from "react";
import { BsFillCloudSunFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="font-bold bg-black flex justify-between  px-4 py-3 items-center">
      <div className="flex gap-4 items-center ">
        <BsFillCloudSunFill size={30} className="cursor-pointer" />
        <div className="cursor-pointer">ReactToWeather</div>
      </div>
      <div className="flex gap-4 ">
        <p className="cursor-pointer hover:bg-slate-500 p-2 rounded-lg">Home</p>
        <p  className="cursor-pointer hover:bg-slate-500 p-2 rounded-lg ">Converter</p>
        
      
      </div>
    </div>
  );
};

export default Navbar;
