import { useState } from 'react'
import { getMockRoute } from '../utils/fareUtils.js'

/* SearchPage.jsx — Landing Screen with Premium Grid Layout */
export default function SearchPage({ onSearch }) {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [error, setError] = useState('')

  const appStats = [
    { value: '4', label: 'providers compared at once' },
    { value: '1', label: 'search gives live fare estimates' },
    { value: '2', label: 'pickup and dropoff points mapped' },
  ]

  const steps = [
    {
      title: 'Enter your route',
      text: 'Type any Nairobi pickup and dropoff location to start a comparison.',
    },
    {
      title: 'See fares side by side',
      text: 'The app calculates estimated fares, ETAs, and seat counts for each provider.',
    },
    {
      title: 'Pick and book',
      text: 'Choose the best option and continue to a simulated booking confirmation.',
    },
  ]

  // Swap the two input values
  function swapLocations() {
    setPickup(dropoff)
    setDropoff(pickup)
  }

  // Called when the form is submitted
  function handleSubmit(e) {
    e.preventDefault()

    // 1. Basic validation for empty values
    if (!pickup.trim() || !dropoff.trim()) {
      setError('Please enter both a pickup and dropoff location.')
      return
    }
    
    if (pickup.trim().toLowerCase() === dropoff.trim().toLowerCase()) {
      setError('Pickup and dropoff cannot be the same location.')
      return
    }

    // 2. Calculate mock route data FIRST
    const routeData = getMockRoute(pickup, dropoff)

    // 3. Check if landmark exists in your data file
    if (routeData.distance === null) {
      setError("Sorry, we haven't started service in one of the locations listed.")
      return
    }

    setError('')
    
    // 4. Safely pass up to main layout wrapper
    onSearch({ pickup, dropoff, ...routeData })
  }

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      {/* Top Section: Form and Description Side by Side */}
      <section className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Start comparing</h2>
              <p className="mt-1 text-sm text-slate-500">Type your route and the app will calculate a fresh estimate.</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 whitespace-nowrap">
              No signup needed
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative flex flex-col gap-2">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 shadow-sm">
                <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-500" />
                <input
                  type="text"
                  placeholder="Pickup location (e.g. Westlands)"
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              
              {/* Absolute element positioning overlay context */}
              <div className="absolute right-4 top-[44px] z-20">
                <button
                  type="button"
                  onClick={swapLocations}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
                  aria-label="Swap pickup and dropoff"
                >
                  Swap ⇅
                </button>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 shadow-sm">
                <span className="h-3 w-3 shrink-0 rounded-full bg-rose-400" />
                <input
                  type="text"
                  placeholder="Dropoff location (e.g. CBD)"
                  value={dropoff}
                  onChange={e => setDropoff(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm font-medium text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-100">⚠️ {error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 shadow-sm"
            >
              Compare rides
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-500">
            Try Westlands, CBD, Kilimani, Karen, Eastleigh, Lavington, Upperhill, Parklands etc.
          </p>
        </div>

        {/* Content & Stats Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Nairobi ride comparison
            </div>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Compare the main ride providers in one clean view.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                RideCompare helps you check Uber, Bolt, Little, and Faras side by side, so you can see fares, ETAs, and route context before you book.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {appStats.map(stat => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur"
                >
                  <div className="text-2xl font-black text-slate-950">{stat.value}</div>
                  <div className="mt-1 text-sm leading-5 text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Middle Section: Full-Width Live Comparison Preview */}
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Live comparison preview
            </div>
            <h2 className="mt-2 text-2xl font-black">What the app does</h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-left sm:text-right text-xs text-slate-200 self-start sm:self-auto">
            Nairobi<br />fare snapshot
          </div>
        </div>
        
        <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between text-sm font-medium text-slate-300 px-2">
            <span>Westlands</span>
            <span>CBD</span>
          </div>
          <div className="relative mt-4 h-36 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-emerald-400 via-teal-300 to-sky-300">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute left-1/4 top-6 h-20 w-20 rounded-full bg-white/50 blur-xl" />
              <div className="absolute right-1/4 top-10 h-24 w-24 rounded-full bg-emerald-900/25 blur-2xl" />
              <div className="absolute inset-x-10 bottom-8 h-1 rounded-full bg-slate-950/30" />
            </div>
            <div className="absolute left-5 top-5 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white z-10">
              Provider map + fare card
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/40 bg-white/85 p-4 text-slate-900 backdrop-blur max-w-xl mx-auto sm:left-6 sm:right-auto sm:w-96">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Best value</span>
                <span>KES 320 - 480</span>
              </div>
              <div className="mt-1 text-xs text-slate-500">Compare fares, ETA, and capacity before booking.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Three-Step Guide */}
      <section className="grid gap-4 lg:grid-cols-3">
        {steps.map(step => (
          <div key={step.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Step</div>
            <h3 className="mt-2 text-lg font-bold text-slate-950">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
          </div>
        ))}
      </section>
    </div>
  )
}