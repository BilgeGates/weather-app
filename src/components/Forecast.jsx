import { Droplets, Wind, Calendar, Clock } from "lucide-react";

function Forecast({ forecast, unit }) {
  // Filter 5-day forecast (1 data point per day)
  const dailyForecast = forecast.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 5);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const tempSymbol = unit === "metric" ? "°C" : "°F";

  return (
    <div className="glass-effect rounded-3xl p-8 animate-slide-up">
      <h3 className="font-display text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Calendar className="h-7 w-7 text-purple-400" />
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {dailyForecast.map((day, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10 hover:from-white/10 hover:to-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <p className="text-gray-300 font-semibold mb-3 text-center">
              {index === 0 ? "Today" : getDayName(day.dt)}
            </p>

            <div className="flex justify-center mb-4">
              <img
                src={getWeatherIcon(day.weather[0].icon)}
                alt={day.weather[0].description}
                className="w-20 h-20 drop-shadow-lg"
              />
            </div>

            <div className="text-center mb-3">
              <p className="text-3xl font-black text-white font-display">
                {Math.round(day.main.temp)}
                {tempSymbol}
              </p>
              <p className="text-sm text-gray-400 mt-1 capitalize">
                {day.weather[0].description}
              </p>
            </div>

            <div className="flex justify-between text-sm border-t border-white/10 pt-3">
              <div className="text-center">
                <p className="text-gray-400 mb-1">Min</p>
                <p className="text-blue-400 font-bold">
                  {Math.round(day.main.temp_min)}
                  {tempSymbol}
                </p>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="text-center">
                <p className="text-gray-400 mb-1">Max</p>
                <p className="text-red-400 font-bold">
                  {Math.round(day.main.temp_max)}
                  {tempSymbol}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <Droplets className="h-3 w-3 text-blue-400" />
                  <span className="text-gray-400">{day.main.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="h-3 w-3 text-green-400" />
                  <span className="text-gray-400">
                    {day.wind.speed} {unit === "metric" ? "m/s" : "mph"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hourly Forecast for today */}
      <div className="mt-8 pt-8 border-t border-white/20">
        <h4 className="font-display text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6 text-purple-400" />
          Today (Hourly)
        </h4>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {forecast.list.slice(0, 8).map((hour, index) => {
              const time = new Date(hour.dt * 1000).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              );

              return (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200 min-w-[120px]"
                >
                  <p className="text-purple-400 font-bold text-sm mb-2 font-display">
                    {time}
                  </p>
                  <img
                    src={getWeatherIcon(hour.weather[0].icon)}
                    alt={hour.weather[0].description}
                    className="w-12 h-12 mx-auto mb-2"
                  />
                  <p className="text-white text-xl font-bold text-center">
                    {Math.round(hour.main.temp)}
                    {tempSymbol}
                  </p>
                  <p className="text-gray-400 text-xs text-center mt-1 capitalize truncate">
                    {hour.weather[0].description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
