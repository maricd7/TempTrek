import React, { useEffect, useState } from "react";
import { Search } from "../Search";

export const Temperature = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  //    const URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  const URL_LOCATION = `https://api.openweathermap.org/geo/1.0/direct?q='London'&limit=5&appid=${apiKey}`;
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL_LOCATION);
      // Handle the response here
    };
    fetchData();
  }, [URL_LOCATION, apiKey]);

  function handleChange(event) {
    setLocation(event.target.value);
  }

  function searchCity(city) {
    console.log(city);
  }

  return (
    <div>
      <input onChange={handleChange} />
      <button onClick={() => searchCity(location)}>Search</button>
    </div>
  );
};