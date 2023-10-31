import React from "react";
import logo from "../assets/favicon.png";
function Footer() {
  return (
    <footer className="bg-purple-800 p-1 text-white text-center">
      <div className="flex justify-center items-center">
        <img
          src={logo} // Replace with actual image path
          alt="Logo"
          className="mr-1 w-6 h-6"
        />
        <span className="font-bold">ReactToWeather</span>
      </div>
      <div className="mt-2">
        <a href="/about" className="mx-2">
          About Us
        </a>
        <a href="/contact" className="mx-2">
          Contact Us
        </a>
        <a href="/program" className="mx-2">
          Our Program
        </a>
        <a href="/support" className="mx-2">
          Support
        </a>
        <a href="/plans" className="mx-2">
          Plans
        </a>
      </div>
    </footer>
  );
}

export default Footer;




