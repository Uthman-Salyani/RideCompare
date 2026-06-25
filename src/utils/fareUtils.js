// Helper functions for calculations and roouting
import { rideTypes, providers, landmarks } from '../data/providers.js'

//Total = baseFare + (perKm × distance) + (perMin × duration)
export function calculateFare(rideType, distanceKm, durationMin){
    const fare = rideType.baseFare + rideType.perKm * distanceKm + rideType.perMin * durationMin
    return Math.round(fare)
}

//MockRoute
export function getMockRoute(pickup, dropoff){
    //Normalise addresses to lowercase
    const fromKey = pickup.trim().toLowerCase()
    const toKey = dropoff.trim().toLowerCase()

    //looking for coordinates
    const pickupCoords  = landmarks[fromKey]  || null
    const dropoffCoords = landmarks[toKey]    || null

    //Calculating the distance
    let distance
    if(pickupCoords && dropoffCoords){
        distance = haversineKm(pickupCoords, dropoffCoords)
        //Adding 20% since roads arent straight
        distance = parseFloat((distance * 1.2).toFixed(1))
    } else{
        // if the place doesnt exist - return null
        return { distance: null, duration: null, pickupCoords, dropoffCoords }
    }

    //traffic factor
    const duration = Math.round(distance * 1.5)

    return {distance, duration, pickupCoords, dropoffCoords}
}

//buildResults - takes a route and returns all ride options - sorted 
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

  if (results.length > 0) {
    // Flag the cheapest option
    results[0].bestValue = true

    // Flag the fastest ETA option
    const fastestIdx = results.reduce(
      (minIdx, r, i, arr) => r.etaMin < arr[minIdx].etaMin ? i : minIdx, 0
    )
    results[fastestIdx].fastest = true
  }

  return results
}

//haversineKm - function definition (calculates the staright line between two coordinates)
function haversineKm([lat1, lon1], [lat2, lon2]){
    const R = 6371
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)

    const a = 
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2
    return R*2*Math.asin(Math.sqrt(a))
}

function toRad(deg){
    return deg * (Math.PI/180)
}