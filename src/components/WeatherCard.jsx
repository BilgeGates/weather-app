import { useState, useEffect } from "react";

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

  const tempSymbol = unit === "metric" ? "°C" : "°F";
  const speedUnit = unit === "metric" ? "m/s" : "mph";

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
          <p className="text-gray-400 text-sm mb-1">Humidity</p>
          <p className="text-white text-2xl font-bold">
            {weather.main.humidity}%
          </p>
        </div>

        {/* Wind Speed */}
        <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-white/10 hover:scale-105 transition-transform duration-300">
          <p className="text-gray-400 text-sm mb-1">Wind</p>
          <p className="text-white text-2xl font-bold">
            {weather.wind.speed} {speedUnit}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            {getWindDirection(weather.wind.deg)}
          </p>
        </div>

        {/* Pressure */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/10 hover:scale-105 transition-transform duration-300">
          <p className="text-gray-400 text-sm mb-1">Pressure</p>
          <p className="text-white text-2xl font-bold">
            {weather.main.pressure}
          </p>
          <p className="text-gray-400 text-xs mt-1">hPa</p>
        </div>

        {/* Visibility */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-white/10 hover:scale-105 transition-transform duration-300">
          <p className="text-gray-400 text-sm mb-1">Visibility</p>
          <p className="text-white text-2xl font-bold">
            {(weather.visibility / 1000).toFixed(1)}
          </p>
          <p className="text-gray-400 text-xs mt-1">km</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Min/Max Temp */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Min Temp</p>
              <p className="text-blue-400 text-xl font-bold">
                {Math.round(weather.main.temp_min)}
                {tempSymbol}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Max Temp</p>
              <p className="text-red-400 text-xl font-bold">
                {Math.round(weather.main.temp_max)}
                {tempSymbol}
              </p>
            </div>
          </div>
        </div>

        {/* Cloudiness */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Cloudiness</p>
              <p className="text-gray-300 text-xl font-bold">
                {weather.clouds.all}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="mt-6 flex justify-around bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl p-6 border border-white/10">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Sunrise</p>
          <p className="text-white text-lg font-bold font-display">
            {formatTime(weather.sys.sunrise)}
          </p>
        </div>
        <div className="w-px bg-white/20"></div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Sunset</p>
          <p className="text-white text-lg font-bold font-display">
            {formatTime(weather.sys.sunset)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
