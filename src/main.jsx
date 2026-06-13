import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Import our global CSS (Tailwind directives live here)
import './styles/index.css'

/*
  This is the entry point for React.
  It grabs the #root div from index.html and mounts the App component into it.
  You rarely need to touch this file.
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
