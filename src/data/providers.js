/*
  providers.js — Mock data for all transport providers and ride types.

  Since we have no real API access, this file acts as our "database".
  All pricing is based on approximate real-world Nairobi rates, tuned lower
  so the mock fares feel closer to actual everyday ride costs.

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
    {id:'uber', name:'Uber', color:'#000000', bgColor:'#f3f4f6' },
    {id: 'bolt', name: 'Bolt', color: '#34D186', bgColor: '#ecfdf5'},
    {id: 'little', name: 'Little', color: '#F58220', bgColor: '#fff1ee'},
    {id: 'faras', name: 'Faras', color: '#1A73E8', bgColor: '#eff6ff'},
    {id: 'yego', name: 'Yego Mobility', color: '#FFC72C', bgColor: '#fff8e1'},
]

//specific ride types
export const rideTypes = [
  //UBER 
  {
    id: 'uber-x',
    providerId: 'uber',
    type: 'Uber Chapchap',
    vehicleType: 'standard',
    baseFare: 120,
    perKm: 24,
    perMin: 2.5,
    capacity: 4,
    etaMin: 5
  },
  {
    id: 'uber-comfort',
    providerId: 'uber',
    type: 'Uber Comfort',
    vehicleType: 'comfort',
    baseFare: 160,
    perKm: 30,
    perMin: 3,
    capacity: 4,
    etaMin: 5
  },
  {
    id: 'uber-xl',
    providerId: 'uber',
    type: 'UberXL',
    vehicleType: 'xl',
    baseFare: 220,
    perKm: 38,
    perMin: 3.5,
    capacity: 6,
    etaMin: 7
  },
  {
    id: 'uber-boda',
    providerId: 'uber',
    type: 'UberBoda',
    vehicleType: 'boda',
    baseFare: 43,
    perKm: 12,
    perMin: 1.5,
    capacity: 1,
    etaMin: 3
  },
  {
    id: 'uber-connect',
    providerId: 'uber',
    type: 'Uber Connect',
    vehicleType: 'delivery',
    baseFare: 90,
    perKm: 15,
    perMin: 1.5,
    capacity: 0,
    etaMin: 5
  },

  //BOLT
  {
    id: 'bolt-standard',
    providerId: 'bolt',
    type: 'Bolt Standard',
    vehicleType: 'standard',
    baseFare: 115,
    perKm: 23,
    perMin: 2.5,
    capacity: 4,
    etaMin: 4
  },
  {
    id: 'bolt-xl',
    providerId: 'bolt',
    type: 'Bolt XL',
    vehicleType: 'xl',
    baseFare: 205,
    perKm: 38,
    perMin: 3.5,
    capacity: 6,
    etaMin: 6
  },
  {
    id: 'bolt-boda',
    providerId: 'bolt',
    type: 'Bolt Boda',
    vehicleType: 'boda',
    baseFare: 41,
    perKm: 12,
    perMin: 1.5,
    capacity: 1,
    etaMin: 3
  },
  {
    id: 'bolt-send',
    providerId: 'bolt',
    type: 'Bolt Send',
    vehicleType: 'delivery',
    baseFare: 85,
    perKm: 15,
    perMin: 1.5,
    capacity: 0,
    etaMin: 5
  },

  //LITTLE 
  {
    id: 'little-standard',
    providerId: 'little',
    type: 'Little Standard',
    vehicleType: 'standard',
    baseFare: 125,
    perKm: 25,
    perMin: 2.5,
    capacity: 4,
    etaMin: 5
  },
  {
    id: 'little-comfort',
    providerId: 'little',
    type: 'Little Comfort',
    vehicleType: 'comfort',
    baseFare: 165,
    perKm: 31,
    perMin: 3,
    capacity: 4,
    etaMin: 5
  },
  {
    id: 'little-xl',
    providerId: 'little',
    type: 'Little XL',
    vehicleType: 'xl',
    baseFare: 220,
    perKm: 40,
    perMin: 3.5,
    capacity: 6,
    etaMin: 7
  },

  //FARAS 
  {
    id: 'faras-standard',
    providerId: 'faras',
    type: 'Faras Standard',
    vehicleType: 'standard',
    baseFare: 110,
    perKm: 22,
    perMin: 2.5,
    capacity: 4,
    etaMin: 5
  },
  {
    id: 'faras-boda',
    providerId: 'faras',
    type: 'Faras Boda',
    vehicleType: 'boda',
    baseFare: 40,
    perKm: 11.5,
    perMin: 1.5,
    capacity: 1,
    etaMin: 3
  },
  {
    id: 'faras-delivery',
    providerId: 'faras',
    type: 'Faras Delivery',
    vehicleType: 'delivery',
    baseFare: 80,
    perKm: 14,
    perMin: 1.5,
    capacity: 0,
    etaMin: 4
  },

  //YEGO 
  {
    id: 'yego-boda',
    providerId: 'yego',
    type: 'YEGO Boda',
    vehicleType: 'boda',
    baseFare: 38,
    perKm: 10.5,
    perMin: 1.5,
    capacity: 1,
    etaMin: 2
  },
  {
    id: 'yego-delivery',
    providerId: 'yego',
    type: 'YEGO Delivery',
    vehicleType: 'delivery',
    baseFare: 72,
    perKm: 12,
    perMin: 1.5,
    capacity: 0,
    etaMin: 3
  }
];

//landmark coordinates
export const landmarks = {
  'westlands':      [-1.2676, 36.8123],
  'cbd':            [-1.2833, 36.8172],
  'kilimani':       [-1.2921, 36.7862],
  'karen':          [-1.3182, 36.7172],
  'eastleigh':      [-1.2697, 36.8536],
  'lavington':      [-1.2795, 36.7731],
  'parklands':      [-1.2601, 36.8185],
  'upperhill':      [-1.2966, 36.8183],
  'gigiri':         [-1.2302, 36.7995],
  'runda':          [-1.2104, 36.8017],
  'ruaka':          [-1.2034, 36.7545],
  'thika road':     [-1.2200, 36.8700],
  'ngong road':     [-1.3100, 36.7700],
  'south b':        [-1.3100, 36.8300],
  'south c':        [-1.3200, 36.8200],

  // Additional areas - deeper
  'kileleshwa':     [-1.2805, 36.7817],
  'langata':        [-1.3480, 36.7470],
  'embakasi':       [-1.3160, 36.8960],
  'kasarani':       [-1.2210, 36.8960],
  'roysambu':       [-1.2170, 36.8850],
  'kahawa west':    [-1.1840, 36.9280],
  'donholm':        [-1.3000, 36.8900],
  'umoja':          [-1.2840, 36.8900],
  'buruburu':       [-1.2830, 36.8750],
  'kitengela':      [-1.4770, 36.9600],
  'syokimau':       [-1.3600, 36.9140],
  'mombasa road':   [-1.3300, 36.8500],
  'jkia':           [-1.3192, 36.9275],
  'galleria':       [-1.3430, 36.7440],
  'two rivers':     [-1.2108, 36.8035],
  'village market': [-1.2298, 36.8048]
}

//Mock drivers
/**
 * 5 Standard drivers → UberX, Bolt Standard, Little Standard, Faras Standard
 * 3 Comfort drivers → Uber Comfort, Little Comfort
 * 3 XL drivers → UberXL, Bolt XL, Little XL
 * 3 Boda drivers → UberBoda, Bolt Boda, Faras Boda, YEGO Boda
 * 1 Delivery driver → Uber Connect, Faras Delivery, YEGO Delivery
 */
