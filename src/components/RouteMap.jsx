import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

/*
  RouteMap.jsx — Renders a Leaflet map with markers and a route line.

  The `ready` state delays rendering the map until the component has
  fully mounted in the DOM. This fixes the Leaflet blank screen bug
  that occurs when the map tries to render before its container exists.

  Props:
    pickupCoords  — [lat, lng] for the pickup point
    dropoffCoords — [lat, lng] for the dropoff point
    pickupLabel   — text shown in the pickup marker popup
    dropoffLabel  — text shown in the dropoff marker popup
*/

/*
  Fix Leaflet's default marker icons — they break with Vite because
  Vite changes the asset paths that Leaflet expects internally.
*/
delete L.Icon.Default.prototype._getIconUrl
/* Use CDN-hosted marker icons instead of local assets */
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const greenIcon = new L.Icon({
  iconUrl:       'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize:      [25, 41],
  iconAnchor:    [12, 41],
  popupAnchor:   [1, -34],
})

const redIcon = new L.Icon({
  iconUrl:       'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize:      [25, 41],
  iconAnchor:    [12, 41],
  popupAnchor:   [1, -34],
})

export default function RouteMap({ pickupCoords, dropoffCoords, pickupLabel, dropoffLabel }) {
  /*
    `ready` starts as false. After the component mounts (useEffect runs),
    it becomes true and the MapContainer is allowed to render.
    This gives the DOM time to fully paint the container div first.
  */
  const [ready, setReady] = useState(false)
/* After the component mounts, set `ready` to true to render the map. */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setReady(true)
    }, 0)
/* Cleanup the timer if the component unmounts before the timeout fires. */
    return () => window.clearTimeout(timer)
  }, [])

  // Centre the map between the two points
  const centerLat = (pickupCoords[0] + dropoffCoords[0]) / 2
  const centerLng = (pickupCoords[1] + dropoffCoords[1]) / 2

  return (
    <div
      className="rounded-2xl overflow-hidden border border-gray-200"
      style={{ height: '220px' }}
    >
      {/* Only render the map once the container is in the DOM */}
      {ready && (
        <MapContainer
          key={`${pickupCoords}-${dropoffCoords}`}
          center={[centerLat, centerLng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          scrollWheelZoom={false}
        >
          {/* Free OpenStreetMap tiles — no API key needed */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {/* Pickup marker (green) */}
          <Marker position={pickupCoords} icon={greenIcon}>
            <Popup>{pickupLabel}</Popup>
          </Marker>

          {/* Dropoff marker (red) */}
          <Marker position={dropoffCoords} icon={redIcon}>
            <Popup>{dropoffLabel}</Popup>
          </Marker>

          {/* Dashed route line between the two points */}
          <Polyline
            positions={[pickupCoords, dropoffCoords]}
            pathOptions={{ color: '#10b981', weight: 3, dashArray: '6 6' }}
          />
        </MapContainer>
      )}
    </div>
  )
}