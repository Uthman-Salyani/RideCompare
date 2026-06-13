/*
  providers.js — Mock data for all transport providers and ride types.

  Since we have no real API access, this file acts as our "database".
  All pricing is based on approximate real-world Nairobi rates (as of 2024).

  Each ride type has:
    - providerId : links back to the provider
    - type       : the name of the ride tier
    - baseFare   : flat fee charged at the start (KES)
    - perKm      : cost per kilometre (KES)
    - perMin     : cost per minute of travel (KES)
    - capacity   : max number of passengers
    - etaMin     : estimated driver arrival time in minutes
    - color      : brand colour for the UI badge
*/

export const providers = [
  { id: 'uber',   name: 'Uber',   color: '#000000', bgColor: '#f3f4f6' },
  { id: 'bolt',   name: 'Bolt',   color: '#34D186', bgColor: '#ecfdf5' },
  { id: 'little', name: 'Little', color: '#F04E23', bgColor: '#fff1ee' },
  { id: 'faras',  name: 'Faras',  color: '#1A73E8', bgColor: '#eff6ff' },
]

export const rideTypes = [
  // --- Uber ---
  {
    id: 'uber-x',
    providerId: 'uber',
    type: 'UberX',
    baseFare: 100,
    perKm: 35,
    perMin: 3,
    capacity: 4,
    etaMin: 4,
  },
  {
    id: 'uber-comfort',
    providerId: 'uber',
    type: 'Uber Comfort',
    baseFare: 150,
    perKm: 50,
    perMin: 4,
    capacity: 4,
    etaMin: 7,
  },

  // --- Bolt ---
  {
    id: 'bolt-standard',
    providerId: 'bolt',
    type: 'Bolt',
    baseFare: 80,
    perKm: 30,
    perMin: 2,
    capacity: 4,
    etaMin: 3,
  },
  {
    id: 'bolt-comfort',
    providerId: 'bolt',
    type: 'Bolt Comfort',
    baseFare: 120,
    perKm: 42,
    perMin: 3,
    capacity: 4,
    etaMin: 6,
  },

  // --- Little ---
  {
    id: 'little-ride',
    providerId: 'little',
    type: 'Little Ride',
    baseFare: 90,
    perKm: 32,
    perMin: 2.5,
    capacity: 4,
    etaMin: 5,
  },

  // --- Faras ---
  {
    id: 'faras-go',
    providerId: 'faras',
    type: 'Faras Go',
    baseFare: 85,
    perKm: 33,
    perMin: 2.5,
    capacity: 4,
    etaMin: 6,
  },
]

/*
  Nairobi landmark coordinates for the map preview.
  Keys must match (case-insensitively) what the user types in the search fields.
  Format: [latitude, longitude]
*/
export const landmarks = {
  'westlands':    [-1.2676, 36.8123],
  'cbd':          [-1.2833, 36.8172],
  'kilimani':     [-1.2921, 36.7862],
  'karen':        [-1.3182, 36.7172],
  'eastleigh':    [-1.2697, 36.8536],
  'lavington':    [-1.2795, 36.7731],
  'parklands':    [-1.2601, 36.8185],
  'upperhill':    [-1.2966, 36.8183],
  'gigiri':       [-1.2302, 36.7995],
  'runda':        [-1.2104, 36.8017],
  'ruaka':        [-1.2034, 36.7545],
  'thika road':   [-1.2200, 36.8700],
  'ngong road':   [-1.3100, 36.7700],
  'south b':      [-1.3100, 36.8300],
  'south c':      [-1.3200, 36.8200],
}

/*
  Mock drivers assigned when a user books a ride.
  One is picked at random by the BookingPage.
*/
export const mockDrivers = [
  { name: 'James Mwangi',  rating: 4.8, plate: 'KDG 412G', car: 'Toyota Fielder' },
  { name: 'Faith Achieng', rating: 4.9, plate: 'KBZ 187F', car: 'Nissan Note'    },
  { name: 'Brian Otieno',  rating: 4.7, plate: 'KCJ 034H', car: 'Toyota Axio'    },
  { name: 'Mercy Njeri',   rating: 4.8, plate: 'KDD 291J', car: 'Mazda Demio'    },
  { name: 'Kevin Kamau',   rating: 4.6, plate: 'KBT 560K', car: 'Honda Fit'      },
]
