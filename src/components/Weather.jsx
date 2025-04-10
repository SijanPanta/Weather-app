import React, { useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import Clear from "../assets/clear.png";


import humidity_icon from "../assets/humidity.png";


import wind_icon from "../assets/wind.png";
import { CgEnter } from "react-icons/cg";

function Weather() {
  const [weatherData, setWeatherData] = useState("");
  const inputRef=useRef();

  function handleSearch(city) {
    search(city);
  }

  const search = async (city) => {
    if (city===""){
      alert("N0 city available")
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message)
        return;
      }
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      setWeatherData(false);
    }
  };
  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          ref={inputRef}

          onKeyDown={(e) => {
            if (e.key == "Enter") handleSearch(inputRef.current.value);
          }}
        />
        <img src={search_icon} alt="search" onClick={()=>handleSearch(inputRef.current.value)} />
      </div>

      <img
        src={
          weatherData?.weather?.[0]?.icon
            ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
            : Clear
        }
        className="weather-icon"
        alt=""
      />
      <p className="temperature ">
        {weatherData ? `${Math.round(weatherData.main.temp)}°C` : "--°C"}
      </p>
      <p className="location">{weatherData ? `${weatherData.name}` : `city`}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData ? `${weatherData.main.humidity}` : `--`}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData ? `${weatherData.wind.speed}` : `--`}</p>
            <span>Wind</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
