import React from "react";
import Celcius from "../assets/celcius.png";
import Termometer from "../assets/temperature.png";

function WeatherInfo({ weatherData, showWeather }) {
  return (
    <>
      {showWeather && (
        <div className="text-center flex flex-col gap-6">
          {weatherData && (
            <p className="text-xl pt-4 font-semibold">{weatherData.name}</p>
          )}
          <img src={showWeather[0].img} alt="..." className="mx-auto w-52" />
          <h3 className="text-2xl font-bold">{showWeather[0].type}</h3>
          {weatherData && weatherData.main && (
          <div className="flex items-center justify-center">
            <img className="h-8" src={Termometer} alt=".." />
            <h2 className="flex items-center font-bold text-3xl">
              {weatherData?.main?.temp}
              <img className="h-6" src={Celcius} alt="..." />
            </h2>
          </div>
          )}
        </div>
      )}
    </>
  );
}

export default WeatherInfo;
