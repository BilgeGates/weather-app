# ⛅ Weather Pro - Professional Weather Application

A beautiful, feature-rich weather application built with React, Vite, and Tailwind CSS. Get real-time weather data, forecasts, and weather alerts for any city worldwide.

## ✨ Features

### Core Features
- 🌍 **Global Weather Search** - Search for weather in any city worldwide
- 📍 **Location Detection** - Automatic weather for your current location
- 🔄 **Auto-refresh** - Refresh weather data with one click
- 💾 **Smart Memory** - Remembers your last searched city
- 🌡️ **Unit Toggle** - Switch between Celsius and Fahrenheit
- ⚡ **Fast & Responsive** - Built with Vite for lightning-fast performance

### Weather Data
- 📊 **Current Weather** - Real-time temperature, conditions, and more
- 📅 **5-Day Forecast** - Daily weather predictions
- ⏰ **Hourly Forecast** - Hour-by-hour weather for today
- 🌅 **Sunrise & Sunset** - Accurate sun times
- 💨 **Wind Information** - Speed and direction
- 💧 **Humidity & Pressure** - Detailed atmospheric data
- 👁️ **Visibility** - Current visibility range
- ☁️ **Cloud Coverage** - Cloudiness percentage

### Pro Features
- ⚠️ **Weather Alerts** - Smart warnings for:
  - Extreme heat/cold
  - Strong winds
  - Low visibility
  - High humidity
  - Thunderstorms
  - Snow conditions
- 🎨 **Beautiful UI** - Glassmorphism design with smooth animations
- ✨ **Animated Background** - Dynamic particle effects
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🌈 **Gradient Design** - Modern purple/blue gradient theme

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone or download the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard

4. **Configure environment variables**
   - The `.env` file is already created
   - Replace `your_api_key_here` with your actual API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start searching for weather!

## 🛠️ Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Usage

### Search for Weather
1. Enter a city name in the search bar
2. Press Enter or click the "Search" button
3. View detailed weather information

### Use Current Location
1. Click the "📍 My Location" button
2. Allow location access when prompted
3. Weather for your location will be displayed

### Quick City Selection
- Click any of the quick-select city buttons (Baku, London, New York, Tokyo, Paris, Dubai)

### Toggle Units
- Click the °C/°F button to switch between Celsius and Fahrenheit

### Refresh Data
- Click the 🔄 button to refresh current weather data

## 🎨 Technologies Used

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **OpenWeatherMap API** - Weather data provider
- **Canvas API** - Animated background particles

## 🌟 Design Features

- **Glassmorphism** - Modern frosted glass effect
- **Gradient Accents** - Purple to blue gradients
- **Smooth Animations** - Slide-up, float, and hover effects
- **Custom Fonts** - Orbitron (display) and Outfit (body)
- **Responsive Grid** - Adapts to any screen size
- **Neon Glow Effects** - Subtle glowing borders
- **Particle Background** - Animated particle connections

## 📂 Project Structure

```
weather-app/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Background.jsx    # Animated particle background
│   │   ├── Forecast.jsx      # 5-day + hourly forecast
│   │   ├── SearchBar.jsx     # Search and controls
│   │   └── WeatherCard.jsx   # Main weather display
│   ├── App.jsx         # Main app component
│   ├── index.css       # Tailwind styles
│   └── main.jsx        # App entry point
├── .env                # Environment variables (API key)
├── .env.example        # Example env file
├── index.html          # HTML entry point
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
└── vite.config.js      # Vite configuration
```

## ⚙️ Configuration

### Tailwind Config
Custom animations and theme extensions:
- Float animation for weather icons
- Slide-up animation for content
- Fade-in animation
- Custom font families (Orbitron, Outfit)
- Extended color palette

### Environment Variables
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

## 🐛 Troubleshooting

### API Key Not Working
- Make sure you've activated your API key on OpenWeatherMap
- It may take a few minutes for new keys to activate
- Check that your key is correctly entered in the `.env` file
- Restart the dev server after changing environment variables

### Location Not Working
- Allow location access in your browser
- Check browser permissions for location services
- Try using the search function instead

### Build Errors
- Delete `node_modules` and run `npm install` again
- Clear cache: `npm cache clean --force`
- Make sure you're using Node.js v16+

## 🔒 Privacy & Security

- Your API key is stored locally in `.env` and not exposed in the frontend
- Location data is only used when you explicitly request it
- No user data is collected or stored on external servers
- Weather data is fetched directly from OpenWeatherMap

## 📄 License

This project is open source and available for educational and personal use.

## 🙏 Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons and weather codes from OpenWeatherMap
- Built with ❤️ using React and Vite

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📞 Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section above
2. Visit [OpenWeatherMap Documentation](https://openweathermap.org/api)
3. Check Vite documentation for build issues

---

**Enjoy using Weather Pro! ☀️🌧️❄️**
