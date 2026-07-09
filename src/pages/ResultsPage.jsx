import { useState, useMemo } from 'react'
import { buildResults } from '../utils/fareUtils.js'
import RideCard from '../components/RideCard.jsx'
import RouteMap from '../components/RouteMap.jsx'

/*
  ResultsPage.jsx — Shows the comparison of all ride options.

  Props:
    routeData  — { pickup, dropoff, distance, duration, pickupCoords, dropoffCoords }
    onBook(ride) — called when user picks a ride, passes chosen ride up to App.jsx
*/
export default function ResultsPage({ routeData, onBook }) {
  const {
    pickup,
    dropoff,
    distance,
    duration,
    pickupCoords,
    dropoffCoords,
    selectedVehicleType,
  } = routeData

  // Sort preference: 'price' | 'eta' | 'capacity'
  const [sortBy, setSortBy] = useState('price')

  /*
    useMemo: only re-calculate results when distance or duration changes.
    buildResults() returns all ride options with fares pre-calculated.
  */
  const results = useMemo(
    () => buildResults(distance, duration),
    [distance, duration]
  )

  // Sort the results based on the user's selected sort preference
  const sorted = [...results].sort((a, b) => {
    if (sortBy === 'price')    return a.fare    - b.fare
    if (sortBy === 'eta')      return a.etaMin  - b.etaMin
    if (sortBy === 'capacity') return b.capacity - a.capacity
    return 0
  })

  const filtered = sorted.filter(ride => {
    if (selectedVehicleType) {
      return ride.vehicleType === selectedVehicleType
    }

    return true
  })

  return (
    <div className="flex flex-col gap-6">

      {/* Route summary pill */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4">
        <p className="text-sm font-medium text-gray-900 mb-1">
          {pickup} → {dropoff}
        </p>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>📍 {distance} km</span>
          <span>⏱ ~{duration} min in traffic</span>
          {selectedVehicleType && (
            <span>
              🎯 {selectedVehicleType.charAt(0).toUpperCase() + selectedVehicleType.slice(1)} only
            </span>
          )}
        </div>
      </div>

      {/* Map preview — only shown if we have real coordinates */}
      {pickupCoords && dropoffCoords && (
        <RouteMap
          pickupCoords={pickupCoords} /* Show pickup and dropoff markers on the map */
          dropoffCoords={dropoffCoords}
          pickupLabel={pickup}
          dropoffLabel={dropoff}
        />
      )}

      {/* Sort controls */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 uppercase tracking-wide mr-1">Sort by</span>
        {/* Sort buttons for price, eta, and capacity */}
        {['price', 'eta', 'capacity'].map(opt => (
          <button
            key={opt} /* When clicked, update the sortBy state to the selected option */
            onClick={() => setSortBy(opt)} /* Update the sortBy state when a button is clicked */
            className={`text-sm px-3 py-1.5 rounded-lg border transition
              ${sortBy === opt
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
          >
            {/* Capitalise first letter */}
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>

      {/* Ride cards */}
      <div className="flex flex-col gap-3">
        {/* If there are filtered rides, map over them and render RideCard components. Otherwise, show a message indicating no rides match the selected type. */}
        {filtered.length > 0 ? (
          filtered.map(ride => (
            <RideCard
              key={ride.id}
              ride={ride} // Pass the ride data to the RideCard component
              pickup={pickup} // Pass the pickup location to the RideCard component
              dropoff={dropoff} // Pass the dropoff location to the RideCard component
              onBook={() => onBook(ride)} /* When the "Book" button is clicked, call the onBook() callback with the selected ride */
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
            No ride matches the selected ride type. Go back and choose a different type or switch to All types.
          </div>
        )}
      </div>

    </div>
  )
}
