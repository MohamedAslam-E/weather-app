import SearchLogo from "../assets/search.png";
import Clear from "../assets/Clear.png";
import Rain from "../assets/raining.png";
import Snow from "../assets/snow.png";
import Clouds from "../assets/clouds.png";
import Haze from "../assets/haze.png";
import Smoke from "../assets/smoke.png";
import Mist from "../assets/mist.png";
import Drizzle from "../assets/drizzle.png";
import { useState, useRef } from "react";
import WeatherInfo from "./WeatherInfo";
import NotFound from "../assets/no-results.png";

function Weather() {
  const WeatherTypes = [
    {
      type: "Clear",
      img: Clear,
    },
    {
      type: "Rain",
      img: Rain,
    },
    {
      type: "Snow",
      img: Snow,
    },
    {
      type: "Clouds",
      img: Clouds,
    },
    {
      type: "Haze",
      img: Haze,
    },
    {
      type: "Smoke",
      img: Smoke,
    },
    {
      type: "Mist",
      img: Mist,
    },
    {
      type: "Drizzle",
      img: Drizzle,
    },
  ];

  // let URL = `https://api.openweathermap.org/data/2.5/weather?q=perinthalmanna&units=Metric&appid=49e29f600e8ac6869390c7b2f9d9bdb4`
  //   const [city,setCity]=useState('');
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    const apiKey = "49e29f600e8ac6869390c7b2f9d9bdb4";
    // try {
    //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     setWeatherData(data);
    // } catch (err) {
    //     console.error('error fetching weather data',err)
    // }
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=Metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        // console.log(data)
        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: NotFound,
            },
          ]);
        }
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="bg-gray-800 h-screen grid place-items-center">
        <div className="bg-white w-96 p-4 rounded-md ">
          <div className="flex items-center justify-between">
            <input
              type="text"
              ref={inputRef}
              placeholder="enter location"
              className="flex-1 text-xl border-b p-1 border-gray-200 font-semibold uppercase"
            />
            <button onClick={search}>
              <img className="h-6" src={SearchLogo} alt="search icon" />
            </button>
          </div>
          <div>
            {loading ? (
              <div className="grid place-items-center h-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                  alt="..."
                  className="w-14 mx-auto mb-2 animate-spin"
                />
              </div>
            ) : (
              <WeatherInfo
                weatherData={weatherData}
                WeatherTypes={WeatherTypes}
                showWeather={showWeather}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
