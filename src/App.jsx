import { useState } from 'react'
import SearchPage from './pages/SearchPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import BookingPage from './pages/BookingPage.jsx'

/*
  App.jsx is the root component. It controls which "page" is currently visible
  by tracking a 'screen' state variable.

  The three screens are:
    1. 'search'  — user enters pickup and dropoff
    2. 'results' — comparison cards are shown
    3. 'booking' — simulated booking confirmation

  We also store the search data and the chosen ride here so we can pass
  them down to the relevant pages as props.
*/

export default function App() {
  // Which screen is currently showing
  const [screen, setScreen] = useState('search')

  // The route data from the search (pickup, dropoff, distance, duration)
  const [routeData, setRouteData] = useState(null)

  // The ride option the user picked from the results
  const [chosenRide, setChosenRide] = useState(null)

  // Called when the user submits the search form
  function handleSearch(data) {
    setRouteData(data)
    setScreen('results')
  }

  // Called when the user clicks "Book" on a ride card
  function handleBook(ride) {
    setChosenRide(ride)
    setScreen('booking')
  }

  // Called when the user wants to go back to search
  function handleReset() {
    setRouteData(null)
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
        {/* Only show the "New search" button when not on search screen */}
        {screen !== 'search' && (
          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-gray-800 transition"
          >
            ← New search
          </button>
        )}
      </nav>

      {/* Render the correct page based on current screen */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {screen === 'search' && (
          <SearchPage onSearch={handleSearch} />
        )}
        {screen === 'results' && (
          <ResultsPage routeData={routeData} onBook={handleBook} />
        )}
        {screen === 'booking' && (
          <BookingPage ride={chosenRide} routeData={routeData} onReset={handleReset} />
        )}
      </main>

    </div>
  )
}
