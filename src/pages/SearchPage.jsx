import { useState } from 'react'
import { getMockRoute } from '../utils/fareUtils.js'
import { rideTypes, landmarks } from '../data/providers.js'

/*
  SearchPage.jsx
  Focused route form shown after the landing page.
  onSearch(routeData) is called when the user submits valid pickup + dropoff.
*/
export default function SearchPage({ onSearch }) {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [selectedVehicleType, setSelectedVehicleType] = useState('')
  const [error, setError] = useState('')

  const rideTypeOptions = Array.from(new Set(rideTypes.map(rideType => rideType.vehicleType)))

  function isValidLocation(location) {
    return Boolean(landmarks[location.trim().toLowerCase()])
  }

  // Swap the two input values
  function swapLocations() {
    setPickup(dropoff)
    setDropoff(pickup)
  }

  // Called when the form is submitted
  function handleSubmit(e) {
    e.preventDefault()

    // Basic validation
    if (!pickup.trim() || !dropoff.trim()) {
      setError('Please enter both a pickup and dropoff location.')
      return
    }
    if (pickup.trim().toLowerCase() === dropoff.trim().toLowerCase()) {
      setError('Pickup and dropoff cannot be the same location.')
      return
    }
    if (!isValidLocation(pickup) || !isValidLocation(dropoff)) {
      setError('Please enter a supported location such as Westlands, CBD, Kilimani, Karen, or Parklands.')
      return
    }

    setError('')
    // Calculate mock route data and pass it up to App.jsx
    const routeData = getMockRoute(pickup, dropoff)
    onSearch({
      pickup,
      dropoff,
      selectedVehicleType,
      ...routeData,
    })
  }

  return (
    /* Main search form section with styling and layout */
    <section className="mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-950 sm:text-2xl">Start comparing</h2>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">Type your route and the app will calculate a fresh estimate.</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 whitespace-nowrap sm:text-xs">
          No signup needed
        </div>
      </div>
{/* Form for entering pickup and dropoff locations, selecting ride type, and submitting the search */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative flex flex-col gap-2">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
            <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-500" />
            
            <input
              type="text"
              placeholder="Pickup location (e.g. Westlands)"
              value={pickup}
              onChange={e => setPickup(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            type="button"
            onClick={swapLocations}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-900 sm:text-xs"
            aria-label="Swap pickup and dropoff" // Add an accessible label for screen readers
          >
            Swap
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
            <span className="h-3 w-3 shrink-0 rounded-full bg-rose-400" />
            <input
              type="text"
              placeholder="Dropoff location (e.g. CBD)"
              value={dropoff}
              onChange={e => setDropoff(e.target.value)} // Update the dropoff state when the input value changes
              className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-1">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
            Ride type
            <select
              value={selectedVehicleType}
              onChange={e => setSelectedVehicleType(e.target.value)} // Update the selectedVehicleType state when the dropdown value changes
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
            >
              <option value="">All types</option>
              {/* Map over the rideTypeOptions array to create an option for each vehicle type */}
              {rideTypeOptions.map(vehicleType => (
                
                <option key={vehicleType} value={vehicleType}>
                  {vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error && (
          <p className="text-xs font-medium text-rose-500 sm:text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Compare rides
        </button>
      </form>

      <p className="mt-3 text-center text-[11px] text-slate-500 sm:text-xs">
        Try Westlands, CBD, Kilimani, Karen, Eastleigh, Lavington, Upperhill, Parklands etc.
      </p>
    </section>
  )
}

