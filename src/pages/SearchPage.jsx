import { useState } from 'react'
import { getMockRoute } from '../utils/fareUtils.js'

/*
  SearchPage.jsx — The landing screen.

  Props:
    onSearch(routeData) — called when user submits valid pickup + dropoff.
                          Passes route data up to App.jsx.
*/
export default function SearchPage({ onSearch }) {
  const [pickup,  setPickup]  = useState('')
  const [dropoff, setDropoff] = useState('')
  const [error,   setError]   = useState('')

  // Swap the two input values
  function swapLocations() {
    setPickup(dropoff)
    setDropoff(pickup)
  }

  // Called when the form is submitted
  function handleSubmit(e) {
    e.preventDefault() // prevent page reload

    // Basic validation
    if (!pickup.trim() || !dropoff.trim()) {
      setError('Please enter both a pickup and dropoff location.')
      return
    }
    if (pickup.trim().toLowerCase() === dropoff.trim().toLowerCase()) {
      setError('Pickup and dropoff cannot be the same location.')
      return
    }

    setError('') // clear any previous error

    // Calculate mock route data and pass it up to App.jsx
    const routeData = getMockRoute(pickup, dropoff)
    onSearch({ pickup, dropoff, ...routeData })
  }

  return (
    <div className="flex flex-col items-center">

      {/* Hero heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Compare rides in Nairobi
        </h1>
        <p className="text-gray-500 text-sm">
          See fares from Uber, Bolt, Little, and Faras — side by side.
        </p>
      </div>

      {/* Search card */}
      <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Input group with swap button */}
          <div className="relative flex flex-col gap-2">

            {/* Pickup input */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
              {/* Green dot = pickup */}
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              <input
                type="text"
                placeholder="Pickup location (e.g. Westlands)"
                value={pickup}
                onChange={e => setPickup(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
              />
            </div>

            {/* Swap button — sits between the two inputs */}
            <button
              type="button"
              onClick={swapLocations}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200
                         rounded-full w-8 h-8 flex items-center justify-center text-gray-400
                         hover:text-gray-700 hover:border-gray-400 z-10"
              aria-label="Swap pickup and dropoff"
            >
              ⇅
            </button>

            {/* Dropoff input */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
              {/* Red dot = dropoff */}
              <span className="w-3 h-3 rounded-full bg-red-400 shrink-0" />
              <input
                type="text"
                placeholder="Dropoff location (e.g. CBD)"
                value={dropoff}
                onChange={e => setDropoff(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium
                       rounded-xl py-3 text-sm transition"
          >
            Compare rides →
          </button>
        </form>

        {/* Hint: list of known landmarks */}
        <p className="text-xs text-gray-400 mt-4 text-center">
          Try: Westlands, CBD, Kilimani, Karen, Eastleigh, Lavington, Upperhill, Parklands
        </p>
      </div>

    </div>
  )
}
