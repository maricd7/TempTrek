import React, { useEffect, useState } from 'react'

export const Temperature = () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    console.log(apiKey)
//    const URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    const URL_LOCATION = `https://api.openweathermap.org/geo/1.0/direct?q='London'&limit=5&appid=${apiKey}`;
    const [location, setLocation] = useState(''); 

    useEffect(()=>{
        fetch(URL_LOCATION)
    },[])
    return (
    <h1>Temperature</h1>
  )
}
