import React, { useEffect, useState } from "react";
import { Search } from "../Search";
import { Icon } from '@iconify/react';


export const Temperature = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [location, setLocation] = useState("");
  const [lat,setLat] = useState(null);
  const [lon,setLon] = useState(null);
  const[temp,setTemp] = useState(undefined);
  const[city,setCity] = useState(null);
  const[status,setStatus] = useState(false);

  const URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  const URL_LOCATION = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`;

// Handling location
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL_LOCATION);
      const data = await response.json(); 
      setLon(data[0]?.lon)
      setLat(data[0]?.lat)
      setCity(data[0]?.name)
    };
    fetchData();
  }, [URL_LOCATION, apiKey]);

  function handleChange(event) {
    setLocation(event.target.value);
  }
// Handling weather
useEffect(() => {
  const fetchWeather = async () => {
    if (lat !== null && lon !== null) {
      const weatherRes = await fetch(URL_WEATHER);
      const data = await weatherRes.json();
      console.log(data.main?.temp);
      convertKelvin(data.main?.temp);

      if(data.weather[0]?.main.length){
        handleWeatherIcon(data.weather[0]?.main)
      }
      
    }
  };
  fetchWeather();
}, [URL_WEATHER, lat, lon]);

//Celsius converter
function convertKelvin(K) {
  const celsius = (K - 273.15).toFixed(0);
  if (!isNaN(celsius)) {
    setTemp(celsius);
  }
}
//Setting icons based on weather status 
function handleWeatherIcon(weatherStatus){
  if(weatherStatus){
    setStatus(true)
  }
}

return (
  <div className="max-w-md mx-auto mt-8 p-4 bg-blue-500 text-white shadow-md rounded-md">
    <input
      className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      placeholder="Enter location..."
      onChange={handleChange}
    />
    {city && <h2 className="text-xl font-semibold">{city}</h2>}
    {temp && <div className="text-4xl mt-2">{temp}&deg;C</div>}
    {status && <Icon icon="meteocons:clear-day-fill" />}
  </div>
);
};