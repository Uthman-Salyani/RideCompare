import { useState } from 'react'
import SearchPage from './pages/SearchPage.jsx'
import ResultPage from './pages/ResultPage.jsx'
import BookingPage from './pages/BookingPage.jsx'

export default function App() {
  // Which screen is currently being shown — defaults to search
  const [screen, setScreen] = useState('search')

  // The route data from the search form (pickup, dropoff, distance, duration)
  const [routeData, setRoute] = useState(null)

  // The ride option the user picked from the results
  const [chosenRide, setChosenRide] = useState(null)

  // Called when the user submits the search form
  function handleSearch(data) {
    setRoute(data)
    setScreen('results')
  }

  // Called when the user clicks "Book" on a ride card
  // Saves the chosen ride and moves to the booking screen
  function handleBook(ride) {
    setChosenRide(ride)
    setScreen('booking')
  }

  // Called when the user wants to start over
  // Clears everything and returns to the search screen
  function handleReset() {
    setRoute(null)
    setChosenRide(null)
    setScreen('search')
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Top navigation bar — always visible */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Green dot logo */}
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          <span className="font-semibold text-gray-900 text-lg">RideCompare</span>
        </div>
        {/* Only show the "New search" button when not on the search screen */}
        {screen !== 'search' && (
          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-gray-800 transition"
          >
            ← New search
          </button>
        )}
      </nav>

      {/* max-w-7xl gives the landing page enough room to breathe */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {screen === 'search' && (
          <SearchPage onSearch={handleSearch} />
        )}
        {screen === 'results' && (
          <ResultPage routeData={routeData} onBook={handleBook} />
        )}
        {screen === 'booking' && (
          <BookingPage ride={chosenRide} routeData={routeData} onReset={handleReset} />
        )}
      </main>

    </div>
  )
}
