import { useState, useEffect } from "react";
import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Thermometer,
  Cloud,
  Sun,
  Sunrise,
  Sunset,
  AlertTriangle,
  ThermometerSun,
  Snowflake,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
} from "lucide-react";

function WeatherCard({ weather, unit }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("az-AZ", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getWindDirection = (degrees) => {
    const directions = [
      "North",
      "North-East",
      "East",
      "South-East",
      "South",
      "South-West",
      "West",
      "North-West",
    ];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const getUVIndex = (weather) => {
    // Estimate UV index based on time and clouds (simplified)
    const hour = new Date().getHours();
    const cloudiness = weather.clouds.all;

    if (hour < 6 || hour > 20)
      return { level: 0, label: "Low", color: "green" };
    if (cloudiness > 80) return { level: 2, label: "Low", color: "green" };
    if (hour >= 10 && hour <= 16 && cloudiness < 30) {
      return { level: 8, label: "Very High", color: "red" };
    }
    if (hour >= 10 && hour <= 16)
      return { level: 6, label: "High", color: "orange" };
    return { level: 4, label: "Moderate", color: "yellow" };
  };

  const uvData = getUVIndex(weather);

  const tempSymbol = unit === "metric" ? "°C" : "°F";
  const speedUnit = unit === "metric" ? "m/s" : "mph";

  // Weather warnings based on conditions
  const getWeatherWarnings = () => {
    const warnings = [];

    if (weather.main.temp > 35 && unit === "metric") {
      warnings.push({
        type: "heat",
        message: "Extreme heat warning! Stay hydrated.",
        color: "red",
        icon: <ThermometerSun className="h-5 w-5" />,
      });
    } else if (weather.main.temp > 30 && unit === "metric") {
      warnings.push({
        type: "hot",
        message: "Hot weather. Drink plenty of water.",
        color: "orange",
        icon: <Sun className="h-5 w-5" />,
      });
    }

    if (weather.main.temp < 0 && unit === "metric") {
      warnings.push({
        type: "cold",
        message: "Freezing temperatures! Dress warmly.",
        color: "blue",
        icon: <Snowflake className="h-5 w-5" />,
      });
    } else if (weather.main.temp < 5 && unit === "metric") {
      warnings.push({
        type: "cool",
        message: "Cold weather. Wear warm clothes.",
        color: "cyan",
        icon: <Snowflake className="h-5 w-5" />,
      });
    }

    if (weather.wind.speed > 15) {
      warnings.push({
        type: "wind",
        message: "Strong winds detected. Be cautious outdoors.",
        color: "purple",
        icon: <Wind className="h-5 w-5" />,
      });
    }

    if (weather.visibility < 1000) {
      warnings.push({
        type: "visibility",
        message: "Low visibility. Drive carefully.",
        color: "gray",
        icon: <CloudFog className="h-5 w-5" />,
      });
    }

    if (weather.main.humidity > 85) {
      warnings.push({
        type: "humidity",
        message: "Very high humidity. May feel uncomfortable.",
        color: "teal",
        icon: <Droplets className="h-5 w-5" />,
      });
    }

    const weatherMain = weather.weather[0].main.toLowerCase();
    if (weatherMain.includes("thunder") || weatherMain.includes("storm")) {
      warnings.push({
        type: "storm",
        message: "Thunderstorm warning! Stay indoors if possible.",
        color: "red",
        icon: <CloudLightning className="h-5 w-5" />,
      });
    }

    if (weatherMain.includes("snow")) {
      warnings.push({
        type: "snow",
        message: "Snow alert. Drive with caution.",
        color: "blue",
        icon: <CloudSnow className="h-5 w-5" />,
      });
    }

    return warnings;
  };

  const warnings = getWeatherWarnings();

  return (
    <div className="glass-effect rounded-3xl p-8 weather-card-glow animate-slide-up">
      {/* Header with City Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-white/10">
        <div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-2">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-gray-300 text-lg">
            {currentTime.toLocaleDateString("az-AZ", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-purple-400 font-bold text-xl font-display">
            {currentTime.toLocaleTimeString("az-AZ")}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <img
            src={getWeatherIcon(weather.weather[0].icon)}
            alt={weather.weather[0].description}
            className="w-32 h-32 animate-float drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Weather Warnings */}
      {warnings.length > 0 && (
        <div className="mb-6 space-y-3">
          {warnings.map((warning, index) => (
            <div
              key={index}
              className={`bg-${warning.color}-500/10 border-l-4 border-${warning.color}-500 rounded-lg p-4 flex items-center gap-3 animate-slide-up backdrop-blur-sm`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className={`text-${warning.color}-400`}>{warning.icon}</div>
              <p className="text-white font-medium flex-1">{warning.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Main Temperature */}
      <div className="text-center mb-8">
        <div className="inline-block">
          <div className="text-8xl md:text-9xl font-black text-white font-display mb-4 relative">
            {Math.round(weather.main.temp)}
            <span className="text-5xl text-purple-400 align-top">
              {tempSymbol}
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
          </div>
        </div>
        <p className="text-2xl text-gray-300 capitalize font-medium mt-4">
          {weather.weather[0].description}
        </p>
        <p className="text-lg text-gray-400 mt-2">
          Feels like:{" "}
          <span className="text-white font-bold">
            {Math.round(weather.main.feels_like)}
            {tempSymbol}
          </span>
        </p>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Humidity */}
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/10 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Humidity</p>
            <Droplets className="h-5 w-5 text-blue-400" />
          </div>
          <p className="text-white text-2xl font-bold">
            {weather.main.humidity}%
          </p>
        </div>

        {/* Wind Speed */}
        <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-white/10 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Wind</p>
            <Wind className="h-5 w-5 text-green-400" />
          </div>
          <p className="text-white text-2xl font-bold">
            {weather.wind.speed} {speedUnit}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            {getWindDirection(weather.wind.deg)}
          </p>
        </div>

        {/* Pressure */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/10 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Pressure</p>
            <Gauge className="h-5 w-5 text-purple-400" />
          </div>
          <p className="text-white text-2xl font-bold">
            {weather.main.pressure}
          </p>
          <p className="text-gray-400 text-xs mt-1">hPa</p>
        </div>

        {/* Visibility */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-white/10 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Visibility</p>
            <Eye className="h-5 w-5 text-yellow-400" />
          </div>
          <p className="text-white text-2xl font-bold">
            {(weather.visibility / 1000).toFixed(1)}
          </p>
          <p className="text-gray-400 text-xs mt-1">km</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Min/Max Temp */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="h-5 w-5 text-blue-400" />
            <p className="text-gray-400 text-sm">Min Temp</p>
          </div>
          <p className="text-blue-400 text-xl font-bold">
            {Math.round(weather.main.temp_min)}
            {tempSymbol}
          </p>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="h-5 w-5 text-red-400" />
            <p className="text-gray-400 text-sm">Max Temp</p>
          </div>
          <p className="text-red-400 text-xl font-bold">
            {Math.round(weather.main.temp_max)}
            {tempSymbol}
          </p>
        </div>

        {/* Cloudiness */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="h-5 w-5 text-gray-400" />
            <p className="text-gray-400 text-sm">Cloudiness</p>
          </div>
          <p className="text-gray-300 text-xl font-bold">
            {weather.clouds.all}%
          </p>
        </div>

        {/* UV Index (estimated) */}
        <div
          className={`bg-white/5 rounded-xl p-4 border border-${uvData.color}-500/30 hover:scale-105 transition-transform duration-300`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sun className="h-5 w-5 text-yellow-400" />
            <p className="text-gray-400 text-sm">UV Index</p>
          </div>
          <p className={`text-${uvData.color}-400 text-xl font-bold`}>
            {uvData.level} - {uvData.label}
          </p>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="mt-6 flex justify-around bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl p-6 border border-white/10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sunrise className="h-5 w-5 text-orange-400" />
            <p className="text-gray-400 text-sm">Sunrise</p>
          </div>
          <p className="text-white text-lg font-bold font-display">
            {formatTime(weather.sys.sunrise)}
          </p>
        </div>
        <div className="w-px bg-white/20"></div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sunset className="h-5 w-5 text-purple-400" />
            <p className="text-gray-400 text-sm">Sunset</p>
          </div>
          <p className="text-white text-lg font-bold font-display">
            {formatTime(weather.sys.sunset)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
