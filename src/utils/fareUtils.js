/*
  fareUtils.js — Helper functions for fare calculation and route simulation.

  These are plain JavaScript functions — no React here.
  Keeping logic separate from components makes it easier to test and reuse.
*/

import { rideTypes, providers, landmarks } from '../data/providers.js'

/* ─────────────────────────────────────────────
   calculateFare
   ─────────────────────────────────────────────
   Applies the standard ride-hailing pricing formula:
     Total = baseFare + (perKm × distance) + (perMin × duration)

   @param {object} rideType   - one entry from rideTypes[]
   @param {number} distanceKm - route distance in kilometres
   @param {number} durationMin - route duration in minutes
   @returns {number} fare in KES, rounded to nearest integer
*/
export function calculateFare(rideType, distanceKm, durationMin) {
  const fare =
    rideType.baseFare +
    rideType.perKm * distanceKm +
    rideType.perMin * durationMin

  return Math.round(fare)
}

/* ─────────────────────────────────────────────
   getMockRoute
   ─────────────────────────────────────────────
   Simulates a route between two locations.
   If both locations are known landmarks, uses real coordinates.
   Otherwise, generates a plausible random distance.

   @param {string} pickup  - user's "from" input
   @param {string} dropoff - user's "to" input
   @returns {{ distance, duration, pickupCoords, dropoffCoords }}
*/
export function getMockRoute(pickup, dropoff) {
  // Normalise to lowercase so "Westlands" matches "westlands"
  const fromKey = pickup.trim().toLowerCase()
  const toKey   = dropoff.trim().toLowerCase()

  const pickupCoords  = landmarks[fromKey]  || null
  const dropoffCoords = landmarks[toKey]    || null

  let distance

  if (pickupCoords && dropoffCoords) {
    // Use the Haversine formula to get real distance between coordinates
    distance = haversineKm(pickupCoords, dropoffCoords)
    // Add 20% for road routing (roads aren't straight lines)
    distance = parseFloat((distance * 1.2).toFixed(1))
  } else {
    // Fallback: random distance between 2 and 25 km
    distance = parseFloat((Math.random() * 23 + 2).toFixed(1))
  }

  // Rough Nairobi estimate: ~3.5 minutes per km accounting for traffic
  const duration = Math.round(distance * 3.5)

  return { distance, duration, pickupCoords, dropoffCoords }
}

/* ─────────────────────────────────────────────
   buildResults
   ─────────────────────────────────────────────
   Takes a route and returns all ride options with fares calculated,
   sorted cheapest first, with the cheapest flagged as "bestValue".

   @param {number} distanceKm
   @param {number} durationMin
   @returns {Array} sorted array of result objects
*/
export function buildResults(distanceKm, durationMin) {
  const results = rideTypes.map(rt => {
    // Find the full provider object for this ride type
    const provider = providers.find(p => p.id === rt.providerId)

    return {
      ...rt,
      providerName: provider.name,
      providerColor: provider.color,
      providerBg: provider.bgColor,
      fare: calculateFare(rt, distanceKm, durationMin),
    }
  })

  // Sort by fare, cheapest first
  results.sort((a, b) => a.fare - b.fare)

  // Flag the cheapest option
  results[0].bestValue = true

  // Flag the fastest ETA option
  const fastestIdx = results.reduce(
    (minIdx, r, i, arr) => r.etaMin < arr[minIdx].etaMin ? i : minIdx, 0
  )
  results[fastestIdx].fastest = true

  return results
}

/* ─────────────────────────────────────────────
   haversineKm  (internal helper)
   ─────────────────────────────────────────────
   Calculates the straight-line distance between two
   [lat, lng] coordinate pairs using the Haversine formula.

   @param {[number, number]} coordA
   @param {[number, number]} coordB
   @returns {number} distance in kilometres
*/
function haversineKm([lat1, lon1], [lat2, lon2]) {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2

  return R * 2 * Math.asin(Math.sqrt(a))
}

function toRad(deg) {
  return deg * (Math.PI / 180)
}
