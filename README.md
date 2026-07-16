# RideCompare

RideCompare is a ride-hailing fare comparison tool for Nairobi. Enter a pickup and drop-off location and instantly compare simulated fares, ETAs, and vehicle options across five providers — Uber, Bolt, Little, Faras, and Yego Mobility.

Built as a group project for a Web Development course.

## Features

- **Route search** — enter any two Nairobi locations to simulate a trip
- **Fare comparison** — see calculated fares side by side across all providers and ride tiers (standard, comfort, XL, boda, delivery)
- **Best value & fastest badges** — the cheapest option and the quickest ETA are automatically flagged
- **Interactive map** — pickup/drop-off route rendered with Leaflet
- **Simulated booking flow** — pick a ride and go through a mock booking confirmation, complete with driver details

## How fares are calculated

Since the app has no access to real provider APIs, fares are generated from a mock dataset (`src/data/providers.js`) using the standard ride-hailing pricing formula:

```
fare = baseFare + (perKm × distance) + (perMin × duration)
```

- If both the pickup and drop-off match a known Nairobi landmark, the real distance between them is calculated with the Haversine formula (plus a 20% buffer for road routing).
- Otherwise, a plausible random distance is generated so the flow still works for any input.

## Tech stack

- [React 19](https://react.dev/) — UI
- [Vite](https://vite.dev/) — build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Leaflet](https://leafletjs.com/) / [React Leaflet](https://react-leaflet.js.org/) — map rendering
- [ESLint](https://eslint.org/) — linting

## Project structure

```
src/
├── components/       # Reusable UI pieces (RideCard, RouteMap)
├── data/             # Mock provider, ride type, landmark, and driver data
├── pages/            # Landing, Search, Results, and Booking screens
├── styles/           # Global CSS
├── utils/            # Fare calculation and route simulation logic
├── App.jsx           # Root component — controls which screen is shown
└── main.jsx          # Entry point
```

The app is a single-page flow driven by a `screen` state variable in `App.jsx` (`landing` → `search` → `results` → `booking`), rather than a router — screens are swapped conditionally and data is passed down as props.

## Getting started

**Prerequisites:** Node.js and npm installed.

```bash
# Clone the repository
git clone https://github.com/Uthman-Salyani/RideCompare.git
cd RideCompare

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Other scripts

```bash
npm run build     # Production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Notes

- All pricing, distances, and driver data are simulated for demonstration purposes and don't reflect live provider pricing.
- Supported landmarks for real-distance calculation are listed in `src/data/providers.js`; any other input falls back to a randomly generated but plausible distance.

## License

No license specified.
