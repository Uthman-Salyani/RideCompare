import { useState, useEffect } from 'react' // React hooks for state and side effects
import { mockDrivers } from '../data/providers.js' // Mock driver data for booking confirmation screen

/*
  BookingPage.jsx — Simulates a booking confirmation after the user selects a ride.

  It shows:
    1. A loading/matching screen (2 seconds)
    2. A confirmation screen with a randomly assigned driver and countdown timer

  Props:
    ride      — the ride option the user chose
    routeData — the route (for showing pickup/dropoff)
    onReset() — called when user cancels, takes them back to search
*/
export default function BookingPage({ ride, routeData, onReset }) {
  // 'loading' | 'confirmed'
  const [status, setStatus] = useState('loading')

  // Randomly pick a driver from the mock list
  const [driver] = useState( 
    () => mockDrivers[Math.floor(Math.random() * mockDrivers.length)]
  )

  // Countdown in seconds (starts at etaMin × 60)
  const [seconds, setSeconds] = useState(ride.etaMin * 60)

  // After 2 seconds of "loading", switch to confirmed screen
  useEffect(() => {
    const timer = setTimeout(() => setStatus('confirmed'), 2000)
    return () => clearTimeout(timer) // cleanup if component unmounts
  }, [])

  // Countdown ticker — runs every second once confirmed
  useEffect(() => {
    if (status !== 'confirmed') return // only start countdown after confirmation
    if (seconds <= 0) return // stop countdown if it reaches 0

    // Start a 1-second interval to decrement the countdown
    const tick = setInterval(() => {
      setSeconds(prev => prev - 1)
    }, 1000)

    return () => clearInterval(tick) // cleanup on unmount
  }, [status, seconds])

  // Format seconds → "m:ss" string
  function formatTime(secs) {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    // Pad seconds with leading zero if needed
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  /* ── Loading screen ── */
  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-4">
        {/* Spinning circle */}
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-gray-600 text-sm font-medium">Finding your driver...</p>
      </div>
    )
  }

  /* ── Confirmation screen ── */
  return (
    <div className="flex flex-col gap-4">

      {/* Success header */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
        <span className="text-3xl">✅</span>
        <h2 className="text-lg font-semibold text-emerald-800 mt-2">Ride confirmed!</h2>
        <p className="text-sm text-emerald-600 mt-1">
          Your {ride.providerName} driver is on the way.
        </p>
      </div>

      {/* Driver details card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4">

        {/* Driver info */}
        <div className="flex items-center gap-4">
          {/* Avatar initials */}
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center
                          text-lg font-semibold text-gray-700">
            {/* Get the initials of the driver's name. */}
            {driver.name.split(' ').map(n => n[0]).join('')}
          </div>

          <div>
            <p className="font-medium text-gray-900">{driver.name}</p>
            <p className="text-sm text-gray-500">⭐ {driver.rating} · {driver.car}</p>
          </div>

          {/* Number plate badge */}
          <span className="ml-auto text-sm font-mono bg-gray-100 text-gray-700 px-3 py-1 rounded-lg">
            {driver.plate}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Countdown timer */}
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Arriving in</p>
          <p className="text-4xl font-bold text-gray-900 font-mono">
            {seconds > 0 ? formatTime(seconds) : 'Arrived!'}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Trip summary */}
        <div className="flex flex-col gap-1 text-sm text-gray-600">
          <div className="flex justify-between">
            <span className="text-gray-400">From</span>
            <span>{routeData.pickup}</span> {/* Show pickup location */}
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">To</span>
            <span>{routeData.dropoff}</span> {/* Show dropoff location */}
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Fare estimate</span>
            <span className="font-semibold text-gray-900">KES {ride.fare}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Ride type</span>
            <span>{ride.type}</span>
          </div>
        </div>
      </div>

      {/* Cancel button */}
      <button
        onClick={onReset}
        className="w-full border border-gray-200 text-gray-600 hover:bg-gray-50
                   rounded-xl py-3 text-sm transition"
      >
        Cancel ride
      </button>

    </div>
  )
}
