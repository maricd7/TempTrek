import React from 'react'

export const City = ({city, weatherStatusText}) => {
  return (
    <div> 
        {city && (
            <div>
                <h2 className="text-4xl font-semibold my-2 text-slate-700">{city}</h2>
                <h4 className="text-2xl  my-2 text-slate-400 text-center">{weatherStatusText}</h4>
            </div>
        )}
    </div>
  )
}
