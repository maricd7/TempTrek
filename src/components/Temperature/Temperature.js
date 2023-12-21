import React, { useEffect, useState } from "react";
import { Search } from "../Search";

export const Temperature = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [location, setLocation] = useState("");
  const [lat,setLat] = useState(null);
  const [lon,setLon] = useState(null);

  const URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  const URL_LOCATION = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`;

// Handling location
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL_LOCATION);
      const data = await response.json(); 
      setLon(data[0]?.lon)
      setLat(data[0]?.lat)
    };
    fetchData();
  }, [URL_LOCATION, apiKey]);

  function handleChange(event) {
    setLocation(event.target.value);
  }

  function searchCity(city) {
    console.log(city);
  }
// Handling weather
useEffect(() => {
  const fetchWeather = async () => {
    if (lat !== null && lon !== null) {
      const weatherRes = await fetch(URL_WEATHER);
      const data = await weatherRes.json();
      console.log(data);
    }
  };
  fetchWeather();
}, [URL_WEATHER, lat, lon]);

  return (
    <div>
      <input onChange={handleChange} />
      <button onClick={() => searchCity(location)}>Search</button>
    </div>
  );
};