# Weather Forecast Integration

## Overview
ShoreSquad now features a real-time 4-day weather forecast powered by Singapore's National Environment Agency (NEA) via data.gov.sg.

## API Details

**Endpoint:** `https://api-open.data.gov.sg/v2/real-time/api/four-day-outlook`

**Data Source:** Singapore's National Environment Agency (NEA)  
**Update Frequency:** Multiple times daily  
**No API Key Required:** Public access

## Features

### 📊 Data Displayed
- **4-Day Forecast** - Daily weather predictions
- **Temperature Range** - High and low in Celsius (°C)
- **Weather Conditions** - Descriptive forecast (e.g., "Partly Cloudy", "Thundery Showers")
- **Humidity Range** - Percentage (%)
- **Wind Speed** - Kilometers per hour (km/h)

### 🎨 Visual Design
- **Weather Icons** - Emoji-based icons matching conditions:
  - ☀️ Clear/Sunny
  - ⛅ Partly Cloudy/Fair
  - ☁️ Cloudy/Overcast
  - 🌧️ Rain/Showers
  - ⛈️ Thunderstorms
  - 🌫️ Hazy
  - 💨 Windy
  - 🌤️ Default

- **Responsive Cards** - Grid layout adapts to screen size
- **Smooth Animations** - Staggered card entrance effects
- **Loading State** - Spinner while fetching data
- **Error Handling** - User-friendly error messages

## Metric Units
✅ All measurements use metric units:
- Temperature: Celsius (°C)
- Wind Speed: Kilometers per hour (km/h)
- Humidity: Percentage (%)

## Implementation

### HTML
Located after the Features section and before the Map:
```html
<section class="weather-section" id="weather">
  <!-- Weather forecast cards dynamically inserted -->
</section>
```

### CSS
Full styling in `css/styles.css`:
- `.weather-section` - Container
- `.weather-card` - Individual forecast cards
- `.weather-loading` - Loading state
- `.weather-error` - Error display

### JavaScript
Weather logic in `js/app.js`:
- `fetchWeatherForecast()` - API call
- `displayWeatherForecast()` - Render cards
- `getWeatherIcon()` - Map conditions to icons
- `initWeather()` - Initialize on page load

## Navigation
Weather section added to main navigation menu:
- Desktop: Top nav bar
- Mobile: Hamburger menu

## User Experience

### Loading States
1. **Initial Load** - Spinner displays while fetching
2. **Success** - Cards animate in with stagger effect
3. **Error** - Friendly error message with retry suggestion

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly

## Performance
- **Async Loading** - Non-blocking API calls
- **Single Request** - One API call per page load
- **Cached in Browser** - Standard HTTP caching
- **Lazy Render** - Cards only render when data available

## Future Enhancements
- [ ] Add refresh button for manual updates
- [ ] Cache forecast data in localStorage
- [ ] Add hourly forecast option
- [ ] Display current weather conditions
- [ ] Add UV index and sunrise/sunset times
- [ ] Show radar/satellite imagery
- [ ] Add weather alerts for beach safety

## Troubleshooting

### Weather Not Loading?
1. Check internet connection
2. Verify data.gov.sg API is operational
3. Open browser console (F12) for error messages
4. Check CORS policy (should work from any domain)

### Incorrect Data?
- Data is real-time from NEA
- Updates multiple times daily
- Singapore-specific forecasts only

## API Response Example
```json
{
  "data": {
    "records": [
      {
        "date": "2025-12-01",
        "forecast": "Partly Cloudy (Day); Cloudy with Thundery Showers (Night)",
        "temperature": {
          "high": 32,
          "low": 25
        },
        "humidity": {
          "high": 85,
          "low": 65
        },
        "wind": {
          "speed": {
            "high": 25
          }
        }
      }
    ]
  }
}
```

## Credits
- **Data Source:** data.gov.sg
- **Provider:** National Environment Agency (NEA), Singapore
- **License:** Singapore Open Data License

---

**Built for ShoreSquad** - Making beach cleanups easier with accurate weather forecasts! 🌊
