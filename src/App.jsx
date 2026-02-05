import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import Forecast from "./components/Forecast";
import Background from "./components/Background";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric"); // metric or imperial

  // Get API key from environment variables
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const BASE_URL = "https://api.openweathermap.org/data/2.5";

  // Check if API key is configured
  useEffect(() => {
    if (!API_KEY) {
      setError(
        "API key not configured. Please add VITE_OPENWEATHER_API_KEY to your .env file",
      );
    }
  }, [API_KEY]);

  // Fetch weather data for a city
  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }

    if (!API_KEY) {
      setError("API key not configured");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);

    try {
      // Current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=${unit}&lang=en`,
      );

      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }

      const weatherData = await weatherResponse.json();

      // 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=${unit}&lang=en`,
      );

      const forecastData = await forecastResponse.json();

      setWeather(weatherData);
      setForecast(forecastData);
      setCity(cityName);
    } catch (err) {
      setError(
        err.message || "Failed to fetch weather data. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    if (!API_KEY) {
      setError("API key not configured");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}&lang=en`,
      );

      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const weatherData = await weatherResponse.json();

      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}&lang=en`,
      );

      const forecastData = await forecastResponse.json();

      setWeather(weatherData);
      setForecast(forecastData);
      setCity(weatherData.name);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  // Get current location weather
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        (error) => {
          setError("Failed to get your location");
          setLoading(false);
        },
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  // Load default city on mount
  useEffect(() => {
    if (API_KEY) {
      // Try to get last searched city from localStorage
      const lastCity = localStorage.getItem("lastCity");
      if (lastCity) {
        fetchWeather(lastCity);
      } else {
        fetchWeather("Baku");
      }
    }
  }, []);

  // Save city to localStorage when weather is fetched
  useEffect(() => {
    if (city) {
      localStorage.setItem("lastCity", city);
    }
  }, [city]);

  const toggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    if (city) {
      // Refetch with new unit
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        q: city,
        appid: API_KEY,
        units: newUnit,
        lang: "en",
      });

      Promise.all([
        fetch(`${BASE_URL}/weather?${params.toString()}`),
        fetch(`${BASE_URL}/forecast?${params.toString()}`),
      ])
        .then(([weatherRes, forecastRes]) => {
          if (!weatherRes.ok) throw new Error("Failed to fetch weather");
          return Promise.all([weatherRes.json(), forecastRes.json()]);
        })
        .then(([weatherData, forecastData]) => {
          setWeather(weatherData);
          setForecast(forecastData);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  };

  // Refresh current weather
  const refreshWeather = () => {
    if (city) {
      fetchWeather(city);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background weather={weather} />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Search & Controls */}
        <div className="mb-8 animate-slide-up">
          <SearchBar
            onSearch={fetchWeather}
            loading={loading}
            onLocationClick={getCurrentLocation}
            unit={unit}
            onToggleUnit={toggleUnit}
            onRefresh={refreshWeather}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 glass-effect rounded-2xl p-6 border-l-4 border-red-500 animate-slide-up">
            <div className="flex items-center">
              <div>
                <p className="text-red-400 font-semibold text-lg">Error</p>
                <p className="text-gray-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>
            <p className="text-white mt-6 font-medium text-lg">
              Loading weather data...
            </p>
          </div>
        )}

        {/* Weather Display */}
        {!loading && weather && (
          <div className="space-y-8">
            <WeatherCard weather={weather} unit={unit} />
            {forecast && <Forecast forecast={forecast} unit={unit} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
