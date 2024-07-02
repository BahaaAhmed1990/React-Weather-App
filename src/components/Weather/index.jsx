import React, { useEffect, useState } from "react";
import Search from "../Search";

export default function Weather() {
  // state
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState("cairo");
  const [err, setErr] = useState("");

  // Weather Api call
  async function fetchWeatherData() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchParam}&appid=93b949ec86db08936815cb7de24d2415`
      );
      const result = await response.json();

      if (result && result.cod === 200) {
        setLoading(false);
        setWeatherData(result);
        setErr("");
      } else {
        setLoading(false);
        setWeatherData(null);
        setErr(result.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // handle click on search btn
  function handleSearch() {
    fetchWeatherData();
  }

  // get current date
  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  useEffect(() => {
    fetchWeatherData();
  }, []);
  console.log(searchParam, weatherData);
  return (
    <div className="weather-container">
      <Search
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        onHandleSearch={handleSearch}
      />
      {loading ? <h1>Loading</h1> : null}
      {err ? <h1>{err}</h1> : null}
      {weatherData ? (
        <div>
          <div className="city-name">
            <p>
              {weatherData.name ? weatherData.name : null}{" "}
              <span>{weatherData.sys ? weatherData.sys.country : null}</span>
            </p>
          </div>
          <div className="date">{getCurrentDate()}</div>
          <div className="temp-container">
            <p className="temp">
              {weatherData.main ? weatherData.main.temp : null}
            </p>
            <p className="descrption">
              {weatherData.weather ? weatherData.weather[0].description : null}
            </p>
          </div>
          <div className="wind-humidity">
            <div className="wind">
              <p>{weatherData.wind ? weatherData.wind.speed : null}</p>
              <p>Wind Speed</p>
            </div>
            <div className="humidity">
              <p>{weatherData.main ? weatherData.main.humidity : null}</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