export const mockDrivers = [
  {
    name: 'James Mwangi',
    rating: 4.8,
    plate: 'KDG 412G',
    car: 'Toyota Fielder',
    vehicleType: 'standard'
  },
  {
    name: 'Faith Achieng',
    rating: 4.9,
    plate: 'KBZ 187F',
    car: 'Nissan Note',
    vehicleType: 'standard'
  },
  {
    name: 'Brian Otieno',
    rating: 4.7,
    plate: 'KCJ 034H',
    car: 'Toyota Axio',
    vehicleType: 'standard'
  },
  {
    name: 'Mercy Njeri',
    rating: 4.8,
    plate: 'KDD 291J',
    car: 'Mazda Demio',
    vehicleType: 'standard'
  },
  {
    name: 'Kevin Kamau',
    rating: 4.6,
    plate: 'KBT 560K',
    car: 'Honda Fit',
    vehicleType: 'standard'
  },
  {
    name: 'Peter Kimani',
    rating: 4.9,
    plate: 'KDL 833A',
    car: 'Toyota Premio',
    vehicleType: 'comfort'
  },
  {
    name: 'Grace Wambui',
    rating: 4.8,
    plate: 'KCY 541B',
    car: 'Mazda Atenza',
    vehicleType: 'comfort'
  },
  {
    name: 'Dennis Kiptoo',
    rating: 4.7,
    plate: 'KDJ 288C',
    car: 'Toyota Allion',
    vehicleType: 'comfort'
  },
  {
    name: 'Joseph Ndegwa',
    rating: 4.9,
    plate: 'KDM 907D',
    car: 'Toyota Noah',
    vehicleType: 'xl'
  },
  {
    name: 'Lilian Chebet',
    rating: 4.8,
    plate: 'KCU 366E',
    car: 'Nissan Serena',
    vehicleType: 'xl'
  },
  {
    name: 'Samuel Ouma',
    rating: 4.7,
    plate: 'KDK 115F',
    car: 'Toyota Voxy',
    vehicleType: 'xl'
  },
  {
    name: 'John Kariuki',
    rating: 4.8,
    plate: 'KDB 729H',
    car: 'Honda CB150',
    vehicleType: 'boda'
  },
  {
    name: 'Mary Atieno',
    rating: 4.9,
    plate: 'KCT 481J',
    car: 'Bajaj Boxer 150',
    vehicleType: 'boda'
  },
  {
    name: 'Eric Mutua',
    rating: 4.7,
    plate: 'KDE 958K',
    car: 'TVS Star HLX',
    vehicleType: 'boda'
  },
  {
    name: 'David Karanja',
    rating: 4.8,
    plate: 'KCP 614L',
    car: 'Suzuki Carry',
    vehicleType: 'delivery'
  }
];