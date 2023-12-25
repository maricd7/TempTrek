import React, { useState } from 'react'

export const Search = ({onClick,onChange}) => {
    const[city,setCity]=useState(''); 
 
    function handleChange(event){
        setCity(event.target.value)
    }
  return (
   <div><input onChange={()=>handleChange()} placeholder='search'></input><button onClick={onClick(city)}>Search</button></div>
  )
}
