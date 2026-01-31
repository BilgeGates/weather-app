import { useState } from "react";

function SearchBar({ onSearch, loading, onLocationClick, unit, onToggleUnit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <div className="glass-effect rounded-3xl p-6 neon-glow">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter city name... (Baku, London, New York)"
            className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300 font-medium"
            disabled={loading}
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 shadow-lg hover:shadow-purple-500/50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Search
            </span>
          ) : (
            "Search"
          )}
        </button>

        {/* Location Button */}
        <button
          type="button"
          onClick={onLocationClick}
          disabled={loading}
          className="px-6 py-4 bg-white/10 hover:bg-white/20 disabled:bg-white/5 border-2 border-white/20 text-white font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 flex items-center justify-center gap-2"
          title="Use current location"
        >
          <span className="hidden md:inline">My Location</span>
        </button>

        {/* Unit Toggle */}
        <button
          type="button"
          onClick={onToggleUnit}
          disabled={loading}
          className="px-6 py-4 bg-white/10 hover:bg-white/20 disabled:bg-white/5 border-2 border-white/20 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100"
          title="Toggle temperature unit"
        >
          {unit === "metric" ? "°C" : "°F"}
        </button>
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
