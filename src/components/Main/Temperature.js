import React, { useEffect, useState } from "react";
import { Search } from "../Search";
import { Icon } from "@iconify/react";
import { City } from "../UI";

export const Temperature = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [temp, setTemp] = useState(undefined);
  const [city, setCity] = useState(null);
  const [status, setStatus] = useState(false);
  const [weatherStatusText, setWeatherStatusText] = useState('')
  const [icon, setIcon] = useState("");

  const URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const URL_LOCATION = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`;

  // Handling location
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL_LOCATION);
      const data = await response.json();
      setLon(data[0]?.lon);
      setLat(data[0]?.lat);
      setCity(data[0]?.name);
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

        if (data.weather && data.weather.length > 0) {
          console.log(data.main?.temp);
          convertKelvin(data.main?.temp);
          console.log(data.weather[0]?.main, "deki");
          if (data.weather[0]?.main) {
            handleWeatherIcon(data.weather[0]?.main);
          }
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
  function handleWeatherIcon(weatherStatus) {
    if (weatherStatus === "Clear") {
      setIcon("meteocons:clear-day-fill");
    } else if (weatherStatus === "Clouds") {
      setIcon("meteocons:cloud-down-fill");
    }else if(weatherStatus === 'Rain'){
      setIcon('meteocons:partly-cloudy-night-rain-fill')
    }else if(weatherStatus === 'Fog'){
      setIcon('meteocons:overcast-fog-fill')
    }else if (weatherStatus ==='Snow'){
      setIcon('meteocons:snow-fill')
    }

    setStatus(true);
    setWeatherStatusText(weatherStatus)
  }
  return (
    <div className="max-w-md mt-8 p-4  text-white shadow-lg rounded-md flex flex-col items-center justify-center mx-0">
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black bg-opacity-20 backdrop-blur-md"
        placeholder="Enter location..."
        onChange={handleChange}
      />
      {status && <Icon icon={icon} width={256} height={256} className="my-4" />}
      <City city={city} weatherStatusText={weatherStatusText} />
      {temp && <div className="text-4xl my-2 text-slate-700">{temp}&deg;C</div>}
    </div>
  );
};
