import { useState } from "react";
import { Search, MapPin, RefreshCw } from "lucide-react";

function SearchBar({
  onSearch,
  loading,
  onLocationClick,
  unit,
  onToggleUnit,
  onRefresh,
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <div className="glass-effect rounded-3xl p-4 sm:p-6 neon-glow">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
        {/* Search Input and Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter city name... (Baku, London, New York)"
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300 font-medium text-sm sm:text-base"
              disabled={loading}
            />
          </div>

          {/* Button Group */}
          <div className="flex gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-initial px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 shadow-lg hover:shadow-purple-500/50 text-sm sm:text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="animate-spin h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Search</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Search</span>
                </span>
              )}
            </button>

            {/* Location Button */}
            <button
              type="button"
              onClick={onLocationClick}
              disabled={loading}
              className="px-4 sm:px-6 py-3 sm:py-4 bg-white/10 hover:bg-white/20 disabled:bg-white/5 border-2 border-white/20 text-white font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 flex items-center justify-center gap-2 text-sm sm:text-base"
              title="Use current location"
            >
              <MapPin className="h-5 w-5" />
              <span className="hidden lg:inline">Location</span>
            </button>

            {/* Refresh Button */}
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                disabled={loading}
                className="px-4 sm:px-6 py-3 sm:py-4 bg-white/10 hover:bg-white/20 disabled:bg-white/5 border-2 border-white/20 text-white font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-180 active:scale-95 disabled:scale-100 flex items-center justify-center"
                title="Refresh weather data"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            )}

            {/* Unit Toggle */}
            <button
              type="button"
              onClick={onToggleUnit}
              disabled={loading}
              className="px-4 sm:px-6 py-3 sm:py-4 bg-white/10 hover:bg-white/20 disabled:bg-white/5 border-2 border-white/20 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 text-sm sm:text-base"
              title="Toggle temperature unit"
            >
              {unit === "metric" ? "°C" : "°F"}
            </button>
          </div>
        </div>
      </form>

      {/* Quick Cities */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-gray-400 text-sm mr-2">Quick Select:</span>
        {["Baku", "London", "New York", "Tokyo", "Paris", "Dubai"].map(
          (city) => (
            <button
              key={city}
              onClick={() => onSearch(city)}
              disabled={loading}
              className="px-4 py-2 bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white text-sm rounded-full transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {city}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

export default SearchBar;
