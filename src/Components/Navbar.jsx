import React from "react";
import { BsFillCloudSunFill } from "react-icons/bs";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="font-bold bg-black flex justify-between  px-4 py-3 items-center">
      <div className="flex gap-4 items-center ">
        <BsFillCloudSunFill size={30} className="cursor-pointer" />
        <div className="cursor-pointer">ReactToWeather</div>
      </div>
      
      <div className="flex gap-4 ">
      <p className="cursor-pointer hover:bg-slate-500 p-2 rounded-lg"><Link to="/">Home</Link></p>
        <p  className="cursor-pointer hover:bg-slate-500 p-2 rounded-lg "><Link to="/converter">Converter</Link></p>
        
      
      </div>
    </div>
  );
};

export default Navbar;
